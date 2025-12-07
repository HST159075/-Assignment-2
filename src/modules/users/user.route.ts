import { Router } from "express";
import { UserController } from "./user.controller";
import { auth } from "../../middlewares/auth";
import { adminOnly } from "../../middlewares/admin";

const router = Router();

router.get("/", auth, adminOnly, UserController.getAll);
router.get("/:id", auth, UserController.getOne);
router.put("/:id", auth, UserController.update);
router.delete("/:id", auth, adminOnly, UserController.delete);

export default router;
