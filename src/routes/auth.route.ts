import { Router } from "express";
import {
  login,
  logOut,
  register,
} from "../controllers/auth.controller";


const authRoutes = Router();

authRoutes.post("/register", register);
authRoutes.post("/login", login);

authRoutes.post("/logout", logOut);

export default authRoutes;