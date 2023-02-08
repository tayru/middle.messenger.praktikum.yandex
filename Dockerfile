FROM node:16-alpine
WORKDIR /dist
COPY package.json package-lock.json ./
RUN npm install
COPY . .
EXPOSE 3000
RUN npm start
