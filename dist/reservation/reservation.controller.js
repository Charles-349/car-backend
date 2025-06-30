"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteReservationController = exports.updateReservationController = exports.getReservationByIdController = exports.getReservationController = exports.createReservationController = void 0;
const reservation_service_1 = require("./reservation.service");
// Create reservation controller
const createReservationController = async (req, res) => {
    const reservation = req.body;
    const createdReservation = await (0, reservation_service_1.createReservationService)(reservation);
    if (createdReservation) {
        return res.status(201).json(createdReservation);
    }
    return res.status(500).json({ message: "Failed to create reservation" });
};
exports.createReservationController = createReservationController;
// Get all reservations controller
const getReservationController = async (req, res) => {
    const reservations = await (0, reservation_service_1.getReservationService)();
    if (reservations && reservations.length > 0) {
        return res.status(200).json(reservations);
    }
    return res.status(404).json({ message: "No reservations found" });
};
exports.getReservationController = getReservationController;
// Get reservation by ID controller
const getReservationByIdController = async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid reservation ID" });
    }
    const reservation = await (0, reservation_service_1.getReservationByIdService)(id);
    if (reservation) {
        return res.status(200).json(reservation);
    }
    return res.status(404).json({ message: "Reservation not found" });
};
exports.getReservationByIdController = getReservationByIdController;
// Update reservation controller
const updateReservationController = async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid reservation ID" });
    }
    const reservation = req.body;
    const existingReservation = await (0, reservation_service_1.getReservationByIdService)(id);
    if (!existingReservation) {
        return res.status(404).json({ message: "Reservation not found" });
    }
    const updatedReservation = await (0, reservation_service_1.updateReservationService)(id, reservation);
    if (updatedReservation) {
        return res.status(200).json(updatedReservation);
    }
    return res.status(500).json({ message: "Failed to update reservation" });
};
exports.updateReservationController = updateReservationController;
// Delete reservation controller
// Delete reservation controller
const deleteReservationController = async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid reservation ID" });
    }
    const deletedReservation = await (0, reservation_service_1.deleteReservationService)(id);
    if (deletedReservation) {
        return res.status(200).json({ message: "Reservation deleted successfully" });
    }
    return res.status(404).json({ message: "Reservation not found or already deleted" });
};
exports.deleteReservationController = deleteReservationController;
