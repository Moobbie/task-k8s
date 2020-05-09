# Dockerfile for Client

# Stage 1: Build react client
FROM node:12.2.0-alpine as build

# Working directory be app
WORKDIR /client
ENV PATH /client/node_modules/.bin:$PATH
COPY package*.json ./

# Install dependencies
RUN npm install
RUN npm install react-scripts@3.0.1 -g

# copy local files to app folder
COPY . .
RUN npm run build

#EXPOSE 3000

#CMD ["npm","start"]
# production environment
FROM nginx:1.16.0-alpine
WORKDIR /client/build
COPY --from=build /client/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]