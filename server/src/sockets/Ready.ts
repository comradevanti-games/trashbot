import {playerId, roomId} from "../domain"
import {RoomDB} from "../RoomDB";
import {Lobby} from "../Lobby";
import {SocketClient} from "./SocketClient";
import {UniversalErrors} from "./UniversalErrors";

export module Ready {

    type Request = {
        playerId: playerId | undefined,
        roomId: roomId | undefined,
    }

    type Response = {}

    export function handle(request: Request, roomDB: RoomDB, client: SocketClient): RoomDB {
        if (request.playerId === undefined || request.roomId === undefined) {
            client.sendError("lobby/ready", UniversalErrors.BAD_MESSAGE)
            return roomDB
        }

        const dbWithGame = roomDB.startGameIn(request.roomId)
        client.sendToRoom(request.roomId, "lobby/ready", {})

        return dbWithGame
    }

}