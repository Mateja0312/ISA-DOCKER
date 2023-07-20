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
const consumer_token_1 = require("../services/consumer-token");
const app = (0, express_1.default)();
const PORT = 9091;
const cors = require('cors');
app.use(cors({ origin: 'http://localhost:9090' }));
// Api request interceptor
// axios.interceptors.request.use(function (config) {
//   // Do something before request is sent
//   console.log(config)
//   return config;
// }, function (error) {
//   // Do something with request error
//   return Promise.reject(error);
// });
app.get('/apitest', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = (0, consumer_token_1.generateToken)();
        console.log("SADRZAJ TOKENA: ", token);
        const response = yield axios_1.default.get('http://app:8081/apitest/data', {
            headers: {
                authorization: token,
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
