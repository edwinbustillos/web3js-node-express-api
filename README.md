
# WEB3.JS-NODE-EXPRESS-API
<p align="left"> <a href="https://expressjs.com" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original-wordmark.svg" alt="express" width="40" height="40"/> </a> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" alt="javascript" width="40" height="40"/> </a> <a href="https://nodejs.org" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg" alt="nodejs" width="40" height="40"/> </a> <a href="https://www.typescriptlang.org/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg" alt="typescript" width="40" height="40"/> </a> </p>

---

#### Project developed in node.js with typescript and express.js to create api's with the WEB3.JS library to access features of the Ethereum ecosystem.

#### Requirements
- Library: https://web3js.org/
- Create account in: https://app.infura.io/
- Get Block address in: https://etherscan.io/
- Developed on Node v18.17.1

#### Run an install
```javascript
npm install
npm run start

//For development
npm run dev

//Run test case
npm run test
```
#### Run with Docker
```shell
#Make image
docker build -t web3js-api .

#Docker run image
docker run -it -e "PORT=3000" -e "URL=https://mainnet.infura.io/v3/xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" -p 3000:3000 --name web3js-api web3js-api

OR

docker compose up -d
docker compose down 

#Docker run interactive container
docker exec -it web3js-api sh

```

### Endpoints Block
---

#### web3.eth.getBlockNumber -> /block/balance
```curl
curl --location --request GET 'http://localhost:3000/block/number'
```
Return:
```JSON 
{
    "blockNumber": "00000000"
}
```
---

#### web3.eth.getBlock('latest') -> /block/latest
```curl
curl --location --request GET 'http://localhost:3000/block/latest'
```
Return:
```JSON 
{
    "hash": "0x00000000000000000000000000000000000000000000000000000000000000",
    "parentHash": "0x00000000000000000000000000000000000000000000000000000000000000",
    "miner": "0x00000000000000000000000000000000000000000",
    "stateRoot": "0x00000000000000000000000000000000000000000000000000000000000000",
    "transactionsRoot": "0x00000000000000000000000000000000000000000000000000000000000000",
    "receiptsRoot": "0x00000000000000000000000000000000000000000000000000000000000000",
    "difficulty": "0",
    "number": "00000000",
    "gasLimit": "00000000",
    "gasUsed": "0000000",
    "timestamp": "0000000000",
    "nonce": "0",
    "size": "00000",
    "transactions": [
        "0x0000000000000000000000000000000000000000000000000000000000000000",
        ...
    ]
}
```
---

#### web3.eth.getBlock('pending') -> /block/pending
```curl
curl --location --request GET 'http://localhost:3000/block/pending'
```
Return:
```JSON 
{
    "parentHash": "0x00000000000000000000000000000000000000000000000000000000000000",
    "stateRoot": "0x00000000000000000000000000000000000000000000000000000000000000",
    "transactionsRoot": "0x00000000000000000000000000000000000000000000000000000000000000",
    "receiptsRoot": "0x00000000000000000000000000000000000000000000000000000000000000",
    "difficulty": "0",
    "number": "00000000",
    "gasLimit": "00000000",
    "gasUsed": "0000000",
    "timestamp": "0000000000",
    "size": "00000",
    "transactions": [
        "0x0000000000000000000000000000000000000000000000000000000000000000",
        ...
    ]
}
```
---

#### /get/:blockNumber -> /block/get/0000000
```curl
curl --location --request GET 'http://localhost:3000/block/get/000000000'
```
Return:
```JSON 
{
    "blockNumber": "00000000",
    "hash": "0x00000000000000000000000000000000000000000000000000000000000000",
    "parentHash": "0x00000000000000000000000000000000000000000000000000000000000000",
    "miner": "0x00000000000000000000000000000000000000",
    "stateRoot": "0x00000000000000000000000000000000000000000000000000000000000000",
    "transactionsRoot": "0x00000000000000000000000000000000000000000000000000000000000000",
    "receiptsRoot": "0x00000000000000000000000000000000000000000000000000000000000000",
    "difficulty": "0",
    "number": "00000000",
    "gasLimit": "00000000",
    "gasUsed": "0000000",
    "timestamp": "0000000000",
    "nonce": "0",
    "size": "00000",
    "transactions": [
        "0x0000000000000000000000000000000000000000000000000000000000000000",
        ...
    ]
}
```
---

### Endpoints Wallet 
---

#### web3.eth.accounts.wallet -> /wallet/list
```curl
curl --location --request GET 'http://localhost:3000/wallet/list'
```
Return:
```JSON 
{
    "accounts": [
        "0x0000000000000000000000000000000000000000",
        "0x0000000000000000000000000000000000000000"
    ]
}
```
---

#### web3.eth.accounts.wallet.create -> /wallet/create
```curl
curl --location --request POST 'http://localhost:3000/wallet/create'
```
Return:
```JSON 
{
    "address": "0x00000000000000000000000000000000000000000",
    "privateKey": "0x0000000000000000000000000000000000000000000000000000000000000000"
}
```
---

#### web3.eth.accounts.wallet.add -> /wallet/add
```curl
curl --location --request POST 'http://localhost:3000/wallet/add' \
--header 'Content-Type: application/json' \
--data '{
    "privateKey": "0x0000000000000000000000000000000000000000000000000000000000000000"
}'
```
Return:
```JSON 
{
    "message": "Account added to wallet successfully.",
    "privateKey": "0x0000000000000000000000000000000000000000000000000000000000000000",
    "address": "0x0000000000000000000000000000000000000000"
}
```
---

#### web3.eth.accounts.wallet.remove -> /wallet/remove
```curl
curl --location --request POST 'http://localhost:3000/wallet/remove' \
--header 'Content-Type: application/json' \
--data '{
    "address": "0x3d8305A666001313A1502cb79253f56cA2cFF995"
}'
```
Return:
```JSON 
{
    "message": "Account successfully removed from wallet."
}
```
---

### Endpoints Events 
---

#### web3.eth.subscribe -> /events
```curl
curl --location --request POST 'http://localhost:3001/events' \
--header 'Content-Type: application/json' \
--data '{
  "events": [
    {
      "address": "0x0000000000000000000000000000000000000000",   
      "name": "pendingTransactions",
      "options": {
        "topics": []
      }
    }
  ]
}'
```
Return:
```JSON 
{ 
    "message": "Registering for successful events." 
}
```
---

#### Routes under development:
- Send Ether in block.ts:

web3.eth.accounts.signTransaction -> /send-ether 
