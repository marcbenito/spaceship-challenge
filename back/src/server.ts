import App from '@/app';
import CalculateRouteOdds from '@/routes/calculate-route-odds.route';

const app = new App();
app.init([new CalculateRouteOdds()])
    .then(() => {
        app.listen();
    })
    .catch((err) => {
        console.error(err);
        process.exit(1);
    });
