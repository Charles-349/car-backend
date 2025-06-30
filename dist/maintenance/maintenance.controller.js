"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMaintenanceController = exports.updateMaintenanceController = exports.getMaintenanceByIdController = exports.getMaintenanceController = exports.createMaintenanceController = void 0;
const maintenance_service_1 = require("./maintenance.service");
// Create maintenance controller
const createMaintenanceController = async (req, res) => {
    try {
        const maintenance = req.body;
        const createdMaintenance = await (0, maintenance_service_1.createMaintenanceService)(maintenance);
        if (!createdMaintenance)
            return res.status(500).json({ error: "Failed to create maintenance" });
        return res.status(201).json({
            message: "Maintenance created successfully",
            maintenance: createdMaintenance
        });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
exports.createMaintenanceController = createMaintenanceController;
// Get all maintenance records controller
const getMaintenanceController = async (req, res) => {
    try {
        const maintenances = await (0, maintenance_service_1.getMaintenanceService)();
        if (!maintenances || maintenances.length === 0) {
            return res.status(404).json({ message: "No maintenance records found" });
        }
        return res.status(200).json({ message: "Maintenance records retrieved successfully", maintenances });
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};
exports.getMaintenanceController = getMaintenanceController;
// Get maintenance by ID controller
const getMaintenanceByIdController = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: "Invalid maintenance ID" });
        }
        const maintenance = await (0, maintenance_service_1.getMaintenanceByIdService)(id);
        if (!maintenance) {
            return res.status(404).json({ message: "Maintenance record not found" });
        }
        return res.status(200).json({ message: "Maintenance record retrieved successfully", maintenance });
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};
exports.getMaintenanceByIdController = getMaintenanceByIdController;
// Update maintenance controller
const updateMaintenanceController = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(404).json({ message: "Invalid maintenance ID" });
        }
        const maintenance = req.body;
        const existingMaintenance = await (0, maintenance_service_1.getMaintenanceByIdService)(id);
        if (!existingMaintenance) {
            return res.status(404).json({ message: "Maintenance record not found" });
        }
        const updatedMaintenance = await (0, maintenance_service_1.updateMaintenanceService)(id, maintenance);
        if (!updatedMaintenance) {
            return res.status(404).json({ message: "Maintenance record not updated" });
        }
        return res.status(200).json({ message: updatedMaintenance });
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};
exports.updateMaintenanceController = updateMaintenanceController;
// Delete maintenance controller
const deleteMaintenanceController = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(404).json({ message: "Invalid maintenance ID" });
        }
        const existingMaintenance = await (0, maintenance_service_1.getMaintenanceByIdService)(id);
        if (!existingMaintenance) {
            return res.status(404).json({ message: "Maintenance record not found" });
        }
        const deletedMaintenance = await (0, maintenance_service_1.deleteMaintenanceService)(id);
        if (!deletedMaintenance) {
            return res.status(404).json({ message: "Maintenance record not deleted" });
        }
        return res.status(200).json({ message: "Maintenance record deleted successfully" });
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};
exports.deleteMaintenanceController = deleteMaintenanceController;
