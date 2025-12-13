"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const config_1 = require("../../config");
exports.UserService = {
    getAllUsers: async () => {
        const result = await config_1.pool.query("SELECT id, name, email, phone, role FROM users");
        return result.rows;
    },
    getUserById: async (id) => {
        const result = await config_1.pool.query("SELECT id, name, email, phone, role FROM users WHERE id = $1", [id]);
        return result.rows[0];
    },
    updateUser: async (id, payload) => {
        const { name, phone } = payload;
        const result = await config_1.pool.query("UPDATE users SET name=$1, phone=$2 WHERE id=$3 RETURNING id, name, email, phone, role", [name, phone, id]);
        return result.rows[0];
    },
    deleteUser: async (id) => {
        const booking = await config_1.pool.query("SELECT * FROM bookings WHERE customer_id=$1 AND status='active'", [id]);
        if (booking.rows.length > 0) {
            throw new Error("User cannot be deleted until active booking completed.");
        }
        await config_1.pool.query("DELETE FROM users WHERE id=$1", [id]);
        return true;
    },
};
