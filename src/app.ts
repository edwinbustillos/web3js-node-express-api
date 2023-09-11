import express, { Application } from 'express';
import routes from './routes';

class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(express.json());
  }

  protected routes(): void {
    this.app.use(routes);
  }
}
export default new App().app;
