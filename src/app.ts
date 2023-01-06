import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';

export class App {
  public express: express.Application;

  public constructor() {
    this.express = express();

    this.middlewares();
    this.database();
    this.routes();
  }

  private middlewares(): void {
    this.express.use(express.json());
    this.express.use(cors());
  }

  private database(): void {
    mongoose.connect(
      'mongodb+srv://dummyuser:dummyuser@cluster1.qjai6.mongodb.net/?retryWrites=true&w=majority',
      {
        useNewUrlParser: true,
      },
    );
  }

  private routes(): void {
    this.express.get('/', (req, res) => {
      return res.send('Hello World');
    });
  }
}

export default new App().express;
