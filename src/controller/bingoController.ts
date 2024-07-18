import { Request, Response } from "express";
import bingoUtils from "../utils/bingoUtils";

export class BingoController {
  static async generateNumber(req: Request, res: Response) {
    return res.status(200).json(bingoUtils.generateUniqueNumber(0, 100));
  }

  static async generateBingoCard(req: Request, res: Response) {
    return res.status(200).json(bingoUtils.generateBingoCard());
  }
}
