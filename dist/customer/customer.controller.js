"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCustomersWithPaymentsAndBookingsControllerById = exports.getCustomerWithReservationsController = exports.deleteCustomerController = exports.updateCustomerController = exports.getCustomersWithPaymentsAndBookingsController = exports.getCustomerWithBookingsController = exports.getCustomerByIdController = exports.getCustomerController = exports.customerLoginController = exports.resendVerificationCodeController = exports.verifyCustomerController = exports.createCustomerController = void 0;
const customer_service_1 = require("./customer.service");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
const mailer_1 = require("../mailer/mailer");
//create customer controller
const createCustomerController = async (req, res) => {
    try {
        const customer = req.body;
        const password = customer.password;
        if (!password || password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters long" });
        }
        // Hash the password before saving
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        customer.password = hashedPassword;
        //generate a 6 digit verification code
        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
        const expirationTime = new Date(Date.now() + 3 * 60 * 1000); // 1 minute from now
        customer.verificationCode = verificationCode;
        customer.verificationCodeExpiresAt = expirationTime;
        customer.isVerified = false; // Set isVerified to false by default
        const createCustomer = await (0, customer_service_1.createCustomerService)(customer);
        if (!createCustomer)
            return res.json({ message: "customer not created" });
        try {
            await (0, mailer_1.sendEmail)(customer.email, "Verify your account", `Hello ${customer.firstName}, your verification code is: ${verificationCode}. Please use this code to verify your account`, `<div>
                        <h2>Hello ${customer.firstName},</h2>
                        <p>Your verification code is <strong>${verificationCode}</strong>.</p>
                        <p>Please use this code to verify your account.</p>
                        <p>Thank you!</p>
                    </div>`);
        }
        catch (emailError) {
            console.error("Failed to send verification email:", emailError);
        }
        return res.status(201).json({
            message: "Customer created successfully. Please check your email for the verification code.",
        });
    }
    catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};
