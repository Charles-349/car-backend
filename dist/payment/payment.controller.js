"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePaymentController = exports.updatePaymentController = exports.getPaymentByIdController = exports.getPaymentsController = exports.createPaymentController = void 0;
const payment_service_1 = require("./payment.service");
// Create Payment
const createPaymentController = async (req, res) => {
    try {
        const payment = req.body;
        const createPayment = await (0, payment_service_1.createPaymentService)(payment);
        if (!createPayment)
            return res.status(500).json({ message: "Payment not created" });
        return res.status(201).json({
            message: "Payment created successfully",
            payment: createPayment
        });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
exports.createPaymentController = createPaymentController;
// Get All Payments
const getPaymentsController = async (_req, res) => {
    try {
        const payments = await (0, payment_service_1.getPaymentsService)();
        if (!payments || payments.length === 0) {
            return res.status(404).json({ message: "No payments found" });
        }
        return res.status(200).json({ message: "Payments retrieved successfully", payments });
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};
exports.getPaymentsController = getPaymentsController;
// Get Payment by ID
const getPaymentByIdController = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: "Invalid payment ID" });
        }
        const payment = await (0, payment_service_1.getPaymentByIdService)(id);
        if (!payment) {
            return res.status(404).json({ message: "Payment not found" });
        }
        return res.status(200).json({ message: "Payment retrieved successfully", payment });
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};
exports.getPaymentByIdController = getPaymentByIdController;
// Update Payment
const updatePaymentController = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(404).json({ message: "Invalid payment ID" });
        }
        const payment = req.body;
        const existingPayment = await (0, payment_service_1.getPaymentByIdService)(id);
        if (!existingPayment) {
            return res.status(404).json({ message: "Payment not found" });
        }
        const updatedPayment = await (0, payment_service_1.updatePaymentService)(id, payment);
        if (!updatedPayment) {
            return res.status(404).json({ message: "Payment not updated" });
        }
        return res.status(200).json({ message: "Payment updated successfully", payment: updatedPayment });
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};
exports.updatePaymentController = updatePaymentController;
// Delete Payment
const deletePaymentController = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(404).json({ message: "Invalid payment ID" });
        }
        const existingPayment = await (0, payment_service_1.getPaymentByIdService)(id);
        if (!existingPayment) {
            return res.status(404).json({ message: "Payment not found" });
        }
        const deletedPayment = await (0, payment_service_1.deletePaymentService)(id);
        if (!deletedPayment) {
            return res.status(404).json({ message: "Payment not deleted" });
        }
        return res.sendStatus(204);
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};
exports.deletePaymentController = deletePaymentController;
