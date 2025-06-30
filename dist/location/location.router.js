"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const location_controller_1 = require("./location.controller");
// Create location router
const location = (app) => {
    app.route("/location").post(async (req, res, next) => {
        try {
            await (0, location_controller_1.createLocationController)(req, res);
        }
        catch (error) {
            next(error);
        }
    });
    // Get all locations
    app.route("/location").get(async (req, res, next) => {
        try {
            await (0, location_controller_1.getLocationsController)(req, res);
        }
        catch (error) {
            next(error);
        }
    });
    // Get location by ID
    app.route("/location/:id").get(async (req, res, next) => {
        try {
            await (0, location_controller_1.getLocationByIdController)(req, res);
        }
        catch (error) {
            next(error);
        }
    });
    // Update location by ID
    app.route("/location/:id").put(async (req, res, next) => {
        try {
            await (0, location_controller_1.updateLocationController)(req, res);
        }
        catch (error) {
            next(error);
        }
    });
    // Delete location by ID
    app.route("/location/:id").delete(async (req, res, next) => {
        try {
            await (0, location_controller_1.deleteLocationController)(req, res);
        }
        catch (error) {
            next(error);
        }
    });
};
exports.default = location;
