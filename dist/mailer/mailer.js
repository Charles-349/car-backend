"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const sendEmail = async (email, subject, message, html) => {
    try {
        const transporter = nodemailer_1.default.createTransport({
            host: 'smtp.gmail.com', // Gmail SMTP server - smtp in full is simple mail transfer protocol
            port: 465, // SMTP port for Gmail -  is used to send emails
            service: 'gmail', // Gmail service
            secure: true, // Use SSL for secure connection  - ssl in full is secure socket layer
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD
            }
        });
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: subject,
            text: message,
            html: html
        };
        const mailRes = await transporter.sendMail(mailOptions); // Send the email using the transporter
        console.log('mailRes', mailRes);
        if (mailRes.accepted.length > 0) { // Check if the email was accepted
            return 'Email sent successfully';
        }
        else if (mailRes.rejected.length > 0) {
            return 'Email not sent';
        }
        else {
            return 'Email server error';
        }
    }
    catch (error) {
        return JSON.stringify(error.message, null, 500);
    }
};
exports.sendEmail = sendEmail;
