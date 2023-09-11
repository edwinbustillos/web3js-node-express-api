FROM node:alpine as builder
WORKDIR /usr/src/web3-api
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:alpine
ENV PORT 3002
USER node
WORKDIR /usr/src/web3-api
COPY package.json ./
RUN npm install
COPY --from=builder /usr/src/web3-api/build ./build
EXPOSE ${PORT}
CMD ["node", "./build/index.js"]