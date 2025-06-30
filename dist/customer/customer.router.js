"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const customer_controller_1 = require("./customer.controller");
const bearAuth_1 = require("../middleware/bearAuth");
const customer = (app) => {
    app.route("/customer").post(async (req, res, next) => {
        try {
            await (0, customer_controller_1.createCustomerController)(req, res);
        }
        catch (error) {
            next(error);
        }
    });
    //verify customer route
    app.route("/customer/verify").post(async (req, res, next) => {
        try {
            await (0, customer_controller_1.verifyCustomerController)(req, res);
        }
        catch (error) {
            next(error);
        }
    });
    //resend verification code route
    app.route("/customer/resend-verification").post(async (req, res, next) => {
        try {
            await (0, customer_controller_1.resendVerificationCodeController)(req, res);
        }
        catch (error) {
            next(error);
        }
    });
    //login customer route
    app.route("/customer/login").post(async (req, res, next) => {
        try {
            await (0, customer_controller_1.customerLoginController)(req, res);
        }
        catch (error) {
            next(error);
        }
    });
    app.route("/customer").get(bearAuth_1.bothRoleAuth, async (req, res, next) => {
        try {
            await (0, customer_controller_1.getCustomerController)(req, res);
        }
        catch (error) {
            next(error);
        }
    });
    //customer with bookings controller
    app.route("/customer/:id/bookings").get(async (req, res, next) => {
        try {
            await (0, customer_controller_1.getCustomerWithBookingsController)(req, res);
        }
        catch (error) {
            next(error);
        }
    });
    app.route("/customer/:id").get(async (req, res, next) => {
        try {
            await (0, customer_controller_1.getCustomerByIdController)(req, res);
        }
        catch (error) {
            next(error);
        }
    });
    app.route("/customer/:id/bookings-payments").get(async (req, res, next) => {
        try {
            await (0, customer_controller_1.getCustomersWithPaymentsAndBookingsController)(req, res);
        }
        catch (error) {
            next(error);
        }
    });
    //update customer by id
    app.route("/customer/:id").put(async (req, res, next) => {
        try {
            await (0, customer_controller_1.updateCustomerController)(req, res);
        }
        catch (error) {
            next(error);
        }
    });
    //delete customer by id
    app.route("/customer/:id").delete(async (req, res, next) => {
        try {
            await (0, customer_controller_1.deleteCustomerController)(req, res);
        }
        catch (error) {
            next(error);
        }
    });
    // get customer with reservations route
    app.route("/customer/:id/reservations").get(async (req, res, next) => {
        try {
            await (0, customer_controller_1.getCustomerWithReservationsController)(req, res);
        }
        catch (error) {
            next(error);
        }
    });
    app.route("/customer/:id/booking-payment").get(async (req, res, next) => {
        try {
            await (0, customer_controller_1.getCustomersWithPaymentsAndBookingsControllerById)(req, res);
        }
        catch (error) {
            next(error);
        }
    });
};
exports.default = customer;
