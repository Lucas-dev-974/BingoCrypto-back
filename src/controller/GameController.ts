import { Request, Response } from "express";
import RoomManager from "../utils/RoomManager";
import { rooms } from "../router/WSRouter";
import { validate } from "validate.js";

export enum GamesEnum {
    kine = "KINE"
}

const games = [
    {
        name: GamesEnum.kine,
        background: "assets/images/jaqport/01.jpg",
        link: "/kine",
        price: 0
    }
]


export class GameController {
    public static getGames(req: Request, res: Response) {
        return res.status(200).json(games)
    }

    public static GamesList(req: Request, res: Response) {
        return res.status(200).json(games)
    }

    public static GameRooms(req: Request, res: Response) {
        const constraint = { gameName: { presence: true } }

        if (validate(req.query, constraint))
            return res.status(403).json(validate(req.query, constraint));

        return res.status(200).json(rooms.filter(room => room.name == req.body.gameName))
    }
}