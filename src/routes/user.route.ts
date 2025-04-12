import { Router } from "express";
import { deleteUser, getCurrentUser, updateUser } from "../controllers/user.controller";

const userRoutes = Router();

userRoutes.get("/current", getCurrentUser);
userRoutes.patch("/update", updateUser);
userRoutes.delete("/delete", deleteUser);

export default userRoutes;