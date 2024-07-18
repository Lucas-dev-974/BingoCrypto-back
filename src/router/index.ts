import { Router } from "express";
import authRouter from "./AuthRouter";
import GameRouter from "./GameRouter";

const mainRouter = Router();

mainRouter.use("/auth", authRouter);
mainRouter.use("/game", GameRouter);

export default mainRouter;
