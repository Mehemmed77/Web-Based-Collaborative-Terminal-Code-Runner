import { activeRooms, activeSockets } from "../server.ts";
import { ClientSocket } from "../types/clientSocket.ts";
import { Message } from "../types/msgType.ts";
import determineFileExtension from "../utils/determineFileExtension.ts";
import insertFileToDisk from "./insertFileToDisk.ts";
import writeFileToDB from "./writeFileToDB.ts";

export default async function createFile(msg: Message, ws: ClientSocket) {
    const roomId = activeSockets.get(ws.id)?.roomId
    if(roomId == null) return;

    const fileName = msg.payload.content ?? "";
    
    const regEx = /^[a-zA-Z0-9._-]+\.(py|txt)$/;
    if (!regEx.test(fileName)) {
        ws.send("Not a valid file name");
        return;
    }

    const extension = determineFileExtension(fileName);

    const relativePath = `/workspaces/${roomId}/${fileName}`;

    await insertFileToDisk(fileName, roomId);
    await writeFileToDB(roomId, relativePath, extension);
}