import express, { Request, Response } from "express";
import AuthMiddleware from "./middleware/jwt";
import mainRouter from "./router";
import cors from "cors";
import { Server as SocketIOServer, type Socket } from "socket.io";

import { createServer } from "http";

const app: express.Application = express();
const httpServer = createServer(app);

const io = new SocketIOServer(httpServer);

io.listen(httpServer);

// Set up connection event for socket.io
io.on("connection", (socket: Socket) => {
  console.log("a user connected");

  // Set up message event handler
  socket.on("open", (message: any) => {
    console.log(message);
  });
});

const port = 3001;
app.use(express.json());
app.use(cors());

app.use(AuthMiddleware.authenticateToken);

app.use("/api", mainRouter);

app.get("*", (req: Request, res: Response) => {
  return res.status(404).json("error 404 - bingo reunion");
});

app.use((req: Request, res: Response) => {
  return res.status(404).json("error 404 - bingo reunion");
});

const rooms = new Map();

httpServer.listen(port, () => {
  console.log(`Express is listening at http://localhost:${port}`);
});