exports.createCustomerController = createCustomerController;
const verifyCustomerController = async (req, res) => {
    const { email, code } = req.body;
    try {
        const customer = await (0, customer_service_1.getCustomerByEmailService)(email);
        if (!customer) {
            return res.status(404).json({ message: "Customer not found" });
        }
        // Insert expiration check 
        if (!customer.verificationCodeExpiresAt || new Date() > new Date(customer.verificationCodeExpiresAt)) {
            return res.status(400).json({ message: "Verification code has expired. Please request a new one." });
        }
        if (customer.verificationCode === code) {
            await (0, customer_service_1.verifyCustomerService)(email);
            // Send verification success email
            try {
                await (0, mailer_1.sendEmail)(customer.email, "Account Verified Successfully", `Hello ${customer.lastName}, your account has been verified. You can now log in and use all features.`, `<div>
                    <h2>Hello ${customer.lastName},</h2>
                    <p>Your account has been <strong>successfully verified</strong>!</p>
                     <p>You can now log in and enjoy our services.</p>
                     </div>`);
            }
            catch (error) {
                console.error("Failed to send verification success email:", error);
            }
            return res.status(200).json({ message: "User verified successfully" });
        }
        else {
            return res.status(400).json({ message: "Invalid verification code" });
        }
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
exports.verifyCustomerController = verifyCustomerController;
const resendVerificationCodeController = async (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ message: "Email is required" });
    }
    try {
        const customer = await (0, customer_service_1.getCustomerByEmailService)(email);
        if (!customer) {
            return res.status(404).json({ message: "Customer not found" });
        }
        if (customer.isVerified) {
            return res.status(400).json({ message: "Customer is already verified" });
        }
        // Generate new verification code
        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
        const expirationTime = new Date(Date.now() + 60 * 60 * 1000); // 1 hour from now
        // Update code and expiration
        await (0, customer_service_1.updateVerificationCodeService)(email, verificationCode, expirationTime);
        // Send new verification email
        await (0, mailer_1.sendEmail)(email, "New Verification Code", `Hello ${customer.firstName}, here is your new verification code: ${verificationCode}`, `<div>
                <h2>Hello ${customer.firstName},</h2>
                <p>Your new verification code is <strong>${verificationCode}</strong>.</p>
                <p>Please use this code to verify your account.</p>
            </div>`);
        return res.status(200).json({ message: "New verification code sent successfully" });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
exports.resendVerificationCodeController = resendVerificationCodeController;
//customer login controller
const customerLoginController = async (req, res) => {
    try {
        const customer = req.body;
        //check if user exists
        const customerExist = await (0, customer_service_1.customerLoginService)(customer);
        if (!customerExist) {
            return res.status(404).json({ message: "customer not found" });
        }
        //verify password
        const customerMatch = await bcrypt_1.default.compare(customer.password, customerExist.password);
        if (!customerMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        //create a payload for JWT
        const payload = {
            sub: customerExist.customerID,
            customerID: customerExist.customerID,
            firstName: customerExist.firstName,
            lastName: customerExist.lastName,
            email: customerExist.email,
            phoneNumber: customerExist.phoneNumber,
            address: customerExist.address,
            role: customerExist.role,
            // exp : Math.floor(Date.now() / 1000) + 60  // 1 minute expiration
        };
        //generate JWT token
        const secret = process.env.JWT_SECRET_KEY;
        if (!secret) {
            throw new Error("JWT secret is not defined in the environment variables");
        }
        // const token = jwt.sign(payload, secret);
        const token = jsonwebtoken_1.default.sign(payload, secret, { expiresIn: '3600s' });
        return res.status(200).json({
            message: "Login successful",
            token,
            customer: {
                customerID: customerExist.customerID,
                firstName: customerExist.firstName,
                lastName: customerExist.lastName,
                email: customerExist.email,
                phoneNumber: customerExist.phoneNumber,
                address: customerExist.address,
                role: customerExist.role
            }
        });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
exports.customerLoginController = customerLoginController;
const getCustomerController = async (req, res) => {
    try {
        const customers = await (0, customer_service_1.getCustomerService)();
        if (!customers || customers.length === 0) {
            return res.status(404).json({ message: "No customers found" });
        }
        return res.status(200).json({ message: "Customers retrieved successfully", customers });
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};
exports.getCustomerController = getCustomerController;
//get customer by id controller
const getCustomerByIdController = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: "Invalid customer ID" });
        }
        const customer = await (0, customer_service_1.getCustomerByIdService)(id);
        if (!customer) {
            return res.status(404).json({ message: "Customer not found" });
        }
        return res.status(200).json({ message: "Customer retrieved successfully", customer });
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};
exports.getCustomerByIdController = getCustomerByIdController;
//get customer with bookings controller
const getCustomerWithBookingsController = async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid customer ID' });
    }
    try {
        const customer = await (0, customer_service_1.getCustomerWithBookings)(id);
        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' });
        }
        return res.status(200).json(customer);
    }
    catch (error) {
        console.error('Error fetching customer with bookings:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
exports.getCustomerWithBookingsController = getCustomerWithBookingsController;
//bookings and payments
const getCustomersWithPaymentsAndBookingsController = async (req, res) => {
    try {
        const customers = await (0, customer_service_1.getCustomersWithPaymentsAndBookingsService)();
        if (!customers || customers.length === 0) {
            return res.status(404).json({ message: "No customers with bookings and payments found" });
        }
        return res.status(200).json({ message: "Customers with bookings and payments retrieved successfully", customers });
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};
exports.getCustomersWithPaymentsAndBookingsController = getCustomersWithPaymentsAndBookingsController;
//update customer controller
const updateCustomerController = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(404).json({ message: "Invalid customer ID" });
        }
        const customer = req.body;
        const existingCustomer = await (0, customer_service_1.getCustomerByIdService)(id);
        if (!existingCustomer) {
            return res.status(404).json({ message: "Customer not found" });
        }
        const updatedCustomer = await (0, customer_service_1.updateCustomerService)(id, customer);
        if (!updatedCustomer) {
            return res.status(404).json({ message: "Customer not updated" });
        }
        return res.status(200).json({ message: "Customer updated successfully" });
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};
exports.updateCustomerController = updateCustomerController;
//delete customer controller
const deleteCustomerController = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(404).json({ message: "Invalid customer ID" });
        }
        const existingCustomer = await (0, customer_service_1.getCustomerByIdService)(id);
        if (!existingCustomer) {
            return res.status(404).json({ message: "Customer not found" });
        }
        const deletedCustomer = await (0, customer_service_1.deleteCustomerService)(id);
        if (!deletedCustomer) {
            return res.status(404).json({ message: "Customer not deleted" });
        }
        return res.status(200).json({ message: "Customer deleted successfully" });
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};
exports.deleteCustomerController = deleteCustomerController;
const getCustomerWithReservationsController = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: "Invalid customer ID" });
        }
        const customer = await (0, customer_service_1.getCustomerWithReservationsService)(id);
        if (!customer) {
            return res.status(404).json({ message: "Customer not found" });
        }
        return res.status(200).json({ message: "Customer with reservations retrieved successfully", customer });
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};
exports.getCustomerWithReservationsController = getCustomerWithReservationsController;
const getCustomersWithPaymentsAndBookingsControllerById = async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid customer ID' });
    }
    try {
        const customer = await (0, customer_service_1.getCustomersWithPaymentsAndBookingsServiceById)(id);
        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' });
        }
        return res.status(200).json(customer);
    }
    catch (error) {
        console.error('Error fetching customer with bookings:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
exports.getCustomersWithPaymentsAndBookingsControllerById = getCustomersWithPaymentsAndBookingsControllerById;
