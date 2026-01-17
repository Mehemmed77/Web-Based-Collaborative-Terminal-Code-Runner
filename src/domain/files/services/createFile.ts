import deleteFileFromDisk, { insertFileToDisk } from "../fs.ts";
import { determineFileExtension } from "../validation.ts";
import writeFileToDB from "../repository/writeFileToDB.ts";
import { fileCreationErrors } from "../types.ts";
import { isCreateFilePayload } from "../utils.ts";
import { Message } from "@/shared/protocol.ts";
import { ClientSocket } from "@/shared/state/socket.ts";
import { activeSockets } from "@/shared/state/activeSockets.ts";

export default async function createFile(msg: Message, ws: ClientSocket) {
  const roomId = activeSockets.get(ws.id)?.roomId;
  if (roomId == null) return;

  if (msg.msgType !== "CREATE_FILE" || !isCreateFilePayload(msg.payload)) {
    ws.send("Invalid create file payload");
    return;
  }

  const fileName = msg.payload.fileName ?? "";

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
