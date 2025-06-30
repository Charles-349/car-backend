"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteLocationService = exports.updateLocationService = exports.getLocationByIdService = exports.getLocationsService = exports.createLocationService = void 0;
const db_1 = __importDefault(require("../drizzle/db"));
const drizzle_orm_1 = require("drizzle-orm");
const schema_1 = require("../drizzle/schema");
// Create location service
const createLocationService = async (location) => {
    await db_1.default.insert(schema_1.LocationTable).values(location);
    return "Location created successfully";
};
exports.createLocationService = createLocationService;
//get all locations
const getLocationsService = async () => {
    const locations = await db_1.default.query.LocationTable.findMany();
    return locations;
};
exports.getLocationsService = getLocationsService;
//get location by id
const getLocationByIdService = async (id) => {
    const location = await db_1.default.query.LocationTable.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.LocationTable.locationID, id)
    });
    return location;
};
exports.getLocationByIdService = getLocationByIdService;
//update location
const updateLocationService = async (id, location) => {
    const updatedLocation = await db_1.default.update(schema_1.LocationTable)
        .set(location)
        .where((0, drizzle_orm_1.eq)(schema_1.LocationTable.locationID, id))
        .returning();
    if (updatedLocation.length === 0) {
        return null;
    }
    return "Location updated successfully";
};
exports.updateLocationService = updateLocationService;
//delete location by id
const deleteLocationService = async (id) => {
    const deletedLocation = await db_1.default.delete(schema_1.LocationTable)
        .where((0, drizzle_orm_1.eq)(schema_1.LocationTable.locationID, id))
        .returning();
    if (deletedLocation.length === 0) {
        return null;
    }
    return "Location deleted successfully";
};
exports.deleteLocationService = deleteLocationService;
