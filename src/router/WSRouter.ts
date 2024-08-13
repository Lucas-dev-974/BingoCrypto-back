import { Socket } from "socket.io";

type PlayerType = {
    user_id: number;
    token: string;
}

type RoomType = {
    name: string;
    gameName: string;
    players: PlayerType[];
    id: number;
}

export const rooms: RoomType[] = [
    {
        id: 1,
        gameName: "KINE",
        name: "KINE 1",
        players: [],
    }
]

export function SocketIORouter(socket: Socket) {
    // Set up message event handler
    socket.on("message", (message: any) => {
        console.log(message);
    });

    socket.on("getRooms", () => {

    })
}