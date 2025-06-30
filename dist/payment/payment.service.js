"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePaymentService = exports.updatePaymentService = exports.getPaymentByIdService = exports.getPaymentsService = exports.createPaymentService = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = __importDefault(require("../drizzle/db"));
const schema_1 = require("../drizzle/schema");
// Create payment
const createPaymentService = async (payment) => {
    const [createdPayment] = await db_1.default.insert(schema_1.PaymentTable).values(payment).returning();
    return createdPayment;
};
exports.createPaymentService = createPaymentService;
// Get all payments
const getPaymentsService = async () => {
    return await db_1.default.query.PaymentTable.findMany();
};
exports.getPaymentsService = getPaymentsService;
// Get payment by ID
const getPaymentByIdService = async (id) => {
    return await db_1.default.query.PaymentTable.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.PaymentTable.paymentID, id),
    });
};
exports.getPaymentByIdService = getPaymentByIdService;
// Update payment
const updatePaymentService = async (id, payment) => {
    const updatedPayment = await db_1.default
        .update(schema_1.PaymentTable)
        .set(payment)
        .where((0, drizzle_orm_1.eq)(schema_1.PaymentTable.paymentID, id))
        .returning();
    if (updatedPayment.length === 0) {
        return null;
    }
    return updatedPayment[0];
};
exports.updatePaymentService = updatePaymentService;
// Delete payment by ID
const deletePaymentService = async (id) => {
    const deletedPayment = await db_1.default
        .delete(schema_1.PaymentTable)
        .where((0, drizzle_orm_1.eq)(schema_1.PaymentTable.paymentID, id))
        .returning();
    if (deletedPayment.length === 0) {
        return null;
    }
    return deletedPayment[0]; // Optional, depending on if you want to use it in the controller
};
exports.deletePaymentService = deletePaymentService;
