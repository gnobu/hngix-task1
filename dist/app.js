"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
class App {
    constructor(controllers, PORT = 5000, URL = 'http://localhost:5000') {
        this.app = (0, express_1.default)();
        this.PORT = PORT;
        this.URL = URL;
        this.initializeMiddleware();
        this.initializeControllers(controllers);
    }
    listen() {
        this.app.listen(this.PORT, () => { console.log(`App is running on ${this.URL}`); });
    }
    initializeMiddleware() {
        this.app.use((0, cors_1.default)());
    }
    initializeControllers(controllers) {
        controllers.forEach(controller => {
            this.app.use('/', controller.router);
        });
    }
}
exports.default = App;
