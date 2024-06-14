import { Request, Response } from "express";
import User from "../models/user";
import validate from "validate.js";
import AuthMiddleware from "../middleware/jwt";
import { UniqueConstraintError } from "sequelize";
import { UserInterface } from "../interface/models";

export class AuthControlleur {
  static async login(req: Request, res: Response) {
    const constraint = {
      email: { presence: true, email: true },
      password: { presence: true },
    };

    if (validate(req.body, constraint))
      return res.status(403).json(validate(req.body, constraint));

    const user: UserInterface | undefined = (
      await User.findOne({
        where: { email: req.body.email },
      })
    )?.dataValues;

    if (
      !user ||
      !(await AuthMiddleware.comparePassword(req.body.password, user.password))
    ) {
      return res.status(401).json("Les identifiants ne sont pas compatible.");
    }

    const userToReturn: Omit<
      UserInterface,
      "password" | "createdAt" | "updatedAt"
    > = {
      name: user.name,
      email: user.email,
      id: user.id,
      token: AuthMiddleware.generateToken({ ...user }),
    };

    return res.status(200).json(userToReturn);
  }

  static async register(req: Request, res: Response) {
    const constraint = {
      name: { presence: true },
      email: {
        presence: true,
        email: true,
      },
      password: {
        presence: true,
        length: {
          minimum: 6,
          message: "Votre mot de passe doit comporté au minimun 6 charactères",
        },
      },
    };

    if (validate(req.body, constraint))
      return res.status(403).json(validate(req.body, constraint));

    try {
      const user: UserInterface = (
        await User.create({
          ...req.body,
          password: await AuthMiddleware.hashPasswordasync(req.body.password),
        })
      ).dataValues;

      const userToReturn: Omit<
        UserInterface,
        "password" | "createdAt" | "updatedAt"
      > = {
        name: user.name,
        email: user.email,
        id: user.id,
        token: AuthMiddleware.generateToken({ ...user }),
      };

      return res.status(200).json(userToReturn);
    } catch (error) {
      console.log(error);

      if (error instanceof UniqueConstraintError) {
        return res.status(400).json({ message: "Cet email est déjà utilisé." });
      }
      return res.status(403).json("error");
    }
  }
}
