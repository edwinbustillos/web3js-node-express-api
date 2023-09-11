import { Router } from 'express';
import Web3 from 'web3';
import dotenv from 'dotenv';
import logger from '../utils/logger';
dotenv.config();
const url: string = String(process.env.URL);
const web3 = new Web3(new Web3.providers.HttpProvider(url));
const routes = Router();

routes.get('/list', (req, res) => {
  logger.info('web3.eth.accounts.wallet');
  try {
    const accounts = web3.eth.accounts.wallet;
    res.json({ accounts: accounts.map((account) => account.address) });
  } catch (err) {
    logger.info('Error: ' + err);
    res.status(500).json({ error: 'Error listing accounts in wallet.' });
  }
});

routes.post('/create', (req, res) => {
  logger.info('web3.eth.accounts.create');
  try {
    const newAccount = web3.eth.accounts.create();
    res.json({
      address: newAccount.address,
      privateKey: newAccount.privateKey,
    });
  } catch (err) {
    logger.info('Error: ' + err);
    res.status(500).json({ error: 'Error creating wallet.' });
  }
});

routes.post('/add', (req, res) => {
  logger.info('web3.eth.accounts.wallet.add');
  try {
    const { privateKey } = req.body;
    if (!web3.utils.isHexStrict(privateKey)) {
      return res.status(400).json({ error: 'Chave privada inválida.' });
    }
    const account = web3.eth.accounts.privateKeyToAccount(privateKey);
    const walletAdd = web3.eth.accounts.wallet.add(account);
    res.json({
      message: 'Account added to wallet successfully.',
      privateKey: walletAdd[0].privateKey,
      address: walletAdd[0].address,
    });
  } catch (err) {
    logger.info('Error: ' + err);
    res.status(500).json({ error: 'Error adding account to wallet.' });
  }
});

routes.post('/remove', (req, res) => {
  logger.info('web3.eth.accounts.wallet.remove');
  try {
    const { address } = req.body;
    const accountIndex = web3.eth.accounts.wallet.findIndex(
      (acc) => acc.address === address,
    );
    if (accountIndex === -1) {
      return res.status(400).json({ error: 'Account not found in wallet.' });
    }
    web3.eth.accounts.wallet.remove(accountIndex);
    res.json({ message: 'Account successfully removed from wallet.' });
  } catch (err) {
    logger.info('Error: ' + err);
    res.status(500).json({ error: 'Error removing account.' });
  }
});

export default routes;
