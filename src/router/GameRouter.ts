import { Router } from "express";
import { GameController } from "../controller/GameController";

const GameRouter = Router();

GameRouter.get("/games-list", GameController.getGames);

export default GameRouter;
