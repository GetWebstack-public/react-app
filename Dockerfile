FROM node:16.10.0-alpine3.13

WORKDIR /react-docker-example/

COPY package.json /react-docker-example/

RUN npm install

COPY public/ /react-docker-example/public
COPY src/ /react-docker-example/src


CMD ["react-scripts", "start"]