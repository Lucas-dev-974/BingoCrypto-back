import { GamesEnum } from "../controller/GameController";
import { UserAttributes } from "../interface/models";

type PlayerType = {
    user_id: number;
    token: string;
}

type RoomType = {
    name: string;
    gameName: GamesEnum;
    players: PlayerType[];
    id: number;
}

class RoomManager {
    // L'instance unique de la classe, initialement non définie
    private static instance: RoomManager;
    public rooms: RoomType[] = []


    // Constructeur privé pour empêcher l'instantiation directe
    private constructor() {
        if (this.rooms.length == 0) {
            this.rooms.push({
                id: 1,
                gameName: GamesEnum.kine,
                name: "KINE 1",
                players: []
            })
        }
    }

    // Méthode statique pour accéder à l'unique instance
    public static getInstance(): RoomManager {
        if (!RoomManager.instance) {
            RoomManager.instance = new RoomManager();
        }
        return RoomManager.instance;
    }

    // Autres méthodes de la classe
    public appendPlayerToRoom(roomId: number, user: UserAttributes): void {
        this.rooms.map(room => {
            if (room.id == roomId) {
                room.players.push({ token: "", user_id: 1 })
            }
        })
        console.log("Singleton method called!");
    }

    public getGameRooms(gameName: GamesEnum) {
        return this.rooms.filter(room => room.gameName == gameName)
    }
}

export default RoomManager.getInstance()