"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("./auth.controller");
const router = (0, express_1.Router)();
router.post("/signup", auth_controller_1.signup);
router.post("/signin", auth_controller_1.signin);
router.get("/test", (req, res) => {
    res.send("Auth route is working");
});
exports.default = router;
