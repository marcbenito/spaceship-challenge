import * as fs from 'fs';
import { Spaceship } from '@/models/spaceship-trip.model';
import { SpaceshipValidator } from '@/models/spaceship-trip.validations';
import { validate } from 'class-validator';
import { Hunter } from '@/models/hunters.model';
import { HunterValidator } from '@/models/hunters.validations';

export async function getSpaceshipFile(filePath: string): Promise<Spaceship> {
    const data = fs.readFileSync(filePath, 'utf8');

    let spaceship: Spaceship;
    try {
        spaceship = JSON.parse(data) as Spaceship;
    } catch (e) {
        throw { statusCode: 400, message: 'Invalid Spaceship  file' };
    }

    spaceship = Object.assign(new SpaceshipValidator(), spaceship);

    const errors = await validate(spaceship);
    if (errors.length > 0) {
        throw { statusCode: 400, message: errors.toString() };
    }
    return spaceship as Spaceship;
}

export async function getHunterFile(eimpirePath: string): Promise<Hunter> {
    const data = fs.readFileSync(eimpirePath, 'utf8');

    let hunter: Hunter;
    try {
        hunter = JSON.parse(data) as Hunter;
    } catch (e) {
        throw { statusCode: 400, message: 'Invalid Hunter file' };
    }

    hunter = Object.assign(new HunterValidator(), hunter);

    const errors = await validate(hunter);
    if (errors.length > 0) {
        throw { statusCode: 400, message: errors.toString() };
    }
    return hunter as Hunter;
}
