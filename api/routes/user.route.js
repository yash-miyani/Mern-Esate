import express from "express";
import {
  getUserListings,
  updateUser,
  getUser,
} from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyToken.js";
import { deleteUser } from "../controllers/auth.controller.js";

const router = express.Router();

router.put("/update/:id", verifyToken, updateUser);
router.delete("/delete/:id", verifyToken, deleteUser);
router.get("/listings/:id", verifyToken, getUserListings);
router.get("/:id", verifyToken, getUser);

export default router;
