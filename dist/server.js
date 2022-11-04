"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const app_1 = __importDefault(require("./app"));
const home_controller_1 = __importDefault(require("./controllers/home.controller"));
const zuri_controller_1 = __importDefault(require("./controllers/zuri.controller"));
// Variable declarations
const URL = process.env.URL || 'http://localhost:5000';
const PORT = process.env.PORT || 5000;
const app = new app_1.default([
    new zuri_controller_1.default(),
    new home_controller_1.default(URL),
], PORT, URL);
app.listen();
