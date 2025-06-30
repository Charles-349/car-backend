"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const maintenance_controller_1 = require("./maintenance.controller");
// Create maintenance router
const maintenance = (app) => {
    app.route("/maintenance").post(async (req, res, next) => {
        try {
            await (0, maintenance_controller_1.createMaintenanceController)(req, res);
        }
        catch (error) {
            next(error);
        }
    });
    // Get all maintenance records
    app.route("/maintenance").get(async (req, res, next) => {
        try {
            await (0, maintenance_controller_1.getMaintenanceController)(req, res);
        }
        catch (error) {
            next(error);
        }
    });
    // Get maintenance by ID
    app.route("/maintenance/:id").get(async (req, res, next) => {
        try {
            await (0, maintenance_controller_1.getMaintenanceByIdController)(req, res);
        }
        catch (error) {
            next(error);
        }
    });
    // Update maintenance by ID
    app.route("/maintenance/:id").put(async (req, res, next) => {
        try {
            await (0, maintenance_controller_1.updateMaintenanceController)(req, res);
        }
        catch (error) {
            next(error);
        }
    });
    // Delete maintenance by ID
    app.route("/maintenance/:id").delete(async (req, res, next) => {
        try {
            await (0, maintenance_controller_1.deleteMaintenanceController)(req, res);
        }
        catch (error) {
            next(error);
        }
    });
};
exports.default = maintenance;
