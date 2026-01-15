export function validateUsername(username: string) {
    if (username.length < 3) return "UNDERFLOW"
    if (username.length > 30) return "OVERFLOW"
    return "VALID"
}

export function validatePassword(password: string) {
    if (password.length < 6) return "UNDERFLOW"
    if (password.length > 50) return "OVERFLOW"
    return "VALID"
}
