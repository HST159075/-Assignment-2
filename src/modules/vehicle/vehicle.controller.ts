import { Request, Response } from "express";
import { VehicleService } from "./vehicle.service";

export const VehicleController = {
  getAll: async (req: Request, res: Response) => {
    try {
      const vehicles = await VehicleService.getAll();
      res.json({ success: true, data: vehicles });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  },

  getOne: async (req: Request, res: Response) => {
    try {
      const vehicle = await VehicleService.getById(Number(req.params.id));
      res.json({ success: true, data: vehicle });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  },

  create: async (req: Request, res: Response) => {
    try {
      const result = await VehicleService.create(req.body);
      res.status(201).json({
        success: true,
        message: "Vehicle created",
        data: result,
      });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  },

  update: async (req: Request, res: Response) => {
    try {
      const updated = await VehicleService.update(
        Number(req.params.id),
        req.body
      );
      res.json({ success: true, data: updated });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  },

  delete: async (req: Request, res: Response) => {
    try {
      await VehicleService.delete(Number(req.params.id));
      res.json({ success: true, message: "Vehicle deleted" });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  },
};
