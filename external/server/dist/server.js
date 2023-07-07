"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const app = (0, express_1.default)();
const PORT = 9091;
const cors = require('cors');
const secretKey = 'my-32-character-ultra-secure-and-ultra-long-secret';
app.use(cors({ origin: 'http://localhost:9090' }));
const generateToken = () => {
    const payload = {
        appId: 'agentska-aplikacija',
    };
    return jsonwebtoken_1.default.sign(payload, secretKey);
};
app.get('/apitest', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = generateToken();
        console.log("PRIKAZ TOKENA: ", token);
        const response = yield axios_1.default.get('http://localhost:8081/apitest/data', {
            headers: {
                Authorization: token,
            },
        });
        const data = response.data;
        console.log("PRIKAZ RESPONSA: ", response.data);
        res.json(data);
    }
    catch (error) {
        res.status(500).json({ error });
    }
}));
app.get('/data', (req, res) => {
    res.send('Sin od zmaja od bosne');
});
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
