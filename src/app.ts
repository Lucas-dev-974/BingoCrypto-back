import express, { Request, Response } from "express";
import AuthMiddleware from "./middleware/jwt";
import mainRouter from "./router";
import cors from "cors";
import { Server, Socket } from "socket.io";
import { createServer } from "node:http";
import RoomManager from "./utils/RoomManager";
import "./models/index";
import Game, { GameAttributes } from "./models/Games";
import { Participations } from "./models/Participations";
import { Op, where } from "sequelize";
import Users from "./models/User";
import { forEachChild } from "typescript";
import bingoUtils from "./utils/bingoUtils";

const app = express();

const port = 3001;
const server = createServer(app);

const io = new Server(3002, { cors: { origin: "*" } });

export type GameEntity = Game & {
  participations: Participations[];
  dataValues: GameAttributes & { participations: Participations[] };
};

async function createGameIfnoGame(socket: Socket, userId: number) {
  let game = await Game.createGame({
    game_name: "Bingo Kine",
    drawn_numbers: [],
    start_time: new Date(),
  });

  await Participations.create({
    gameId: game.id,
    userId: userId,
  });

  const roomId = RoomManager.generateRoomId(game);

  game = (await Game.game(game.id, true)) as GameEntity;
  RoomManager.addRoom(roomId, game as GameEntity);
  const user = (await Users.get(userId)) as Users;
  const room = RoomManager.addPlayerToRoom("kine", socket.id, user);
  socket.join(roomId);
  return room;
}

io.on("connection", (socket) => {
  socket.on("disconnect", () => console.log("user disconnected"));

  //  Logs
  socket.on("rooms", () =>
    console.log("rooms: ", RoomManager.rooms, socket.rooms)
  );
  //  End logs

  // Todo: review how we get the user by id or token ? token !
  // ! setup try catch
  socket.on("search", async (userId: number, callback) => {
    const user = await Users.get(userId, true);

    // * If no game, create one then add user participation then return the game created
    if (RoomManager.rooms.length == 0) {
      const room = createGameIfnoGame(socket, userId);
      return callback(room);
    }

    // * when search game to play we want:
    // *  - have game where the user is not in participation relation : we must load user preconfigation from DB
    // *  - the end_time = null
    // *  - take into consideration the preconfiguration like
    // *    - max/min players in game
    const maxPlayers = 4;

    // * If the player is already in a room just return the room
    if (RoomManager.playerIsInRoom(userId).length == 1)
      return callback(RoomManager.playerIsInRoom(userId)[0]);

    // * filter by max player
    const rooms = RoomManager.rooms.filter(
      (game) => game.players.length < maxPlayers
    );

    // * Search room with the most players in
    const room = rooms.reduce((previous, current) => {
      return current.players.length > previous.players.length
        ? current
        : previous;
    });

    RoomManager.addPlayerToRoom(room.id, socket.id, user as Users);
    socket.join(room.id);
    socket.to(room.id).emit("player_joined", room);

    // * If N players in room start the game
    if (room.players.length == 2) {
      RoomManager.start(room.id);

      callback(room);

      generateCardForRoom(room.id);
      return io.to(room.id).emit("game_started", "teste bingo card");
    }
    return callback(room);
  });
});

function generateCardForRoom(roomID: string) {
  const room = RoomManager.rooms.filter((room) => room.id == roomID)[0];
  room.players.forEach((player) => {
    // * generate and send bingo cards
    const card = bingoUtils.generateBingoCard();

    // * Create card in DB
    io.to(player.socketId).emit("cardsDistribution", card);
  });
}

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
