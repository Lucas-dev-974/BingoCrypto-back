import { Request, Response, NextFunction } from "express";
import { publicRoutes } from "./publicRoutes";
import jwt from "jsonwebtoken";
import User from "../models/user";

class AuthMiddleware {
  public authenticateToken(req: Request, res: Response, next: NextFunction) {
    if (publicRoutes.includes(req.path)) {
      return next();
    }

    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (token == null) {
      return res.sendStatus(401);
    }

    jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET as string,
      (err, user) => {
        if (err) {
          return res.sendStatus(403);
        }
        (req as any).user = user;
        next();
      }
    );
  }

  public generateToken(user: User): string {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET as string, {
      expiresIn: "1h",
    });
  }
}

export default new AuthMiddleware();
