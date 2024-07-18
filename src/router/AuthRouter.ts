import { Router } from "express";
import { AuthControlleur } from "../controller/authController";

const authRouter = Router();

authRouter.post("/login", AuthControlleur.login);
authRouter.patch("/register", AuthControlleur.register);
authRouter.get("/verify-email", AuthControlleur.verifyEmail);
authRouter.get("/token-check", AuthControlleur.checkToken);
authRouter.post("/request-reset", AuthControlleur.requestReset);
authRouter.post("/reset-password", AuthControlleur.resetPassword);

export default authRouter;
