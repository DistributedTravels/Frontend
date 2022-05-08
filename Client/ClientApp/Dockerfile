FROM node:18-alpine3.14

WORKDIR /app
EXPOSE 80

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./
COPY package-lock.json ./

RUN npm install #--silent
RUN npm install react-scripts@3.4.1 -g #--silent

COPY . ./

CMD ["npm", "start"]
