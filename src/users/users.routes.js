import express from "express";
import controller from "./users.controller.js";
import { permissionCheck } from "../common/middleware.js";

const router = express.Router();

router.get("/users/:id", controller.getUser);
router.get("/users", controller.getUsers);
router.post("/users", controller.createUser);
router.delete("/users/:id", permissionCheck, controller.deleteUser);
router.put("/users/:id", permissionCheck, controller.updateUser);
router.get("/users/:id/access", controller.getAccessed);
router.put("/users/:id/permission", controller.updatePermission);

export default router;
