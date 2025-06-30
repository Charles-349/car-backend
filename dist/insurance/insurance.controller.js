"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteInsuranceController = exports.updateInsuranceController = exports.getInsuranceController = exports.getInsuranceByIdController = exports.createInsuranceController = void 0;
const insurance_service_1 = require("./insurance.service");
//create insurance controller
const createInsuranceController = async (req, res) => {
    try {
        const insurance = req.body;
        const createdInsurance = await (0, insurance_service_1.createInsuranceService)(insurance);
        if (!createdInsurance) {
            return res.status(500).json({ error: "Failed to create insurance" });
        }
        return res.status(201).json({
            message: "Insurance created successfully",
            insurance: createdInsurance
        });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
exports.createInsuranceController = createInsuranceController;
// get insurance by id controller
const getInsuranceByIdController = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: "Invalid insurance ID" });
        }
        const insurance = await (0, insurance_service_1.getInsuranceByIdService)(id);
        if (!insurance) {
            return res.status(404).json({ message: "Insurance not found" });
        }
        return res.status(200).json({ message: "Insurance retrieved successfully", insurance });
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};
exports.getInsuranceByIdController = getInsuranceByIdController;
// get all insurances controller
const getInsuranceController = async (req, res) => {
    try {
        const insurances = await (0, insurance_service_1.getInsuranceService)();
        if (!insurances || insurances.length === 0) {
            return res.status(404).json({ message: "No insurances found" });
        }
        return res.status(200).json({ message: "Insurances retrieved successfully", insurances });
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};
exports.getInsuranceController = getInsuranceController;
// update insurance controller
const updateInsuranceController = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(404).json({ message: "Invalid insurance ID" });
        }
        const insurance = req.body;
        const existingInsurance = await (0, insurance_service_1.getInsuranceByIdService)(id);
        if (!existingInsurance) {
            return res.status(404).json({ message: "Insurance not found" });
        }
        const updatedInsurance = await (0, insurance_service_1.updateInsuranceService)(id, insurance);
        if (!updatedInsurance) {
            return res.status(404).json({ message: "Insurance not updated" });
        }
        return res.status(200).json({ message: "Insurance updated successfully", updatedInsurance });
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};
exports.updateInsuranceController = updateInsuranceController;
// delete insurance controller
const deleteInsuranceController = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(404).json({ message: "Invalid insurance ID" });
        }
        const existingInsurance = await (0, insurance_service_1.getInsuranceByIdService)(id);
        if (!existingInsurance) {
            return res.status(404).json({ message: "Insurance not found" });
        }
        const deletedInsurance = await (0, insurance_service_1.deleteInsuranceService)(id);
        if (!deletedInsurance) {
            return res.status(404).json({ message: "Insurance not deleted" });
        }
        return res.status(200).json({ message: "Insurance deleted successfully" });
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};
exports.deleteInsuranceController = deleteInsuranceController;
