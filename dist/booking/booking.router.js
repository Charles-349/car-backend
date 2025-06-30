"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const booking_controller_1 = require("./booking.controller");
const bearAuth_1 = require("../middleware/bearAuth");
// Create booking router
const booking = (app) => {
    app.route("/booking").post(bearAuth_1.bothRoleAuth, async (req, res, next) => {
        try {
            await (0, booking_controller_1.createBookingController)(req, res);
        }
        catch (error) {
            next(error);
        }
    });
    // Get all bookings
    app.route("/booking").get(bearAuth_1.adminRoleAuth, async (req, res, next) => {
        try {
            await (0, booking_controller_1.getBookingsController)(req, res);
        }
        catch (error) {
            next(error);
        }
    });
    // Get booking by ID
    app.route("/booking/:id").get(bearAuth_1.bothRoleAuth, async (req, res, next) => {
        try {
            await (0, booking_controller_1.getBookingByIdController)(req, res);
        }
        catch (error) {
            next(error);
        }
    });
    // Get bookings by customer ID
    app.route("/booking/customer/:customerId").get(bearAuth_1.userRoleAuth, async (req, res, next) => {
        try {
            await (0, booking_controller_1.getBookingByCustomerIdController)(req, res);
        }
        catch (error) {
            next(error);
        }
    });
    // Update booking by ID
    app.route("/booking/:id").put(bearAuth_1.bothRoleAuth, async (req, res, next) => {
        try {
            await (0, booking_controller_1.updateBookingController)(req, res);
        }
        catch (error) {
            next(error);
        }
    });
    // Delete booking by ID
    app.route("/booking/:id").delete(bearAuth_1.adminRoleAuth, async (req, res, next) => {
        try {
            await (0, booking_controller_1.deleteBookingController)(req, res);
        }
        catch (error) {
            next(error);
        }
    });
};
exports.default = booking;
