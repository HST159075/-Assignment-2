import { Router } from "express";
import { signup, signin } from "./auth.controller";
import authRoutes from "./auth.route";




const router = Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/test", (req, res) => {
  res.send("Auth route is working");
});


export default router;
