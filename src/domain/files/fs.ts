import * as fsPromises from "fs/promises";
import * as path from "path";

export async function insertFileToDisk(relativePath: string, roomId: string) {
  try {
    const filePath = path.join(process.cwd(),"workspaces", roomId, relativePath);

    await fsPromises.writeFile(filePath, "", { encoding: "utf-8", flag: "wx" });

    return "CREATED";

  } catch (e: any) {
    if (e.code === "EEXIST") {
      return "DUPLICATE";
    }

    console.log("Error occurred: ", e);
    return "FAILED_TO_CREATE";
  }
}

export default async function deleteFileFromDisk(roomId: string, relativePath: string) {
    const file = path.join(process.cwd(), "workspaces", roomId, relativePath);
    await fsPromises.unlink(file);
}
