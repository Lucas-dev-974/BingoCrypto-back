import { Participations } from "../models/Participations";
import Game, { GameAttributes } from "../models/Games";
import Users, { UserAttributes } from "../models/User";
import { GameEntity } from "../app";

type PlayerType = {
  socketId: string;
  user: UserAttributes;
  token: string;
};

export enum GamesEnum {
  kine = "KINE",
}

type RoomType = {
  game: Game & GameEntity;
  players: PlayerType[];
  id: string;
  started?: boolean;
};

class GamesManager {
  private static instance: GamesManager;
  public rooms: RoomType[] = [];

  private constructor() {}

  public static getInstance(): GamesManager {
    if (!GamesManager.instance) {
      GamesManager.instance = new GamesManager();
    }
    return GamesManager.instance;
  }

  public addRoom(roomId: string, game: GameEntity) {
    this.rooms.push({
      id: roomId,
      game: game,
      players: [],
    });
  }

  public addPlayerToRoom(
    roomId: string,
    socketId: string,
    user: UserAttributes
  ) {
    this.rooms.forEach((room) => {
      if (room.id == roomId) {
        room.players.push({
          socketId: socketId,
          user: user,
          token: "",
        });
      }
    });

    return this.rooms.filter((room) => room.id == roomId)[0];
  }

  public playerIsInRoom(userId: number) {
    return this.rooms.filter((room) => {
      if (room.players.filter((player) => player.user.id == userId).length > 0)
        return room;
    });
  }

  public generateRoomId(game: Game) {
    return "kine_" + game.id.toString();
  }

  public start(roomId: string) {
    this.rooms.forEach((room) =>
      room.id == roomId ? (room.started = true) : null
    );
  }
}

export default GamesManager.getInstance();
