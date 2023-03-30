import express from "express";
import {
  getUsers,
  Register,
  getUserById,
  deleteUser,
  loginUser,
} from "../controller/UserControll.js";
import { verifyToken } from "./../middleware/verifyToken.js";

const router = express.Router();

router.get("/api/users", getUsers);
router.post("/api/users", Register);
router.get("/api/users/:id", verifyToken, getUserById);
router.delete("/api/users/:id", verifyToken, deleteUser);
router.post("/api/login", loginUser);

export default router;
