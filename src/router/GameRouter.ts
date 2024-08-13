import { Router } from "express";
import { BingoController } from "../controller/bingoController";
import RoomManager from "../utils/RoomManager";
import { GameController } from "../controller/GameController";

const GameRouter = Router();

GameRouter.get("/random-number", BingoController.generateNumber);
GameRouter.get("/generate-card", BingoController.generateBingoCard);
GameRouter.get("/games-list", GameController.GamesList)
GameRouter.get("/rooms", GameController.GameRooms)

export default GameRouter;
