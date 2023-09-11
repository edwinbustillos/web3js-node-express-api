import app from './app';
import dotenv from 'dotenv';
import logger from './utils/logger';

dotenv.config();
const port = process.env.PORT;
app.listen(port, () => {
  logger.info('API Server is running');
  logger.info(`Server is running at http://localhost:${port}`);
});
