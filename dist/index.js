"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const customer_router_1 = __importDefault(require("./customer/customer.router"));
const car_router_1 = __importDefault(require("./car/car.router"));
const payment_router_1 = __importDefault(require("./payment/payment.router"));
const booking_router_1 = __importDefault(require("./booking/booking.router"));
const location_router_1 = __importDefault(require("./location/location.router"));
const insurance_router_1 = __importDefault(require("./insurance/insurance.router"));
const maintenance_router_1 = __importDefault(require("./maintenance/maintenance.router"));
const reservation_router_1 = __importDefault(require("./reservation/reservation.router"));
const cors_1 = __importDefault(require("cors"));
const initializeApp = () => {
    const app = (0, express_1.default)();
    //middleware
    app.use((0, cors_1.default)({
        origin: ' http://localhost:5173',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
    }));
    app.use(express_1.default.json());
    //routes
    (0, customer_router_1.default)(app);
    (0, car_router_1.default)(app);
    (0, payment_router_1.default)(app);
    (0, booking_router_1.default)(app);
    (0, location_router_1.default)(app);
    (0, insurance_router_1.default)(app);
    (0, maintenance_router_1.default)(app);
    (0, reservation_router_1.default)(app);
    app.get('/', (req, res) => {
        res.send('Welcome to the Car Rental API');
    });
    return app;
};
const app = initializeApp();
exports.default = app;
