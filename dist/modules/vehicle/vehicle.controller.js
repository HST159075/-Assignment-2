"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VehicleController = void 0;
const vehicle_service_1 = require("./vehicle.service");
exports.VehicleController = {
    getAll: async (req, res) => {
        try {
            const vehicles = await vehicle_service_1.VehicleService.getAll();
            res.json({ success: true, data: vehicles });
        }
        catch (error) {
            res.status(400).json({ success: false, message: error.message });
        }
    },
    getOne: async (req, res) => {
        try {
            const vehicle = await vehicle_service_1.VehicleService.getById(Number(req.params.id));
            res.json({ success: true, data: vehicle });
        }
        catch (error) {
            res.status(400).json({ success: false, message: error.message });
        }
    },
    create: async (req, res) => {
        try {
            const result = await vehicle_service_1.VehicleService.create(req.body);
            res.status(201).json({
                success: true,
                message: "Vehicle created",
                data: result,
            });
        }
        catch (error) {
            res.status(400).json({ success: false, message: error.message });
        }
    },
    update: async (req, res) => {
        try {
            const updated = await vehicle_service_1.VehicleService.update(Number(req.params.id), req.body);
            res.json({ success: true, data: updated });
        }
        catch (error) {
            res.status(400).json({ success: false, message: error.message });
        }
    },
    delete: async (req, res) => {
        try {
            await vehicle_service_1.VehicleService.delete(Number(req.params.id));
            res.json({ success: true, message: "Vehicle deleted" });
        }
        catch (error) {
            res.status(400).json({ success: false, message: error.message });
        }
    },
};
