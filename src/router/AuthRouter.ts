import { Router } from "express";
import { AuthControlleur } from "../controller/authController";

const authRouter = Router();

authRouter.post("/login", AuthControlleur.login);
authRouter.patch("/register", AuthControlleur.register);

export default authRouter;
