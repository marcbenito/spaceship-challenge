import { Spaceship } from '@/models/spaceship-trip.model';
import CalculateRouteOddsController from './calculate-route-odds.controller';
import { Request, Response } from 'express';

jest.mock('@/services/get-files.service');
import { getSpaceshipFile } from '@/services/get-files.service';

jest.mock('@/services/route-planner.service');
jest.mock('@/services/database-route.service');
jest.mock('formidable');

describe('CalculateRouteOddsController', () => {
    it('should be defined', () => {
        expect(new CalculateRouteOddsController()).toBeDefined();
    });
    describe('calculateRouteOdds with all dependencies mocked', () => {
        const calculateController = new CalculateRouteOddsController();

        beforeEach(() => {
            calculateController.getUploadedFilePath = jest.fn(() => {
                return Promise.resolve('xxxx');
            });
        });
        it('should call the service calculateRouteOdss', async () => {
            const mReq = {};
            const mRes = {};

            mRes['status'] = jest.fn().mockReturnThis();
            const spy = jest.spyOn(calculateController, 'calculateRouteOdds');
            mRes['send'] = jest.fn().mockReturnThis();
            mRes['end'] = jest.fn().mockReturnThis();

            (getSpaceshipFile as jest.Mock).mockReturnValue(
                Promise.resolve({ routes_db: 'ssx', autonomy: 4, departure: '', arrival: 'ss' } as Spaceship)
            );
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            await calculateController.calculateRouteOdds(mReq as Request, mRes as Response, () => {});

            expect(mRes['status']).toHaveBeenCalled();
            expect(mRes['status']).toHaveBeenCalledWith(201);
            expect(spy).toHaveBeenCalled();
        });
    });
});
