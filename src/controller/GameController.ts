import { Request, Response } from "express";
import GamesManager, { GamesEnum } from "../utils/RoomManager";
import { validate } from "validate.js";

// Todo [ 1 ]: create table GameList to store playable games
const games = [
  {
    name: GamesEnum.kine,
    background: "assets/images/jaqport/01.jpg",
    link: "/kine",
    price: 0,
  },
];

export class GameController {
  public static getGames(req: Request, res: Response) {
    return res.status(200).json(games); // Todo: 1
  }
}
