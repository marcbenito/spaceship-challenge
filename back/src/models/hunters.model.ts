export interface Hunter {
    bad_people: BadPeoplePosition[];
    countdown: number;
}
export interface BadPeoplePosition {
    planet: string;
    day: number;
}
