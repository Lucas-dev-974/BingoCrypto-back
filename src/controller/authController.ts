import { Request, Response } from "express";
import validate from "validate.js";
import AuthMiddleware from "../middleware/jwt";
import { UniqueConstraintError } from "sequelize";
import EmailService from "../services/mailer";
import mailer from "../services/mailer";
import { UserAttributes, Users } from "../models/User";

export class AuthControlleur {
  static async login(req: Request, res: Response) {
    const constraint = {
      email: { presence: true, email: true },
      password: { presence: true },
    };

    if (validate(req.body, constraint))
      return res.status(403).json(validate(req.body, constraint));

    const user: UserAttributes | undefined = (
      await Users.findOne({
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
      UserAttributes,
      "password" | "createdAt" | "updatedAt"
    > & { token: string } = {
      ...user,
      verified_email: user.verified_email ?? false,
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
      last_name: { presence: true },
      birthday: { presence: true },
      address: { presence: true },
      phone: { presence: true },
      postal_code: { presence: true },
    };

    if (validate(req.body, constraint))
      return res.status(403).json(validate(req.body, constraint));

    try {
      const user: UserAttributes = (
        await Users.create({
          ...req.body,
          password: await AuthMiddleware.hashPasswordasync(req.body.password),
        })
      ).dataValues;

      const userToReturn: Omit<
        UserAttributes,
        "password" | "createdAt" | "updatedAt"
      > & { token: string } = {
        ...user,
        token: AuthMiddleware.generateToken({ ...user }),
        verified_email: user.verified_email ?? false,
      };

      await EmailService.sendVerificationEmail(
        req.body.email,
        AuthMiddleware.generateToken({ ...user })
      );

      return res.status(200).json(userToReturn);
    } catch (error) {
      console.log(error);

      if (error instanceof UniqueConstraintError) {
        return res.status(400).json("Cet email est déjà utilisé.");
      }

      return res.status(403).json("error");
    }
  }

  static async verifyEmail(req: Request, res: Response) {
    const { token } = req.query;

    try {
      const decodedToken: UserAttributes = AuthMiddleware.validateToken(
        token
      ) as UserAttributes;

      const user = await Users.findByPk(decodedToken.id);
      user?.update({ verified_email: true });
      user?.save();

      res.status(200).json({ message: "Email verified successfully." });
    } catch (error) {
      console.error("Error verifying email:", error);
      res.status(500).json({ error: "Error verifying email." });
    }
  }

  static async checkToken(req: Request, res: Response) {
    const { token } = req.query;
    console.log("token:", token);

    try {
      const decodedToken: UserAttributes = AuthMiddleware.validateToken(
        token
      ) as UserAttributes;

      res.status(200).json({ message: "ok", status: true });
    } catch (error) {
      res.status(401).json({ message: "Connexion invalide", status: false });
    }
  }

  static async requestReset(req: Request, res: Response) {
    const constraint = {
      email: {
        presence: true,
        email: true,
      },
    };

    if (validate(req.body, constraint))
      return res.status(403).json(validate(req.body, constraint));

    const { email } = req.body;
    const user: UserAttributes | undefined = (
      await Users.findOne({
        where: { email: email },
      })
    )?.dataValues;

    if (!user) {
      return res
        .status(400)
        .send(
          "Aucun utilisatuer avec cet email est enregistrer, veuillez vous inscrire."
        );
    }

    const token = AuthMiddleware.generateToken({ ...user });

    const resetLink = `http://localhost:3000/reset-password?token=${token}`;
    await mailer.sendEmail(
      email,
      "Réinitialisation de mot de passe",
      // `Click here to reset your password: ${resetLink}`
      "teset teste"
    );

    return res
      .status(200)
      .json(
        "Un mail vous à été envoyer pour la réinitialisation de votre mot de passe."
      );
  }

  static async resetPassword(req: Request, res: Response) {}
}
