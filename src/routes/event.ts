import { Router } from 'express';
import Web3 from 'web3';
import dotenv from 'dotenv';

dotenv.config();

const url: string = String(process.env.URL);
const web3 = new Web3(new Web3.providers.HttpProvider(url));
const routes = Router();

routes.post('/', async (req, res) => {
  try {
    const { events } = req.body;

    if (!Array.isArray(events) || events.length === 0) {
      return res.status(400).json({ Error: 'Lista de eventos inválida.' });
    }

    const subscriptions: unknown[] = [];

    for (const event of events) {
      const { address, name, options } = event;
      const subscription = web3.eth.subscribe('logs', {
        address,
        topics: [web3.utils.sha3(name)],
        ...options,
      });

      (await subscription).on('data', (log: unknown) => {
        console.log(`Event ${name} received:`, log);
      });

      subscriptions.push(subscription);
    }

    res.json({ message: 'Registering for successful events.' });
  } catch (error) {
    console.error('Error when registering for events:', error);
    res.status(500).json({ Error: 'Registering for events.' });
  }
});

export default routes;
