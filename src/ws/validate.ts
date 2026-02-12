import { IncomingMessage } from "node:http";

export default function validate(req: IncomingMessage) {
    const url = new URL(req.url ?? "", "http://localhost");

    const roomId = url.searchParams.get("roomId");
    const userId = url.searchParams.get("userId");
    const isOwner = url.searchParams.get("isOwner");

    if (roomId == null || userId == null) return null;

    return { roomId, userId, isOwner }
}