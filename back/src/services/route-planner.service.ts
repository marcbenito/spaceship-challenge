import { Spaceship } from '@/models/spaceship-trip.model';
import { PlanetRoute } from '@/models/planet-route.model';
import { Hunter } from '@/models/hunters.model';
//import { logger } from '@/utils/logger';

interface PlanetNode {
    name: string;
    routes: PlanetNodeRoute[];
}

interface PlanetNodeRoute {
    dest: PlanetNode;
    cost: number;
}

interface BadPeoplePosition {
    planet: string;
    day: number;
}

interface RouteToCheck {
    planet: PlanetNode;
    spentTime: number;
    availableFuel: number;
    deep: string;
    steps: StepAction[];
}

interface StepAction {
    wasBountyHunters: boolean;
    day: number;
}

interface Travel extends StepAction {
    fromPlanet: string;
    toPlanet: string;
}
interface Wait extends StepAction {
    planet: string;
    wait: boolean;
}
interface Refuel extends StepAction {
    planet: string;
    refuel: boolean;
}

export class RoutePlanner {
    public planets = {};
    private routesToCheck: RouteToCheck[] = [];
    private hunterOptions: Hunter;
    private spaceshipOptions: Spaceship;
    constructor(planetRoutes: PlanetRoute[], spaceship: Spaceship, hunterOptions: Hunter) {
        planetRoutes.forEach((element) => {
            let planetA: PlanetNode;
            let planetB: PlanetNode;

            this.spaceshipOptions = spaceship;
            this.hunterOptions = hunterOptions;
            //Planet A does not exist in DB
            if (!this.planets[element.origin]) {
                planetA = { name: element.origin, routes: [] };
                this.planets[planetA.name] = planetA;
            } else {
                planetA = this.planets[element.origin];
            }

            //Planet B filling
            if (!this.planets[element.destination]) {
                planetB = { name: element.destination, routes: [] };
                this.planets[planetB.name] = planetB;
            } else {
                planetB = this.planets[element.destination];
            }

            planetA.routes.push({ dest: planetB, cost: element.travel_time });
            planetB.routes.push({ dest: planetA, cost: element.travel_time });
        });
    }

    public calculateRoutes() {
        const planetA = this.planets[this.spaceshipOptions.departure];
        const planetB = this.planets[this.spaceshipOptions.arrival];

        //logger.info(`Calculating routes from ${this.spaceshipOptions.departure} to ${this.spaceshipOptions.arrival}`);

        if (planetA === planetB) {
            return {
                odds: 100,
                routes: []
            };
        }

        this.addActionsForPlanet(planetA, 0, this.spaceshipOptions.autonomy, '-', []);

        let finish = false;
        let journey: StepAction[] = null;
        let journeyOdds: number = null;
        while (this.routesToCheck.length > 0 && !finish) {
            const route = this.routesToCheck.shift();
            const odds = this.getTheOdds(route.steps);
            if (route.planet.name === this.spaceshipOptions.arrival) {
                //logger.info(`ROUTE FOUND!!!! odds=${odds}  route:${route.steps}`);

                if (odds === 100) {
                    finish = true;
                    journey = route.steps;
                    journeyOdds = odds;
                } else if (!journey) {
                    journey = route.steps;
                    journeyOdds = odds;
                } else if (journey && odds > journeyOdds) {
                    journey = route.steps;
                    journeyOdds = odds;
                }
            } else {
                if (journeyOdds && odds <= journeyOdds) {
                    //No need to do.. the solution should be worst
                } else if (route.spentTime <= this.hunterOptions.countdown) {
                    this.addActionsForPlanet(route.planet, route.spentTime, route.availableFuel, route.deep, route.steps);
                }
            }
        }

        return {
            odds: journeyOdds || 0,
            routes: journey
        };
    }

    private addActionsForPlanet(planet: PlanetNode, spentTime: number, availableFuel: number, deep: string, steps: StepAction[]) {
        let minDistance = 9999999;
        planet.routes.forEach((route) => {
            if (route.cost > this.hunterOptions.countdown - spentTime) {
                //logger.info(`${deep} NO TIME to reach ${route.dest.name}`);
            } else {
                if (route.cost <= availableFuel) {
                    //logger.info(`${deep}  traveling to  ${route.dest.name}`);

                    const nextStep = this.addTravelAction(planet.name, route.dest.name, spentTime + route.cost);
                    if (minDistance && minDistance > route.cost) {
                        minDistance = route.cost;
                    }
                    this.routesToCheck.push({
                        planet: route.dest,
                        spentTime: spentTime + route.cost,
                        availableFuel: availableFuel - route.cost,
                        deep: deep + '-',
                        steps: steps.concat(nextStep)
                    });
                }
            }
        });

        //add refuel action
        if (availableFuel < this.spaceshipOptions.autonomy) {
            //logger.info(`${deep} Refuel Action in  ${planet.name}`);
            const nextStep = this.addRefillAction(planet.name, spentTime + 1);

            this.routesToCheck.push({
                planet: planet,
                spentTime: spentTime + 1,
                availableFuel: this.spaceshipOptions.autonomy,
                deep: deep + '-',
                steps: steps.concat(nextStep)
            });
        } else {
            //Add wait action if enough time
            if (this.hunterOptions.countdown - spentTime >= 1 + minDistance) {
                //logger.info(`${deep} wait on ${planet.name}`);
                const nextStep = this.addWaitAction(planet.name, spentTime + 1);

                this.routesToCheck.push({
                    planet: planet,
                    spentTime: spentTime + 1,
                    availableFuel: this.spaceshipOptions.autonomy,
                    deep: deep + '-',
                    steps: steps.concat(nextStep)
                });
            }
        }
    }

    private hasBountyHunters(planetName, day) {
        const res = this.hunterOptions.bad_people.find((elem: BadPeoplePosition) => {
            return planetName === elem.planet && day === elem.day;
        });
        return res !== undefined;
    }
    public addRefillAction(planet: string, day: number) {
        return { planet: planet, refuel: true, day: day, wasBountyHunters: this.hasBountyHunters(planet, day) } as Refuel;
    }

    private addTravelAction(fromplanetName: string, toPlanetName: string, dayToArrive: number) {
        return {
            fromPlanet: fromplanetName,
            toPlanet: toPlanetName,
            day: dayToArrive,
            wasBountyHunters: this.hasBountyHunters(toPlanetName, dayToArrive)
        } as Travel;
    }
    private addWaitAction(fromplanetName: string, dayToArrive: number) {
        return {
            planet: fromplanetName,
            day: dayToArrive,
            wait: true,
            wasBountyHunters: this.hasBountyHunters(fromplanetName, dayToArrive)
        } as Wait;
    }

    private getTheOdds(arr): number {
        let probability = 1.0;
        arr.forEach((element) => {
            if (element.wasBountyHunters) {
                probability = probability * 0.9;
            }
        });
        return Math.floor(probability * 100);
    }
}
