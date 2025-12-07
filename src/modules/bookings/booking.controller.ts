import { Request, Response } from "express";
import { BookingService } from "./booking.service";

export const BookingController = {
  create: async (req: Request, res: Response) => {
    try {
      const userId = (req as any).user.id;
      const result = await BookingService.createBooking(req.body, userId);
      res.status(201).json({
        success: true,
        message: "Booking created",
        data: result,
      });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  },

  getAll: async (req: Request, res: Response) => {
    try {
      const result = await BookingService.getAllBookings();
      res.json({ success: true, data: result });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  },

  cancel: async (req: Request, res: Response) => {
    try {
      const userId = (req as any).user.id;
      await BookingService.cancelBooking(Number(req.params.id), userId);
      res.json({ success: true, message: "Booking cancelled" });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  },

  return: async (req: Request, res: Response) => {
    try {
      await BookingService.returnBooking(Number(req.params.id));
      res.json({ success: true, message: "Vehicle returned" });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  },
};
