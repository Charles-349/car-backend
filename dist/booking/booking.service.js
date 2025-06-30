"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBookingService = exports.updateBookingService = exports.getBookingByCustomerIdService = exports.getBookingByIdService = exports.getBookingsService = exports.createBookingService = void 0;
const db_1 = __importDefault(require("../drizzle/db"));
const drizzle_orm_1 = require("drizzle-orm");
const schema_1 = require("../drizzle/schema");
// Create booking service
const createBookingService = async (booking) => {
    const [inserted] = await db_1.default.insert(schema_1.BookingsTable).values(booking).returning();
    if (inserted) {
        return inserted;
    }
    return null;
};
exports.createBookingService = createBookingService;
// Get all bookings
const getBookingsService = async () => {
    const bookings = await db_1.default.query.BookingsTable.findMany();
    return bookings;
};
exports.getBookingsService = getBookingsService;
// Get booking by ID
const getBookingByIdService = async (id) => {
    const booking = await db_1.default.query.BookingsTable.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.BookingsTable.bookingID, id)
    });
    return booking;
};
exports.getBookingByIdService = getBookingByIdService;
//get bookings by customer ID
const getBookingByCustomerIdService = async (customerId) => {
    const bookings = await db_1.default.query.BookingsTable.findMany({
        where: (0, drizzle_orm_1.eq)(schema_1.BookingsTable.customerID, customerId)
    });
    return bookings;
};
exports.getBookingByCustomerIdService = getBookingByCustomerIdService;
// Update booking
const updateBookingService = async (id, booking) => {
    const updatedBooking = await db_1.default.update(schema_1.BookingsTable)
        .set(booking)
        .where((0, drizzle_orm_1.eq)(schema_1.BookingsTable.bookingID, id))
        .returning();
    if (updatedBooking.length === 0) {
        return null;
    }
    return "Booking updated successfully";
};
exports.updateBookingService = updateBookingService;
// Delete booking by ID
const deleteBookingService = async (id) => {
    const deletedBooking = await db_1.default.delete(schema_1.BookingsTable)
        .where((0, drizzle_orm_1.eq)(schema_1.BookingsTable.bookingID, id))
        .returning();
    if (deletedBooking.length === 0) {
        return null;
    }
    return "Booking deleted successfully";
};
exports.deleteBookingService = deleteBookingService;
