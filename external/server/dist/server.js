"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const PORT = 9091;
const cors = require('cors');
app.use(cors({ origin: 'http://localhost:9090' }));
app.get('/api/hello', (req, res) => {
    res.send('Hello, world!');
});
app.get('/data', (req, res) => {
    res.send('Sin od zmaja od bosne');
});
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
