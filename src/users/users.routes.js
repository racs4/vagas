import express from "express";
import controller from "./users.controller.js";

const router = express.Router();

router.get("/users/:id", controller.getUser);
router.get("/users", controller.getUsers);
router.post("/users", controller.createUser);
router.delete("/users/:id", controller.deleteUser);
router.put("/users/:id", controller.updateUser);

export default router;
