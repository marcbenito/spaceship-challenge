import { NextFunction, Request, Response } from 'express';
import path from 'path';
import formidable from 'formidable';

import { logger } from '@/utils/logger';
import { getRoutes } from '@/services/database-route.service';
import { RoutePlanner } from '@/services/route-planner.service';
import { getHunterFile, getSpaceshipFile } from '@/services/get-files.service';

class CalculateRouteOddsController {
    public async getUploadedFilePath(req: Request): Promise<string> {
        return await new Promise((resolve) => {
            const form = new formidable.IncomingForm();
            form.parse(req, async (err, fields, files) => {
                resolve(files.file.filepath);
            });
        });
    }

    public calculateRouteOdds = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const filePath = await this.getUploadedFilePath(req);

            const hunter = await getHunterFile(filePath);
            const spaceshipConfig = await getSpaceshipFile('./spaceship-trip.json');

            let dbRoute = spaceshipConfig.routes_db;
            if (!path.isAbsolute(spaceshipConfig.routes_db)) {
                dbRoute = path.join('./', spaceshipConfig.routes_db);
            }

            const routes = await getRoutes(dbRoute);

            const routePlanner = new RoutePlanner(routes, spaceshipConfig, hunter);

            const hrstart = process.hrtime();
            const planingValues = routePlanner.calculateRoutes();
            const hrend = process.hrtime(hrstart);

            logger.info(`
                Route planner executed:
                \troutes: ${JSON.stringify(routes)}
                \t hunter data:  ${JSON.stringify(hunter)}
                \t spaceship-trip config: ${JSON.stringify(spaceshipConfig)}
                \t result: ${JSON.stringify(planingValues)}
                \t Execution time (hr): ${hrend[0]}s ${hrend[1] / 1000000}ms `);

            res.status(201).send(planingValues).end();
        } catch (error) {
            if (error.statusCode) {
                res.status(error.statusCode).send(error.message);
            }
            logger.error(error);
            next(error);
        }
    };
}

export default CalculateRouteOddsController;
