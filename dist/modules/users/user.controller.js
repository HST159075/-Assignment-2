"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_service_1 = require("./user.service");
exports.UserController = {
    getAll: async (req, res) => {
        try {
            const users = await user_service_1.UserService.getAllUsers();
            res.json({ success: true, message: "Users fetched", data: users });
        }
        catch (error) {
            res.status(400).json({ success: false, message: error.message });
        }
    },
    getOne: async (req, res) => {
        try {
            const user = await user_service_1.UserService.getUserById(Number(req.params.id));
            res.json({ success: true, data: user });
        }
        catch (error) {
            res.status(400).json({ success: false, message: error.message });
        }
    },
    update: async (req, res) => {
        try {
            const updated = await user_service_1.UserService.updateUser(Number(req.params.id), req.body);
            res.json({ success: true, data: updated });
        }
        catch (error) {
            res.status(400).json({ success: false, message: error.message });
        }
    },
    delete: async (req, res) => {
        try {
            await user_service_1.UserService.deleteUser(Number(req.params.id));
            res.json({ success: true, message: "User deleted" });
        }
        catch (error) {
            res.status(400).json({ success: false, message: error.message });
        }
    },
};
