"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const auth_route_1 = __importDefault(require("../src/modules/auth/auth.route"));
const vehicle_route_1 = __importDefault(require("../src/modules/vehicle/vehicle.route"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.send("Server is running! Welcome to API.");
});
app.use("/api/v1/auth", auth_route_1.default);
app.use("/api/v1/vehicles", vehicle_route_1.default);
app.use((req, res) => {
    res.status(404).json({ success: false, message: "Route not found" });
});
exports.default = app;
