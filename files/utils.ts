export function isCreateFilePayload(payload: any)  {
    return (
        payload &&
        typeof payload.fileName === "string"
    )
}