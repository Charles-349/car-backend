"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const car_controller_1 = require("./car.controller");
const bearAuth_1 = require("../middleware/bearAuth");
const car = (app) => {
    app.route("/car").post(bearAuth_1.adminRoleAuth, async (req, res, next) => {
        try {
            await (0, car_controller_1.createCarController)(req, res);
        }
        catch (error) {
            next(error);
        }
    });
    //get car by id
    app.route("/car/:id").get(async (req, res, next) => {
        try {
            await (0, car_controller_1.getCarByIdController)(req, res);
        }
        catch (error) {
            next(error);
        }
    });
    //get all cars
    app.route("/car").get(bearAuth_1.adminRoleAuth, async (req, res, next) => {
        try {
            await (0, car_controller_1.getCarController)(req, res);
        }
        catch (error) {
            next(error);
        }
    });
    //update car by id
    app.route("/car/:id").put(async (req, res, next) => {
        try {
            await (0, car_controller_1.updateCarController)(req, res);
        }
        catch (error) {
            next(error);
        }
    });
    //delete car by id
    app.route("/car/:id").delete(async (req, res, next) => {
        try {
            await (0, car_controller_1.deleteCarController)(req, res);
        }
        catch (error) {
            next(error);
        }
    });
};
exports.default = car;
