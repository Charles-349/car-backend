"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getReservationByCarIdService = exports.deleteReservationService = exports.updateReservationService = exports.getReservationService = exports.getReservationByIdService = exports.createReservationService = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = __importDefault(require("../drizzle/db"));
const schema_1 = require("../drizzle/schema");
//create reservation service
const createReservationService = async (reservation) => {
    const [inserted] = await db_1.default.insert(schema_1.ReservationTable).values(reservation).returning();
    if (inserted) {
        return inserted;
    }
    return null;
};
exports.createReservationService = createReservationService;
// get a reservation by id
const getReservationByIdService = async (id) => {
    const reservation = await db_1.default.query.ReservationTable.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.ReservationTable.reservationID, id)
    });
    return reservation;
};
exports.getReservationByIdService = getReservationByIdService;
//get a reservation
const getReservationService = async () => {
    const reservations = await db_1.default.query.ReservationTable.findMany();
    return reservations;
};
exports.getReservationService = getReservationService;
//update reservation
const updateReservationService = async (id, reservation) => {
    const updatedReservation = await db_1.default.update(schema_1.ReservationTable)
        .set(reservation)
        .where((0, drizzle_orm_1.eq)(schema_1.ReservationTable.reservationID, id))
        .returning();
    if (updatedReservation.length === 0) {
        return null;
    }
    return updatedReservation[0];
};
exports.updateReservationService = updateReservationService;
//delete reservation
const deleteReservationService = async (id) => {
    const deletedReservation = await db_1.default.delete(schema_1.ReservationTable)
        .where((0, drizzle_orm_1.eq)(schema_1.ReservationTable.reservationID, id))
        .returning();
    if (deletedReservation.length === 0) {
        return null;
    }
    return "Reservation deleted successfully";
};
exports.deleteReservationService = deleteReservationService;
//get reservation by car id
const getReservationByCarIdService = async (carId) => {
    const reservations = await db_1.default.query.ReservationTable.findMany({
        where: (0, drizzle_orm_1.eq)(schema_1.ReservationTable.carID, carId)
    });
    return reservations;
};
exports.getReservationByCarIdService = getReservationByCarIdService;
