import compression from 'compression';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

import { NODE_ENV, PORT, LOG_FORMAT } from '@config';

import { logger, stream } from '@utils/logger';
import { Routes } from '@/routes/routes.interface';

class App {
    public app: express.Application;
    public env: string;
    public port: string | number;

    constructor() {
        this.app = express();
        this.env = NODE_ENV || 'development';
        this.port = PORT || 3003;
    }
    public async init(routes: Routes[]) {
        try {
            this.initializeMiddlewares();
            this.initializeRoutes(routes);
        } catch (e) {
            logger.error(`ERROR: ${e}`);
        }
    }

    public listen() {
        this.app.listen(this.port, () => {
            logger.info(`=================================`);
            logger.info(`======= ENV: ${this.env} =======`);
            logger.info(`🚀 App listening on the port ${this.port}`);
            logger.info(`=================================`);
        });
    }

    public getServer() {
        return this.app;
    }

    private initializeMiddlewares() {
        this.app.use(morgan(LOG_FORMAT || 'dev', { stream }));
        this.app.use(helmet()); //provides HTTP headers security
        this.app.use(cors());
        this.app.use(compression());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
    }

    private initializeRoutes(routes: Routes[]) {
        routes.forEach((route) => {
            this.app.use('/', route.router);
        });
    }
}

export default App;
