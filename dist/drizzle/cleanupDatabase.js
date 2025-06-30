"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cleanupDatabase = void 0;
const db_1 = __importDefault(require("./db"));
const schema_1 = require("./schema");
const cleanupDatabase = async () => {
    // Delete in order to respect FK constraints
    await db_1.default.delete(schema_1.PaymentTable);
    await db_1.default.delete(schema_1.BookingsTable);
    await db_1.default.delete(schema_1.ReservationTable);
    await db_1.default.delete(schema_1.MaintenanceTable);
    await db_1.default.delete(schema_1.InsuranceTable);
    await db_1.default.delete(schema_1.CarTable);
    await db_1.default.delete(schema_1.CustomerTable);
    await db_1.default.delete(schema_1.LocationTable);
};
exports.cleanupDatabase = cleanupDatabase;
