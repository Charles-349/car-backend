"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteLocationController = exports.updateLocationController = exports.getLocationByIdController = exports.getLocationsController = exports.createLocationController = void 0;
const location_service_1 = require("./location.service");
// Create location controller
const createLocationController = async (req, res) => {
    try {
        const location = req.body;
        const createLocation = await (0, location_service_1.createLocationService)(location);
        if (!createLocation)
            return res.status(500).json({ error: "Failed to create location" });
        return res.status(201).json({
            message: "Location created successfully"
        });
    }
    catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};
exports.createLocationController = createLocationController;
// Get all locations controller
const getLocationsController = async (req, res) => {
    try {
        const locations = await (0, location_service_1.getLocationsService)();
        if (!locations || locations.length === 0) {
            return res.status(404).json({ message: "No locations found" });
        }
        return res.status(200).json({ message: "Locations retrieved successfully", locations });
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};
exports.getLocationsController = getLocationsController;
// Get location by ID controller
const getLocationByIdController = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: "Invalid location ID" });
        }
        const location = await (0, location_service_1.getLocationByIdService)(id);
        if (!location) {
            return res.status(404).json({ message: "Location not found" });
        }
        return res.status(200).json({ message: "Location retrieved successfully", location });
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};
exports.getLocationByIdController = getLocationByIdController;
// Update location controller
const updateLocationController = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(404).json({ message: "Invalid location ID" });
        }
        const location = req.body;
        const existingLocation = await (0, location_service_1.getLocationByIdService)(id);
        if (!existingLocation) {
            return res.status(404).json({ message: "Location not found" });
        }
        const updatedLocation = await (0, location_service_1.updateLocationService)(id, location);
        if (!updatedLocation) {
            return res.status(404).json({ message: "Location not updated" });
        }
        return res.status(200).json({ message: "Location updated successfully", updatedLocation });
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};
exports.updateLocationController = updateLocationController;
// Delete location controller
const deleteLocationController = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(404).json({ message: "Invalid location ID" });
        }
        const existingLocation = await (0, location_service_1.getLocationByIdService)(id);
        if (!existingLocation) {
            return res.status(404).json({ message: "Location not found" });
        }
        const deletedLocation = await (0, location_service_1.deleteLocationService)(id);
        if (!deletedLocation) {
            return res.status(404).json({ message: "Location not deleted" });
        }
        return res.status(200).json({ message: "Location deleted successfully" });
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};
exports.deleteLocationController = deleteLocationController;
