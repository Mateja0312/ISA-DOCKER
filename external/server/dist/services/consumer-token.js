"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secretKey = 'my-32-character-ultra-secure-and-ultra-long-secret';
const generateToken = () => {
    const payload = {
        appId: "agentska-aplikacija",
    };
    console.log("GENERACIJA TOKENA");
    return jsonwebtoken_1.default.sign(payload, secretKey);
};
exports.generateToken = generateToken;
