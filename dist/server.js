"use strict";
// import app from "./index"
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// app.listen(8081, ()=>{
//     console.log("server running on http://localhost:8081");
// })
const index_1 = __importDefault(require("./index"));
const PORT = 8080;
index_1.default.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});
