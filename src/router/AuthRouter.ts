import { Router } from "express";
import { AuthControlleur } from "../controller/authController";

const authRouter = Router();

authRouter.post("/login", AuthControlleur.login);
authRouter.post("/register", AuthControlleur.register);

export default authRouter;
