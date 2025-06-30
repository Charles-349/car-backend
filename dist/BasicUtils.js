"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRandomNumber = exports.API = exports.UserNameToLowerCase = void 0;
exports.product = product;
exports.authenticateUser = authenticateUser;
function product(a, b) {
    return a * b;
}
// This function simulates an authentication process
function authenticateUser(username, password) {
    // simulate an authentication process
    const authStatus = username === "deveLOPER" && password === "dev";
    return {
        usernameToLower: username.toLowerCase(),
        usernameCharacters: username.split(''),
        userDetails: {},
        isAuthenticated: authStatus,
    };
}
class UserNameToLowerCase {
    toLowerCase(username) {
        if (username === "") {
            throw new Error("Username cannot be empty");
        }
        return username.toLowerCase();
    }
}
exports.UserNameToLowerCase = UserNameToLowerCase;
//Asynchronous tests
class API {
    fetchUsers() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve([
                    { id: 1, name: "Alice" },
                    { id: 2, name: "Bob" },
                    { id: 3, name: "Charlie" }
                ]);
            }, 1000);
        });
    }
}
exports.API = API;
const getRandomNumber = () => Math.floor(Math.random() * 10);
exports.getRandomNumber = getRandomNumber;
