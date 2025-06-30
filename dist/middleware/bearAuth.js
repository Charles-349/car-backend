"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bothRoleAuth = exports.userRoleAuth = exports.adminRoleAuth = exports.checkRoles = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
//implementing a middware to check user roles
const checkRoles = (requiredRole) => {
    return (req, res, next) => {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }
        const token = authHeader.split(' ')[1];
        try {
            const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET_KEY);
            req.user = decoded;
            //check for roles
            if (typeof decoded === 'object' &&
                decoded !== null &&
                'role' in decoded) { //check if decoded is an object and has a role property
                if (requiredRole === "both") {
                    if (decoded.role === "admin" || decoded.role === "user") {
                        next();
                        return;
                    }
                }
                else if (decoded.role === requiredRole) {
                    next();
                    return;
                }
                res.status(401).json({ message: 'Unauthorized' });
            }
            else {
                res.status(401).json({ message: 'Invalid tiken payload' });
            }
        }
        catch (error) {
            res.status(401).json({ message: 'Invalid token' });
        }
    };
};
exports.checkRoles = checkRoles;
exports.adminRoleAuth = (0, exports.checkRoles)("admin");
exports.userRoleAuth = (0, exports.checkRoles)("user");
exports.bothRoleAuth = (0, exports.checkRoles)("both");
