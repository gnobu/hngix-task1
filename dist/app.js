"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const PORT = 5000;
const URL = 'http://localhost:5000';
const app = (0, express_1.default)();
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
