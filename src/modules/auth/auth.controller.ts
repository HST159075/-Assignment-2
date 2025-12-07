import { Request, Response } from "express";
import * as AuthService from "./auth.service";

export const signup = async (req: Request, res: Response) => {
  const result = await AuthService.signup(req.body);

  res.status(201).json({
    success: true,
    message: "User registered successfully",
    data: result,
  });
};

export const signin = async (req: Request, res: Response) => {
  const result = await AuthService.signin(req.body);

  res.status(200).json({
    success: true,
    message: "User logged in successfully",
    data: result,
  });
};
