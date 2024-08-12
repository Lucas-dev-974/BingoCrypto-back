import { Socket } from "socket.io";

export function SocketIORouter(socket: Socket) {
    // Set up message event handler
    socket.on("message", (message: any) => {
        console.log(message);
    });

    console.log("a user connected");
    socket.emit("message", "welcom to the socket io server")

}