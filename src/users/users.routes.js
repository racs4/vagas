import express from "express";
import controller from "./users.controller.js";

const router = express.Router();

router.get("/users/:id", controller.getUser);
router.get("/users", controller.getUsers);

export default router;
