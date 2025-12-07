import { Router } from "express";
import { BookingController } from "./booking.controller";
import { auth } from "../../middlewares/auth";
import { adminOnly } from "../../middlewares/admin";

const router = Router();

router.post("/", auth, BookingController.create);
router.get("/", auth, adminOnly, BookingController.getAll);
router.put("/cancel/:id", auth, BookingController.cancel);
router.put("/return/:id", auth, adminOnly, BookingController.return);

export default router;
