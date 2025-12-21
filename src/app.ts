import express, { Express } from "express";
import dotenv from "dotenv";
import authRoutes from "../src/modules/auth/auth.route";
import vehicleRoutes from "../src/modules/vehicle/vehicle.route";
import bookingRoutes from "../src/modules/bookings/booking.route"
import usersRoutes from "../src/modules/users/user.route"

dotenv.config();

const app: Express = express();

app.use(express.json());


app.get("/", (req, res) => {
  res.send("Vehical Rantel Server is running! >>> Welcome to MY API.");
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/vehicles", vehicleRoutes);
app.use("/api/v1/bookings", bookingRoutes);
app.use("/api/v1/users", usersRoutes)


app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});


export default app;
