"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteInsuranceService = exports.updateInsuranceService = exports.getInsuranceService = exports.getInsuranceByIdService = exports.createInsuranceService = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = __importDefault(require("../drizzle/db"));
const schema_1 = require("../drizzle/schema");
//create insurance service
const createInsuranceService = async (insurance) => {
    const [inserted] = await db_1.default.insert(schema_1.InsuranceTable).values(insurance).returning();
    if (inserted) {
        return inserted;
    }
    return null;
};
exports.createInsuranceService = createInsuranceService;
// get a insurance  by id
const getInsuranceByIdService = async (id) => {
    const insurance = await db_1.default.query.InsuranceTable.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.InsuranceTable.insuranceID, id)
    });
    return insurance;
};
exports.getInsuranceByIdService = getInsuranceByIdService;
//get a insurance 
const getInsuranceService = async () => {
    const insurance = await db_1.default.query.InsuranceTable.findMany();
    return insurance;
};
exports.getInsuranceService = getInsuranceService;
//update insurance 
const updateInsuranceService = async (id, insurance) => {
    const updatedInsurance = await db_1.default.update(schema_1.InsuranceTable)
        .set(insurance)
        .where((0, drizzle_orm_1.eq)(schema_1.InsuranceTable.insuranceID, id))
        .returning();
    if (updatedInsurance.length === 0) {
        return null;
    }
    return "Insurance updated successfully";
};
exports.updateInsuranceService = updateInsuranceService;
//delete insurance 
const deleteInsuranceService = async (id) => {
    const deletedInsurance = await db_1.default.delete(schema_1.InsuranceTable)
        .where((0, drizzle_orm_1.eq)(schema_1.InsuranceTable.insuranceID, id))
        .returning();
    if (deletedInsurance.length === 0) {
        return null;
    }
    return "Insurance deleted successfully";
};
exports.deleteInsuranceService = deleteInsuranceService;
