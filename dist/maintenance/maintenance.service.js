"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMaintenanceService = exports.updateMaintenanceService = exports.getMaintenanceService = exports.getMaintenanceByIdService = exports.createMaintenanceService = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = __importDefault(require("../drizzle/db"));
const schema_1 = require("../drizzle/schema");
//create maintenance service
const createMaintenanceService = async (maintenance) => {
    const [inserted] = await db_1.default.insert(schema_1.MaintenanceTable).values(maintenance).returning();
    if (inserted) {
        return inserted;
    }
    return null;
};
exports.createMaintenanceService = createMaintenanceService;
// get a maintenance by id
const getMaintenanceByIdService = async (id) => {
    const maintenance = await db_1.default.query.MaintenanceTable.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.MaintenanceTable.maintenanceID, id)
    });
    return maintenance;
};
exports.getMaintenanceByIdService = getMaintenanceByIdService;
//get a maintenance
const getMaintenanceService = async () => {
    const maintenance = await db_1.default.query.MaintenanceTable.findMany();
    return maintenance;
};
exports.getMaintenanceService = getMaintenanceService;
//update maintenance
const updateMaintenanceService = async (id, maintenance) => {
    const updatedMaintenance = await db_1.default.update(schema_1.MaintenanceTable)
        .set(maintenance)
        .where((0, drizzle_orm_1.eq)(schema_1.MaintenanceTable.maintenanceID, id))
        .returning();
    if (updatedMaintenance.length === 0) {
        return null;
    }
    return "Maintenance updated successfully";
};
exports.updateMaintenanceService = updateMaintenanceService;
//delete maintenance
const deleteMaintenanceService = async (id) => {
    const deletedMaintenance = await db_1.default.delete(schema_1.MaintenanceTable)
        .where((0, drizzle_orm_1.eq)(schema_1.MaintenanceTable.maintenanceID, id))
        .returning();
    if (deletedMaintenance.length === 0) {
        return null;
    }
    return "Maintenance deleted successfully";
};
exports.deleteMaintenanceService = deleteMaintenanceService;
