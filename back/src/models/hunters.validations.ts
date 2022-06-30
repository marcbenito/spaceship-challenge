import { BadPeoplePosition, Hunter } from '@/models/hunters.model';
import { IsInt, IsNumber, IsPositive, IsString, ValidateNested } from 'class-validator';

export class HunterValidator implements Hunter {
    @IsInt()
    @IsPositive()
    public countdown: number;

    @ValidateNested()
    public bad_people: BadPeoplePosition[];
}

export class BadPeoplePositionValidator implements BadPeoplePosition {
    @IsString()
    public planet: string;

    @IsNumber()
    public day: number;
}
