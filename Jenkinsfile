/**
 * This pipeline will run a Docker image build
 */

def label = "docker-${UUID.randomUUID().toString()}"

podTemplate(label: label, containers: [
    containerTemplate(
        name: 'docker',
        image: 'docker',
        command: 'cat',
        ttyEnabled: true
    ),
    containerTemplate(
        name: 'kubectl',
        image: 'lachlanevenson/k8s-kubectl',
        command: 'cat',
        ttyEnabled: true
    )],
    volumes: [
        hostPathVolume(
            mountPath: '/var/run/docker.sock',
            hostPath: '/var/run/docker.sock',
        )
    ]
) {
    registry = "moobbie/task-k8s"
    registryCredential = "dockerhub"
    dockerImage = ''
    node(label) {
        stage('Build Docker image and push to docker registry') {
            git 'https://github.com/Moobbie/task-k8s.git'
            container('docker') {
                script {
                    dockerImage = docker.build registry + ":$BUILD_NUMBER"
                    docker.withRegistry( '', registryCredential ) {
                        dockerImage.push()
                    }
                }
            }
        }

        stage('Kubernetes Deployment') {
            container('kubectl') {
                sh "sed -i 's/image:\\s*moobbie\\/task-k8s/image: moobbie\\/task-k8s:${BUILD_NUMBER}/g' ${WORKSPACE}/deployment.yaml"
                 step([$class: 'KubernetesEngineBuilder', projectId: 'named-berm-276312', clusterName: 'jenkins-cd', location: 'us-east1-d', manifestPattern: 'deployment.yaml', credentialsId: 'named-berm-276312', verifyDeployments: true])
            }
        }
    }
}


