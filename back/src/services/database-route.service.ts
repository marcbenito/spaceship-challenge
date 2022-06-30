import Knex from 'knex';

import path from 'path';
import { PlanetRoute } from '../models/planet-route.model';

export async function getRoutes(dbPath: string): Promise<PlanetRoute[]> {
    const dbConnection = {
        client: 'sqlite3',
        connection: {
            filename: path.join(dbPath)
        },
        useNullAsDefault: true
    };

    const conn = Knex(dbConnection);

    const routes = (await conn.select('').from('ROUTES')) as PlanetRoute[];

    return routes;
}
