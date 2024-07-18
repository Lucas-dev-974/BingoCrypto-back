import { Router } from "express";
import { BingoController } from "../controller/bingoController";

const GameRouter = Router();

GameRouter.get("/random-number", BingoController.generateNumber);
GameRouter.get("/generate-card", BingoController.generateBingoCard);

export default GameRouter;
