import { Hunter } from '@/models/hunters.model';
import { Spaceship } from '@/models/spaceship-trip.model';
import { PlanetRoute } from '@/models/planet-route.model';
import { RoutePlanner } from './route-planner.service';

describe('Route planner', () => {
    let planetList: PlanetRoute[], spaceship: Spaceship, hunter: Hunter;
    describe('Default universe', () => {
        beforeEach(() => {
            planetList = [
                { origin: 'Tatooine', destination: 'Dagobah', travel_time: 6 },
                { origin: 'Dagobah', destination: 'Endor', travel_time: 4 },
                { origin: 'Dagobah', destination: 'Hoth', travel_time: 1 },
                { origin: 'Hoth', destination: 'Endor', travel_time: 1 },
                { origin: 'Tatooine', destination: 'Hoth', travel_time: 6 }
            ];

            spaceship = {
                autonomy: 6,
                departure: 'Tatooine',
                arrival: 'Endor',
                routes_db: 'universe.db'
            };

            hunter = {
                countdown: 7,
                bad_people: [
                    { planet: 'Hoth', day: 6 },
                    { planet: 'Hoth', day: 7 },
                    { planet: 'Hoth', day: 8 }
                ]
            };
        });
        describe('with countdown = 2 and destination = departure ', () => {
            it('should return 100% with 0 steps', () => {
                hunter.countdown = 2;
                spaceship.departure = 'Tatooine';
                spaceship.arrival = 'Tatooine';
                const planner = new RoutePlanner(planetList, spaceship, hunter);
                const resp = planner.calculateRoutes();
                expect(resp.odds).toBe(100);
                expect(resp.routes.length).toBe(0);
            });
        });
        describe('with countdown = 7 ', () => {
            it('should return 0', () => {
                hunter.countdown = 7;
                const planner = new RoutePlanner(planetList, spaceship, hunter);
                const resp = planner.calculateRoutes();
                expect(resp.odds).toBe(0);
            });
        });
        describe('with countdown = 8 ', () => {
            it('should return 81', () => {
                hunter.countdown = 8;
                const planner = new RoutePlanner(planetList, spaceship, hunter);
                const resp = planner.calculateRoutes();
                expect(resp.odds).toBe(81);
            });
        });

        describe('with countdown = 9 ', () => {
            it('should return 90', () => {
                hunter.countdown = 9;
                const planner = new RoutePlanner(planetList, spaceship, hunter);
                const resp = planner.calculateRoutes();
                expect(resp.odds).toBe(90);
            });
        });
        describe('with countdown = 10 ', () => {
            it('should return 100', () => {
                hunter.countdown = 10;
                const planner = new RoutePlanner(planetList, spaceship, hunter);
                const resp = planner.calculateRoutes();
                expect(resp.odds).toBe(100);
            });
        });
    });
    describe('example  universe V2 ', () => {
        beforeEach(() => {
            planetList = [
                { origin: 'A', destination: 'B', travel_time: 1 },
                { origin: 'B', destination: 'C', travel_time: 1 },
                { origin: 'C', destination: 'D', travel_time: 1 },
                { origin: 'D', destination: 'E', travel_time: 1 },
                { origin: 'D', destination: 'F', travel_time: 1 }
            ];

            spaceship = {
                autonomy: 6,
                departure: 'A',
                arrival: 'F',
                routes_db: 'universe.db'
            };

            hunter = {
                countdown: 6,
                bad_people: [
                    { planet: 'A', day: 4 },
                    { planet: 'B', day: 4 },
                    { planet: 'C', day: 4 },
                    { planet: 'D', day: 4 },
                    { planet: 'F', day: 4 }
                ]
            };
        });
        describe('with countdown = 5 ', () => {
            it('should return 0', () => {
                hunter.countdown = 5;
                const planner = new RoutePlanner(planetList, spaceship, hunter);
                const resp = planner.calculateRoutes();
                expect(resp.routes).toMatchObject([
                    { fromPlanet: 'A', toPlanet: 'B', day: 1, wasBountyHunters: false },
                    { fromPlanet: 'B', toPlanet: 'C', day: 2, wasBountyHunters: false },
                    { fromPlanet: 'C', toPlanet: 'D', day: 3, wasBountyHunters: false },
                    { fromPlanet: 'D', toPlanet: 'F', day: 4, wasBountyHunters: true }
                ]);
                expect(resp.odds).toBe(90);
            });
        });
        describe('with countdown = 6 ', () => {
            it('should return 0', () => {
                hunter.countdown = 6;
                const planner = new RoutePlanner(planetList, spaceship, hunter);
                const resp = planner.calculateRoutes();
                expect(resp.routes).toMatchObject([
                    { fromPlanet: 'A', toPlanet: 'B', day: 1, wasBountyHunters: false },
                    { fromPlanet: 'B', toPlanet: 'C', day: 2, wasBountyHunters: false },
                    { fromPlanet: 'C', toPlanet: 'D', day: 3, wasBountyHunters: false },
                    { fromPlanet: 'D', toPlanet: 'E', day: 4, wasBountyHunters: false },
                    { fromPlanet: 'E', toPlanet: 'D', day: 5, wasBountyHunters: false },
                    { fromPlanet: 'D', toPlanet: 'F', day: 6, wasBountyHunters: false }
                ]);
                expect(resp.odds).toBe(100);
            });
        });
        describe('with Bounties in B until day 14 and with countdown 100 ', () => {
            it('should return 100%', () => {
                hunter = {
                    countdown: 100,
                    bad_people: [
                        { planet: 'B', day: 1 },
                        { planet: 'B', day: 2 },
                        { planet: 'B', day: 3 },
                        { planet: 'B', day: 4 },
                        { planet: 'B', day: 5 },
                        { planet: 'B', day: 6 },
                        { planet: 'B', day: 7 },
                        { planet: 'B', day: 8 },
                        { planet: 'B', day: 9 },
                        { planet: 'B', day: 10 },
                        { planet: 'B', day: 11 },
                        { planet: 'B', day: 12 },
                        { planet: 'B', day: 13 },
                        { planet: 'B', day: 14 }
                    ]
                };
                const planner = new RoutePlanner(planetList, spaceship, hunter);
                const resp = planner.calculateRoutes();
                expect(resp.odds).toBe(100);

                expect(resp.routes).toMatchObject([
                    { planet: 'A', day: 1, wait: true, wasBountyHunters: false },
                    { planet: 'A', day: 2, wait: true, wasBountyHunters: false },
                    { planet: 'A', day: 3, wait: true, wasBountyHunters: false },
                    { planet: 'A', day: 4, wait: true, wasBountyHunters: false },
                    { planet: 'A', day: 5, wait: true, wasBountyHunters: false },
                    { planet: 'A', day: 6, wait: true, wasBountyHunters: false },
                    { planet: 'A', day: 7, wait: true, wasBountyHunters: false },
                    { planet: 'A', day: 8, wait: true, wasBountyHunters: false },
                    { planet: 'A', day: 9, wait: true, wasBountyHunters: false },
                    { planet: 'A', day: 10, wait: true, wasBountyHunters: false },
                    { planet: 'A', day: 11, wait: true, wasBountyHunters: false },
                    { planet: 'A', day: 12, wait: true, wasBountyHunters: false },
                    { planet: 'A', day: 13, wait: true, wasBountyHunters: false },
                    { planet: 'A', day: 14, wait: true, wasBountyHunters: false },
                    { fromPlanet: 'A', toPlanet: 'B', day: 15, wasBountyHunters: false },
                    { fromPlanet: 'B', toPlanet: 'C', day: 16, wasBountyHunters: false },
                    { fromPlanet: 'C', toPlanet: 'D', day: 17, wasBountyHunters: false },
                    { fromPlanet: 'D', toPlanet: 'F', day: 18, wasBountyHunters: false }
                ]);
            });
        });
    });
});
