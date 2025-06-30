"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBookingController = exports.updateBookingController = exports.getBookingByCustomerIdController = exports.getBookingByIdController = exports.getBookingsController = exports.createBookingController = void 0;
const booking_service_1 = require("./booking.service");
// Create booking controller
const createBookingController = async (req, res) => {
    try {
        const booking = req.body;
        const createBooking = await (0, booking_service_1.createBookingService)(booking);
        if (!createBooking)
            return res.status(500).json({ message: "Failed to create booking" });
        return res.status(201).json({
            message: "Booking created successfully",
            booking: createBooking,
        });
    }
    catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};
exports.createBookingController = createBookingController;
// Get all bookings controller
const getBookingsController = async (req, res) => {
    try {
        const bookings = await (0, booking_service_1.getBookingsService)();
        if (!bookings || bookings.length === 0) {
            return res.status(404).json({ message: "No bookings found" });
        }
        return res.status(200).json({ message: "Bookings retrieved successfully", bookings });
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};
exports.getBookingsController = getBookingsController;
// Get booking by ID controller
const getBookingByIdController = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: "Invalid booking ID" });
        }
        const booking = await (0, booking_service_1.getBookingByIdService)(id);
        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }
        return res.status(200).json({ message: "Booking retrieved successfully", booking });
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};
exports.getBookingByIdController = getBookingByIdController;
// Get bookings by customer ID controller
const getBookingByCustomerIdController = async (req, res) => {
    try {
        const customerId = parseInt(req.params.customerId);
        if (isNaN(customerId)) {
            return res.status(400).json({ message: "Invalid customer ID" });
        }
        const bookings = await (0, booking_service_1.getBookingByCustomerIdService)(customerId);
        if (!bookings || bookings.length === 0) {
            return res.status(404).json({ message: "No bookings found for this customer" });
        }
        return res.status(200).json({ message: "Bookings retrieved successfully", bookings });
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};
exports.getBookingByCustomerIdController = getBookingByCustomerIdController;
// // Update booking controller
const updateBookingController = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(404).json({ message: "Invalid booking ID" });
        }
        const booking = req.body;
        const existingBooking = await (0, booking_service_1.getBookingByIdService)(id);
        if (!existingBooking) {
            return res.status(404).json({ message: "Booking not found" });
        }
        const updatedBooking = await (0, booking_service_1.updateBookingService)(id, booking);
        if (!updatedBooking) {
            return res.status(404).json({ message: "Booking not updated" });
        }
        return res.status(200).json({ message: "Booking updated successfully", booking });
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};
exports.updateBookingController = updateBookingController;
// // Delete booking controller
const deleteBookingController = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(404).json({ message: "Invalid booking ID" });
        }
        const deletedBooking = await (0, booking_service_1.deleteBookingService)(id);
        if (!deletedBooking) {
            return res.status(404).json({ message: "Booking not found or not deleted" });
        }
        return res.status(200).json({ message: "Booking deleted successfully" });
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};
exports.deleteBookingController = deleteBookingController;
