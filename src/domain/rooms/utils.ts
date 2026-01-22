export function isJoinRoomPayload(payload: any) {
    return (
        payload &&
        typeof payload.roomId === "string"
    )
}

export function isCreateRoomPayload(payload: any) {
    return (
        payload &&
        typeof payload.userId === "string"
    )
}

export function isLeaveRoomPayload(payload: any) {
    return (
        payload &&
        typeof payload.roomId === "string"
    )
}
