import { Router, Request, Response } from 'express';
import Web3 from 'web3';
import dotenv from 'dotenv';
import logger from '../utils/logger';

dotenv.config();

const url: string = String(process.env.URL);
const web3 = new Web3(new Web3.providers.HttpProvider(url));
const routes = Router();

routes.get('/number', async (req, res) => {
  logger.info('web3.eth.getBlockNumber');
  try {
    const blockNumber = await web3.eth.getBlockNumber();
    res.json({ blockNumber: blockNumber.toString() });
  } catch (err) {
    logger.info('Error: ' + err);
    res.status(500).json({ Error: 'Error getting block number.' });
  }
});

routes.get('/latest', async (req, res) => {
  logger.info(`web3.eth.getBlock('latest')`);
  try {
    const blockLatest = await web3.eth.getBlock('latest');

    if (!blockLatest) {
      return res.status(404).json({ error: 'Block not found.' });
    }
    res.json({
      hash: blockLatest.hash,
      parentHash: blockLatest.parentHash,
      miner: blockLatest.miner,
      stateRoot: blockLatest.stateRoot,
      transactionsRoot: blockLatest.transactionsRoot,
      receiptsRoot: blockLatest.receiptsRoot,
      difficulty: blockLatest.difficulty?.toString(),
      number: blockLatest.number.toString(),
      gasLimit: blockLatest.gasLimit.toString(),
      gasUsed: blockLatest.gasUsed.toString(),
      timestamp: blockLatest.timestamp.toString(),
      nonce: blockLatest.nonce.toString(),
      size: blockLatest.size.toString(),
      transactions: blockLatest.transactions.map((trx) => trx.toString()),
    });
  } catch (err) {
    logger.info('Error: ' + err);
    res.status(500).json({ Error: 'Error getting block latest.' });
  }
});

routes.get('/pending', async (req, res) => {
  logger.info(`web3.eth.getBlock('pending')`);
  try {
    const blockPending = await web3.eth.getBlock('pending');

    if (!blockPending) {
      return res.status(404).json({ error: 'Block not found.' });
    }
    res.json({
      hash: blockPending.hash,
      parentHash: blockPending.parentHash,
      miner: blockPending.miner,
      stateRoot: blockPending.stateRoot,
      transactionsRoot: blockPending.transactionsRoot,
      receiptsRoot: blockPending.receiptsRoot,
      difficulty: blockPending.difficulty?.toString(),
      number: blockPending.number.toString(),
      gasLimit: blockPending.gasLimit.toString(),
      gasUsed: blockPending.gasUsed.toString(),
      timestamp: blockPending.timestamp.toString(),
      nonce: blockPending.nonce?.toString(),
      size: blockPending.size.toString(),
      transactions: blockPending.transactions?.map((trx) => trx.toString()),
    });
  } catch (err) {
    logger.info('Error: ' + err);
    res.status(500).json({ Error: 'Error getting block pending.' });
  }
});

routes.get('/get/:blockNumber', async (req, res) => {
  const blockNumber = req.params.blockNumber;
  logger.info(`web3.eth.getBlock(${req.params.blockNumber})`);
  try {
    const block = await web3.eth.getBlock(blockNumber);

    if (!block) {
      return res.status(404).json({ error: 'Block not found.' });
    }
    res.json({
      blockNumber: blockNumber.toString(),
      hash: block.hash,
      parentHash: block.parentHash,
      miner: block.miner,
      stateRoot: block.stateRoot,
      transactionsRoot: block.transactionsRoot,
      receiptsRoot: block.receiptsRoot,
      difficulty: block.difficulty?.toString(),
      number: block.number.toString(),
      gasLimit: block.gasLimit.toString(),
      gasUsed: block.gasUsed.toString(),
      timestamp: block.timestamp.toString(),
      nonce: block.nonce.toString(),
      size: block.size.toString(),
      transactions: block.transactions.map((trx) => trx.toString()),
    });
  } catch (err) {
    logger.info('Error: ' + err);
    res.status(500).json({ Error: 'Error getting block information.' });
  }
});

routes.get('/balance/:address', async (req: Request, res: Response) => {
  const address = req.params.address;
  logger.info(`web3.eth.getBalance(${address})`);
  try {
    const balance = await web3.eth.getBalance(address);
    const balanceInEther = web3.utils.fromWei(balance, 'ether');
    res.status(200).json({ address, balance: balanceInEther });
  } catch (err) {
    logger.info('Error: ' + err);
    res.status(500).json({ erro: 'Error when checking balance.' });
  }
});

// // In Development route to send Ether.
// routes.post('/send-ether', async (req: Request, res: Response) => {
//   const { privateKey, recipientAddress, amount } = req.body;

//   try {
//     const senderAccount = web3.eth.accounts.privateKeyToAccount(privateKey);
//     const nonce = await web3.eth.getTransactionCount(senderAccount.address);
//     const gasPrice = await web3.eth.getGasPrice();
//     const gasLimit = 21000;

//     const txObject = {
//       nonce: web3.utils.toHex(nonce),
//       to: recipientAddress,
//       value: web3.utils.toHex(web3.utils.toWei(amount, 'ether')),
//       gasPrice: web3.utils.toHex(gasPrice),
//       gasLimit: web3.utils.toHex(gasLimit),
//     };

//     const signedTx = await web3.eth.accounts.signTransaction(
//       txObject,
//       privateKey,
//     );
//     const txReceipt = await web3.eth.sendSignedTransaction(
//       signedTx.rawTransaction,
//     );

//     res.json({
//       message: 'Transaction send.',
//       transactionHash: txReceipt.transactionHash,
//     });
//   } catch (err) {
//     res.status(500).json({ Error: 'Error send Ether.' + err });
//   }
// });

export default routes;
