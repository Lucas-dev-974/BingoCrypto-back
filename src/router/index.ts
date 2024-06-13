import { Router } from "express";
import authRouter from "./AuthRouter";

const mainRouter = Router();

mainRouter.use("/auth", authRouter);

export default mainRouter;
