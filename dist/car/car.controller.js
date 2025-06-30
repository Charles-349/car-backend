"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCarController = exports.updateCarController = exports.getCarController = exports.getCarByIdController = exports.createCarController = void 0;
const car_service_1 = require("./car.service");
const createCarController = async (req, res) => {
    try {
        const car = req.body;
        const createCar = await (0, car_service_1.createCarService)(car);
        if (!createCar)
            return res.json({ message: "car not created" });
        return res.status(201).json({
            message: "Car created successfully"
        });
    }
    catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};
exports.createCarController = createCarController;
// get car by id controller
const getCarByIdController = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: "Invalid car ID" });
        }
        const car = await (0, car_service_1.getCarByIdService)(id);
        if (!car) {
            return res.status(404).json({ message: "Car not found" });
        }
        return res.status(200).json({ message: "Car retrieved successfully", car });
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};
exports.getCarByIdController = getCarByIdController;
// get all cars controller
const getCarController = async (req, res) => {
    try {
        const cars = await (0, car_service_1.getCarService)();
        if (!cars || cars.length === 0) {
            return res.status(404).json({ message: "No cars found" });
        }
        return res.status(200).json({ message: "Cars retrieved successfully", cars });
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};
exports.getCarController = getCarController;
// update car controller
const updateCarController = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(404).json({ message: "Invalid car ID" });
        }
        const car = req.body;
        const existingCar = await (0, car_service_1.getCarByIdService)(id);
        if (!existingCar) {
            return res.status(404).json({ message: "Car not found" });
        }
        const updatedCar = await (0, car_service_1.updateCarService)(id, car);
        if (!updatedCar) {
            return res.status(404).json({ message: "Car not updated" });
        }
        return res.status(200).json({ message: "Car updated successfully" });
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};
exports.updateCarController = updateCarController;
// delete car controller
const deleteCarController = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(404).json({ message: "Invalid car ID" });
        }
        const deletedCar = await (0, car_service_1.deleteCarService)(id);
        if (!deletedCar) {
            return res.status(404).json({ message: "Car not deleted" });
        }
        return res.status(200).json({ message: "Car deleted successfully" });
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};
exports.deleteCarController = deleteCarController;
