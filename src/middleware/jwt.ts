import { Request, Response, NextFunction } from "express";
import { publicRoutes } from "./publicRoutes";
import jwt from "jsonwebtoken";
import { UserInterface } from "../interface/models";
import bcrypt from "bcrypt";

class AuthMiddleware {
  static saltRounds = 10;
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

  public generateToken(user: UserInterface): string {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET as string, {
      expiresIn: "1h",
    });
  }

  public async hashPasswordasync(password: string): Promise<string> {
    try {
      const hashedPassword = await bcrypt.hash(
        password,
        AuthMiddleware.saltRounds
      );
      return hashedPassword;
    } catch (error) {
      throw new Error("Error hashing password");
    }
  }

  public async comparePassword(
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    try {
      const match = await bcrypt.compare(password, hashedPassword);
      return match;
    } catch (error) {
      return false;
    }
  }
}

export default new AuthMiddleware();
