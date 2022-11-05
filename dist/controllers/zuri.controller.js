"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function (o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function () { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function (o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));

var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function (o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function (o, v) {
    o["default"] = v;
});

var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};

Object.defineProperty(exports, "__esModule", { value: true });
const express = __importStar(require("express"));
const controller_interface_1 = require("../interfaces/controller.interface");

class Zuri {
    constructor() {
        this.path = '/zuri';
        this.router = express.Router();
        this.task1 = (req, res) => {
            const task1 = {
                slackUsername: 'gnobu',
                backend: true,
                age: 28,
                bio: "Nothing to see here. Just a MERN stack developer"
            };
            res.json(task1);
        };
        this.task2 = (req, res) => {
            const quest = req.body;
            let result;
            switch (quest.operation_type.toLowerCase()) {
                case controller_interface_1.OPERATION.addition:
                    result = +quest.x + +quest.y;
                    return res.json({ "slackUsername": "gnobu", result, "operation_type": controller_interface_1.OPERATION.addition });
                case controller_interface_1.OPERATION.subtraction:
                    result = +quest.x - +quest.y;
                    return res.json({ "slackUsername": "gnobu", result, "operation_type": controller_interface_1.OPERATION.subtraction });
                case controller_interface_1.OPERATION.multiplication:
                    result = +quest.x * +quest.y;
                    return res.json({ "slackUsername": "gnobu", result, "operation_type": controller_interface_1.OPERATION.multiplication });
                case controller_interface_1.OPERATION.division:
                    result = parseFloat((+quest.x / +quest.y).toFixed(2));
                    return res.json({ "slackUsername": "gnobu", result, "operation_type": controller_interface_1.OPERATION.division });
                default:
                    res.json({ "slackUsername": "gnobu", "result": null, "operation_type": quest.operation_type });
            }
        };
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get(`${this.path}/task1`, this.task1);
        this.router.post(`${this.path}/task2`, this.task2);
    }
}
exports.default = Zuri;
