"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const insurance_controller_1 = require("./insurance.controller");
// Create insurance router
const insurance = (app) => {
    app.route("/insurance").post(async (req, res, next) => {
        try {
            await (0, insurance_controller_1.createInsuranceController)(req, res);
        }
        catch (error) {
            next(error);
        }
    });
    // Get all insurances
    app.route("/insurance").get(async (req, res, next) => {
        try {
            await (0, insurance_controller_1.getInsuranceController)(req, res);
        }
        catch (error) {
            next(error);
        }
    });
    // Get insurance by ID
    app.route("/insurance/:id").get(async (req, res, next) => {
        try {
            await (0, insurance_controller_1.getInsuranceByIdController)(req, res);
        }
        catch (error) {
            next(error);
        }
    });
    // Update insurance by ID
    app.route("/insurance/:id").put(async (req, res, next) => {
        try {
            await (0, insurance_controller_1.updateInsuranceController)(req, res);
        }
        catch (error) {
            next(error);
        }
    });
    // Delete insurance by ID
    app.route("/insurance/:id").delete(async (req, res, next) => {
        try {
            await (0, insurance_controller_1.deleteInsuranceController)(req, res);
        }
        catch (error) {
            next(error);
        }
    });
};
exports.default = insurance;
