"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const reservation_controller_1 = require("./reservation.controller");
// Create reservation router
const reservation = (app) => {
    app.route("/reservation").post(async (req, res, next) => {
        try {
            await (0, reservation_controller_1.createReservationController)(req, res);
        }
        catch (error) {
            next(error);
        }
    });
    // Get all reservations
    app.route("/reservation").get(async (req, res, next) => {
        try {
            await (0, reservation_controller_1.getReservationController)(req, res);
        }
        catch (error) {
            next(error);
        }
    });
    // Get reservation by ID
    app.route("/reservation/:id").get(async (req, res, next) => {
        try {
            await (0, reservation_controller_1.getReservationByIdController)(req, res);
        }
        catch (error) {
            next(error);
        }
    });
    // Update reservation by ID
    app.route("/reservation/:id").put(async (req, res, next) => {
        try {
            await (0, reservation_controller_1.updateReservationController)(req, res);
        }
        catch (error) {
            next(error);
        }
    });
    // Delete reservation by ID
    app.route("/reservation/:id").delete(async (req, res, next) => {
        try {
            await (0, reservation_controller_1.deleteReservationController)(req, res);
        }
        catch (error) {
            next(error);
        }
    });
};
exports.default = reservation;
