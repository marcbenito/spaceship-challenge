FROM node:16-alpine as base
WORKDIR /usr
COPY package.json ./
COPY tsconfig.json ./
COPY universe.db ./
COPY spaceship-trip.json ./
COPY src ./src
RUN ls -a
RUN npm install
RUN npm run build


## The pod..
FROM node:16-alpine
WORKDIR /usr
COPY package.json ./
COPY universe.db ./
COPY spaceship-trip.json ./
RUN npm install
COPY --from=base /usr/dist .

RUN ls -a
EXPOSE 3003
CMD ["node","server.js"]