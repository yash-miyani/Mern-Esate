import express from "express";
import {
  signin,
  signup,
  google,
  signOut,
} from "../controllers/auth.controller.js";
const authRouter = express.Router();

authRouter.post("/signup", signup);
authRouter.post("/signin", signin);
authRouter.post("/google", google);
authRouter.get("/signout", signOut);

export default authRouter;
