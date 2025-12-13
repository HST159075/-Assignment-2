"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingController = void 0;
const booking_service_1 = require("./booking.service");
exports.BookingController = {
    create: async (req, res) => {
        try {
            const userId = req.user.id;
            const result = await booking_service_1.BookingService.createBooking(req.body, userId);
            res.status(201).json({
                success: true,
                message: "Booking created",
                data: result,
            });
        }
        catch (error) {
            res.status(400).json({ success: false, message: error.message });
        }
    },
    getAll: async (req, res) => {
        try {
            const result = await booking_service_1.BookingService.getAllBookings();
            res.json({ success: true, data: result });
        }
        catch (error) {
            res.status(400).json({ success: false, message: error.message });
        }
    },
    cancel: async (req, res) => {
        try {
            const userId = req.user.id;
            await booking_service_1.BookingService.cancelBooking(Number(req.params.id), userId);
            res.json({ success: true, message: "Booking cancelled" });
        }
        catch (error) {
            res.status(400).json({ success: false, message: error.message });
        }
    },
    return: async (req, res) => {
        try {
            await booking_service_1.BookingService.returnBooking(Number(req.params.id));
            res.json({ success: true, message: "Vehicle returned" });
        }
        catch (error) {
            res.status(400).json({ success: false, message: error.message });
        }
    },
};
