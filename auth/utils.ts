export function isRegisterPayload(payload: any) {
    return(
        payload &&
        typeof payload.username === "string" &&
        typeof payload.password === "string" 
    )
}

export function isLoginPayload(payload: any) {
    return(
        payload &&
        typeof payload.username === "string" &&
        typeof payload.password === "string" 
    )
}

export function setSessionToken(sessionId: string) {
    
}
