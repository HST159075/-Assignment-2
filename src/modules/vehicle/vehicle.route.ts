import { Router } from "express";
import { VehicleController } from "./vehicle.controller";
import { auth } from "../../middlewares/auth";
import { adminOnly } from "../../middlewares/admin";

const router = Router();

router.get("/", VehicleController.getAll);
router.get("/:id", VehicleController.getOne);


router.post("/", auth, adminOnly, VehicleController.create);
router.put("/:id", auth, adminOnly, VehicleController.update);
router.delete("/:id", auth, adminOnly, VehicleController.delete);

export default router;
