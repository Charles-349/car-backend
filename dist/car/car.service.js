"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCarService = exports.updateCarService = exports.getCarService = exports.getCarByIdService = exports.createCarService = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = __importDefault(require("../drizzle/db"));
const schema_1 = require("../drizzle/schema");
//create car service
const createCarService = async (car) => {
    const [inserted] = await db_1.default.insert(schema_1.CarTable).values(car).returning();
    if (inserted) {
        return inserted;
    }
    return null;
};
exports.createCarService = createCarService;
// get a car by id
const getCarByIdService = async (id) => {
    const car = await db_1.default.query.CarTable.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.CarTable.carID, id)
    });
    return car;
};
exports.getCarByIdService = getCarByIdService;
//get a car
const getCarService = async () => {
    const cars = await db_1.default.query.CarTable.findMany();
    return cars;
};
exports.getCarService = getCarService;
//update car
const updateCarService = async (id, car) => {
    const updatedCar = await db_1.default.update(schema_1.CarTable)
        .set(car)
        .where((0, drizzle_orm_1.eq)(schema_1.CarTable.carID, id))
        .returning();
    if (updatedCar.length === 0) {
        return null;
    }
    return "Car updated successfully";
};
exports.updateCarService = updateCarService;
//delete car
const deleteCarService = async (id) => {
    const deletedCar = await db_1.default.delete(schema_1.CarTable)
        .where((0, drizzle_orm_1.eq)(schema_1.CarTable.carID, id))
        .returning();
    if (deletedCar.length === 0) {
        return null;
    }
    return "Car deleted successfully";
};
exports.deleteCarService = deleteCarService;
