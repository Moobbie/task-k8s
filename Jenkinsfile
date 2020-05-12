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
    registry = "ivelia/jenkins-k8s"
    registryCredential = "ivelia"
    dockerImage = ''
    node(label) {
        stage('Build Docker image and push to docker registry') {
            git 'https://github.com/Nkoli/jenkins-kubernetes-deployment.git'
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
                sh "sed -i 's/image:\\s*ivelia\\/jenkins-k8s/image: ivelia\\/jenkins-k8s:${BUILD_NUMBER}/g' ${WORKSPACE}/deployment.yaml"
                 sh "kubectl apply -f ${WORKSPACE}/deployment.yaml"
                 sh "kubectl apply -f service.yaml"
            }
        }
    }
}


/**
pipeline {
    agent any
    environment {
        PROJECT_ID = 'named-berm-276312'
        CLUSTER_NAME = 'jenkins-cd'
        LOCATION = 'us-east1-d'
        CREDENTIALS_ID = 'named-berm-276312'
    }
    stages {
        stage("Checkout code") {
            steps {
                checkout scm
            }
        }
        stage("Build image") {
            steps {
                script {
                    myapp = docker.build("moobbie/task-k8s:${env.BUILD_ID}")
                }
            }
        }
        stage("Push image") {
            steps {
                script {
                    docker.withRegistry('https://registry.hub.docker.com', 'dockerhub') {
                            myapp.push("latest")
                            myapp.push("${env.BUILD_ID}")
                    }
                }
            }
        }        
        stage('Deploy to GKE') {
            steps{
                sh "sed -i 's/task-k8s:latest/task-k8s:${env.BUILD_ID}/g' deployment.yaml"
                step([$class: 'KubernetesEngineBuilder', projectId: env.PROJECT_ID, clusterName: env.CLUSTER_NAME, location: env.LOCATION, manifestPattern: 'deployment.yaml', credentialsId: env.CREDENTIALS_ID, verifyDeployments: true])
            }
        }
    }    
}
*/
