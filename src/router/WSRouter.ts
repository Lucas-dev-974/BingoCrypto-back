import io, { Socket } from "socket.io";

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

const players: Socket[] = []

function getGameRooms(socket: Socket) {
    return Array.from(socket.rooms).filter(room => room.includes("game"))
}

export function SocketIORouter(socket: Socket) {
    console.log("client connected", socket.rooms, " : ", socket.id)

    if (players.filter(player => player == socket).length == 0) {
        players.push(socket)
    }


    // Set up message event handler
    socket.on("message", (message: any) => {
        console.log(message);
    });

    socket.on("search", (game: string) => {
        if (getGameRooms(socket).length == 0) {
            socket.join("game kine")
            socket.emit("joinedGame")
            console.log("player joined room");

        }
    })

    socket.on("printClients", () => {
        console.log("clients: ", players[0].client);
    })
}