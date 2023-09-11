FROM node:alpine as builder
WORKDIR /usr/src/web3js-api
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:alpine
ENV PORT 3000
USER node
WORKDIR /usr/src/web3js-api
COPY package.json ./
RUN npm install
COPY --from=builder /usr/src/web3js-api/build ./build
EXPOSE ${PORT}
CMD ["node", "./build/index.js"]