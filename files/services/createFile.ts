import { Message } from "../../shared/protocol.ts";
import { activeSockets } from "../../state/activeSockets.ts";
import { ClientSocket } from "../../ws/socket.ts";
import deleteFileFromDisk, { insertFileToDisk } from "../fs.ts";
import { determineFileExtension } from "../validation.ts";
import writeFileToDB from "../repository/writeFileToDB.ts";
import { fileCreationErrors } from "../types.ts";

export default async function createFile(msg: Message, ws: ClientSocket) {
  const roomId = activeSockets.get(ws.id)?.roomId;
  if (roomId == null) return;

  const fileName = msg.payload.content ?? "";

  const regEx = /^[a-zA-Z0-9._-]+\.(py|txt)$/;
  if (!regEx.test(fileName)) {
    ws.send("Not a valid file name");
    return;
  }

  const extension = determineFileExtension(fileName);

  // For now, files can only be created at this folder: /workspaces/roomId/.
  // But as we advance further, relative msg object will contain fields such: folderAt and fileName seperatly
  const relativePath = `${fileName}`;

  const insertCode = await insertFileToDisk(relativePath, roomId);

  if (insertCode === "CREATED") {
    const dbResult = await writeFileToDB(roomId, relativePath, extension);

    if (dbResult !== "INSERTED") {
      deleteFileFromDisk(roomId, relativePath);
      ws.send(fileCreationErrors[dbResult] ?? "");
    }
  } else ws.send(fileCreationErrors[insertCode] ?? "");
}
