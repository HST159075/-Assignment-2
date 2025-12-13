import express, { Express } from "express";
import dotenv from "dotenv";
import authRoutes from "../src/modules/auth/auth.route";
import vehicleRoutes from "../src/modules/vehicle/vehicle.route";

dotenv.config();

const app: Express = express();

app.use(express.json());
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/vehicles", vehicleRoutes);




app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});


export default app;