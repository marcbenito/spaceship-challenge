import { Router } from 'express';
import CalculateRouteOddsController from '@/controllers/calculate-route-odds.controller';
import { Routes } from '@routes/routes.interface';

class CalculateRouteOdds implements Routes {
    public path = '/';
    public router = Router();
    public calculateRoute = new CalculateRouteOddsController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(`${this.path}upload`, this.calculateRoute.calculateRouteOdds);
    }
}

export default CalculateRouteOdds;
