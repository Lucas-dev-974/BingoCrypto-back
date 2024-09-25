import express, { Request, Response } from "express";
import AuthMiddleware from "./middleware/jwt";
import mainRouter from "./router";
import cors from "cors";
import { Server } from "socket.io";
import { createServer } from "node:http";

const app = express();

const port = 3001;
const server = createServer(app);

// Socket setup
const io = new Server(3002, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("a user connected: ", socket.id);

  socket.on("disconnect", () => console.log("user disconnected"));
  socket.on("join-room", () => {});
  socket.on("leave-room", () => {});
});

app.use(express.json());
app.use(cors());

app.use(AuthMiddleware.authenticateToken);
app.use("/api", mainRouter);

app.get("*", (req: Request, res: Response) => {
  return res.status(404).json("error 404 - bingo reunion");
});

server.listen(port, () => {
  console.log(`Express is listening at http://localhost:${port}`);
});
