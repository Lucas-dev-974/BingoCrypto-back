import express, { Request, Response } from "express";
import AuthMiddleware from "./middleware/jwt";
import mainRouter from "./router";
import cors from "cors";
import { Server as SocketIOServer } from "socket.io";

import { createServer } from "http";
import { SocketIORouter } from "./router/WSRouter";
import sequelize from "./models/sequelize-cli";

const app: express.Application = express();

async function StartServer() {
  sequelize.sync();


  const server = createServer(app);
  const io = new SocketIOServer(server, {
    cors: {
      origin: '*', // Remplacez par l'origine spécifique si nécessaire
      methods: ['GET', 'POST']
    }
  });

  io.listen(server);

  // Set up connection event for socket.io
  io.on("connection", SocketIORouter);

  const port = 3001;
  app.use(cors());
  app.use(express.json());


  app.use(AuthMiddleware.authenticateToken);

  app.use("/api", mainRouter);

  app.get("*", (req: Request, res: Response) => {
    return res.status(404).json("error 404 - bingo reunion");
  });

  app.use((req: Request, res: Response) => {
    return res.status(404).json("error 404 - bingo reunion");
  });


  server.listen(port, () => {
    console.log(`Express is listening at http://localhost:${port}`);
  });

}

StartServer()