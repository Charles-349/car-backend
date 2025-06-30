"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const payment_controller_1 = require("./payment.controller");
// create payment
const payment = (app) => {
    app.route("/payment").post(async (req, res, next) => {
        try {
            await (0, payment_controller_1.createPaymentController)(req, res);
        }
        catch (error) {
            next(error);
        }
    });
    // get all payments
    app.route("/payment").get(async (req, res, next) => {
        try {
            await (0, payment_controller_1.getPaymentsController)(req, res);
        }
        catch (error) {
            next(error);
        }
    });
    // get payment by id
    app.route("/payment/:id").get(async (req, res, next) => {
        try {
            await (0, payment_controller_1.getPaymentByIdController)(req, res);
        }
        catch (error) {
            next(error);
        }
    });
    // update payment by id
    app.route("/payment/:id").put(async (req, res, next) => {
        try {
            await (0, payment_controller_1.updatePaymentController)(req, res);
        }
        catch (error) {
            next(error);
        }
    });
    // delete payment by id
    app.route("/payment/:id").delete(async (req, res, next) => {
        try {
            await (0, payment_controller_1.deletePaymentController)(req, res);
        }
        catch (error) {
            next(error);
        }
    });
};
exports.default = payment;
