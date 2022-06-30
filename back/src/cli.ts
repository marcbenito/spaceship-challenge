#!/usr/bin/env node

import { RoutePlanner } from './services/route-planner.service';

import { getRoutes } from '@/services/database-route.service';
import path from 'path';
import { getHunterFile, getSpaceshipFile } from './services/get-files.service';

if (process.argv.length !== 4) {
    console.log('Please provide a valid command ex: node give-me-the-odds spaceship-falc-file.json hunter.json');
    process.exit(1);
}

async function proccessCommand() {
    let spaceshipPath = process.argv[2];
    if (!path.isAbsolute(spaceshipPath)) {
        spaceshipPath = path.join(process.cwd(), spaceshipPath);
    }
    const spaceshipConfig = await getSpaceshipFile(spaceshipPath);

    let hunterPath = process.argv[3];
    if (!path.isAbsolute(hunterPath)) {
        hunterPath = path.join(process.cwd(), hunterPath);
    }
    const hunter = await getHunterFile(process.argv[3]);

    let dbRoute = spaceshipConfig.routes_db;
    if (!path.isAbsolute(spaceshipConfig.routes_db)) {
        const spaceshipPathWithoutName = spaceshipPath.split('/').slice(0, -1).join('/');
        dbRoute = path.join(spaceshipPathWithoutName, dbRoute);
    }
    const routes = await getRoutes(dbRoute);

    const routePlanner = new RoutePlanner(routes, spaceshipConfig, hunter);
    return await routePlanner.calculateRoutes();
}

proccessCommand()
    .then((result) => {
        console.log(result.odds);
        process.exit();
    })
    .catch((err) => {
        console.log('err', err);
    });
