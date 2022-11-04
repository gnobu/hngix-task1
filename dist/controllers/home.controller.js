"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
class Home {
    constructor(URL) {
        this.path = '/';
        this.router = express_1.default.Router();
        this.initializeRoutes = () => {
            this.router.get(this.path, this.getHome);
        };
        this.getHome = (req, res) => {
            res.send(`Head to "${this.URL}/zuri/task1" to get the task1 response`);
        };
        this.URL = URL;
        this.initializeRoutes();
    }
}
exports.default = Home;
