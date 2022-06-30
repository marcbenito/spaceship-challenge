import { Router } from 'express';
import supertest from 'supertest';

import App from './app';

let app;
beforeAll(async () => {
    const router = Router();
    router.get('/', (req, res) => {
        res.send({ infrastructure: 'Basic APP test' });
    });
    app = new App();
    await app.init([{ router }]);
    await app.listen();
    app = app.app;
});
describe('Jobs', () => {
    describe('GET /', () => {
        it('when valid  url provided should serve', async () => {
            const { body, statusCode } = await supertest(app).get('/');
            expect(statusCode).toEqual(200);
            expect(body).toMatchObject({ infrastructure: 'Basic APP test' });
        });
    });
});
