"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCustomersWithPaymentsAndBookingsServiceById = exports.getCustomerWithReservationsService = exports.deleteCustomerService = exports.updateCustomerService = exports.getCustomersWithPaymentsAndBookingsService = exports.getCustomerWithBookings = exports.getCustomerByIdService = exports.getCustomerService = exports.customerLoginService = exports.updateVerificationCodeService = exports.verifyCustomerService = exports.getCustomerByEmailService = exports.createCustomerService = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = __importDefault(require("../drizzle/db"));
const schema_1 = require("../drizzle/schema");
//create customer
const createCustomerService = async (customer) => {
    await db_1.default.insert(schema_1.CustomerTable).values(customer);
    return "Customer created successfully";
};
exports.createCustomerService = createCustomerService;
const getCustomerByEmailService = async (email) => {
    return await db_1.default.query.CustomerTable.findFirst({
        where: (0, drizzle_orm_1.sql) `${schema_1.CustomerTable.email} = ${email}`
    });
};
exports.getCustomerByEmailService = getCustomerByEmailService;
const verifyCustomerService = async (email) => {
    await db_1.default.update(schema_1.CustomerTable)
        .set({ isVerified: true, verificationCode: null })
        .where((0, drizzle_orm_1.sql) `${schema_1.CustomerTable.email} = ${email}`);
};
exports.verifyCustomerService = verifyCustomerService;
const updateVerificationCodeService = async (email, verificationCode, expirationTime) => {
    await db_1.default.update(schema_1.CustomerTable)
        .set({
        verificationCode,
        verificationCodeExpiresAt: expirationTime
    })
        .where((0, drizzle_orm_1.sql) `${schema_1.CustomerTable.email} = ${email}`);
};
exports.updateVerificationCodeService = updateVerificationCodeService;
//customer login service
const customerLoginService = async (customer) => {
    const { email } = customer;
    return await db_1.default.query.CustomerTable.findFirst({
        columns: {
            customerID: true,
            firstName: true,
            lastName: true,
            email: true,
            password: true,
            phoneNumber: true,
            address: true,
            role: true
        },
        where: (0, drizzle_orm_1.sql) `${schema_1.CustomerTable.email} = ${email}`
    });
};
exports.customerLoginService = customerLoginService;
//get customer
const getCustomerService = async () => {
    const customer = await db_1.default.query.CustomerTable.findMany();
    return customer;
};
exports.getCustomerService = getCustomerService;
//get customer by id
const getCustomerByIdService = async (id) => {
    const customer = await db_1.default.query.CustomerTable.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.CustomerTable.customerID, id)
    });
    return customer;
};
exports.getCustomerByIdService = getCustomerByIdService;
// customer with bookings
const getCustomerWithBookings = async (id) => {
    return await db_1.default.query.CustomerTable.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.CustomerTable.customerID, id),
        with: {
            bookings: {
                columns: {
                    carID: true,
                    rentalStartDate: true,
                    rentalEndDate: true,
                    totalAmount: true
                }
            }
        }
    });
};
exports.getCustomerWithBookings = getCustomerWithBookings;
const getCustomersWithPaymentsAndBookingsService = async () => {
    return await db_1.default.query.CustomerTable.findMany({
        with: {
            bookings: {
                columns: {
                    carID: true,
                    rentalStartDate: true,
                    rentalEndDate: true,
                    totalAmount: true
                },
                with: {
                    payments: true
                }
            }
        }
    });
};
exports.getCustomersWithPaymentsAndBookingsService = getCustomersWithPaymentsAndBookingsService;
//update customer
const updateCustomerService = async (id, customer) => {
    const updatedCustomer = await db_1.default.update(schema_1.CustomerTable)
        .set(customer)
        .where((0, drizzle_orm_1.eq)(schema_1.CustomerTable.customerID, id))
        .returning();
    if (updatedCustomer.length === 0) {
        return null;
    }
    return "Customer updated successfully";
};
exports.updateCustomerService = updateCustomerService;
//delete customer
const deleteCustomerService = async (id) => {
    const deletedCustomer = await db_1.default.delete(schema_1.CustomerTable)
        .where((0, drizzle_orm_1.eq)(schema_1.CustomerTable.customerID, id))
        .returning();
    if (deletedCustomer.length === 0) {
        return null;
    }
    return "Customer deleted successfully";
};
exports.deleteCustomerService = deleteCustomerService;
const getCustomerWithReservationsService = async (id) => {
    return await db_1.default.query.CustomerTable.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.CustomerTable.customerID, id),
        with: {
            reservations: {
                columns: {
                    reservationID: true,
                    customerID: true,
                    carID: true,
                    reservationDate: true,
                    pickupDate: true,
                    returnDate: true
                }
            }
        }
    });
};
exports.getCustomerWithReservationsService = getCustomerWithReservationsService;
const getCustomersWithPaymentsAndBookingsServiceById = async (id) => {
    return await db_1.default.query.CustomerTable.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.CustomerTable.customerID, id),
        with: {
            bookings: {
                columns: {
                    carID: true,
                    rentalStartDate: true,
                    rentalEndDate: true,
                    totalAmount: true
                },
                with: {
                    payments: true
                }
            }
        }
    });
};
exports.getCustomersWithPaymentsAndBookingsServiceById = getCustomersWithPaymentsAndBookingsServiceById;
