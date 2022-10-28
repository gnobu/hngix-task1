"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const PORT = process.env.PORT || 5000;
const URL = process.env.URL || 'http://localhost:5000';
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.get('/', (req, res) => {
    res.send(`Head to "${URL}/api/task1" to get the task1 response`);
});
app.get('/api/task1', (req, res) => {
    const task1 = {
        slackUsername: 'gnobu',
        backend: true,
        age: 28,
        bio: "Nothing to see here. Just a MERN stack developer"
    };
    res.json(task1);
});
app.listen(PORT, () => { console.log(`App is running on ${URL}`); });
