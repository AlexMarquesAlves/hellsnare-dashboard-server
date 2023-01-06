import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import mongoose from 'mongoose';
import morgan from 'morgan';
import routes from './routes';
import clientRoutes from './routes/client';
import generalRoutes from './routes/general';
import managementRoutes from './routes/management';
import salesRoutes from './routes/sales';

/* CONFIGURATION */
dotenv.config();
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
    this.express.use(helmet());
    this.express.use(
      helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }),
    );
    this.express.use(morgan('common'));
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
  }

  private database(): void {
    mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
    });
  }

  private routes(): void {
    this.express.use(routes);
    this.express.use('/client', clientRoutes);
    this.express.use('/general', generalRoutes);
    this.express.use('/management', managementRoutes);
    this.express.use('/sales', salesRoutes);
  }
}

export default new App().express;
