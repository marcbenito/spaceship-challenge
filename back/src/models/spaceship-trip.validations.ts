import { Spaceship } from '@/models/spaceship-trip.model';
import { IsInt, IsPositive, IsString } from 'class-validator';

export class SpaceshipValidator implements Spaceship {
    @IsPositive()
    @IsInt()
    autonomy: number;

    @IsString()
    departure: string;

    @IsString()
    arrival: string;

    @IsString()
    routes_db: string;
}
