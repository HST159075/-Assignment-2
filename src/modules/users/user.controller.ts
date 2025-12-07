import { Request, Response } from "express";
import { UserService } from "./user.service";

export const UserController = {
  getAll: async (req: Request, res: Response) => {
    try {
      const users = await UserService.getAllUsers();
      res.json({ success: true, message: "Users fetched", data: users });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  },

  getOne: async (req: Request, res: Response) => {
    try {
      const user = await UserService.getUserById(Number(req.params.id));
      res.json({ success: true, data: user });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  },

  update: async (req: Request, res: Response) => {
    try {
      const updated = await UserService.updateUser(
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
      await UserService.deleteUser(Number(req.params.id));
      res.json({ success: true, message: "User deleted" });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  },
};
