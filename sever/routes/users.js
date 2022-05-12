import express from "express";

import { getUsers, createUser, getUser, deleteUser, updataeUser } from "../controllers/users.js";

const router = express.Router();

router.get("/users", getUsers);
router.post("/user", createUser);
router.get("/user/:id", getUser);
router.delete("/user/:id", deleteUser);
router.put("/user/:id", updataeUser);

export default router;