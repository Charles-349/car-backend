import express from 'express';
import customer from './customer/customer.router';
import car from "./car/car.router";
import payment from "./payment/payment.router";
import booking from "./booking/booking.router";
import location from "./location/location.router";
import insurance from './insurance/insurance.router';
import maintenance from './maintenance/maintenance.router';
import reservation from './reservation/reservation.router';
import cors from 'cors'


const initializeApp = ()=>{
const app = express();

//middleware
app.use(cors({
  origin: ['http://localhost:5173', 'https://car-frontend-umber.vercel.app'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

app.use(express.json());


//routes
customer(app);
car(app);
payment(app);
booking(app);
location(app);
insurance(app);
maintenance(app);
reservation(app);
app.get('/', (req, res) => {
    res.send('Welcome to the Car Rental API');
}
)
return app

}
const app = initializeApp()
export default app;



