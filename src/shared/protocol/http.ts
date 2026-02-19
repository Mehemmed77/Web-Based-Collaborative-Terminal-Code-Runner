export type LoginRequest = {
    username: string,
    password: string,
}

export type RegisterRequest = {
    fullName: string,
    username: string,
    password: string,
}

export type AuthResponse = {
    sessionId: string,
    message?: string,
    userId: string,
}