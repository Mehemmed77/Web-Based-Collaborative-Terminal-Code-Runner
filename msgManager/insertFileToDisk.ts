import * as fsPromises from "fs/promises";
import * as path from "path";

export default async function insertFileToDisk(filename: string, roomId: string) {
  try {
    const filePath = path.join(process.cwd(),"workspaces", roomId, filename);
    await fsPromises.writeFile(filePath, "", { encoding: "utf-8" });
    return true;
  } catch (e) {
    console.log("Error occurred: ", e);
    return false;
  }
}
