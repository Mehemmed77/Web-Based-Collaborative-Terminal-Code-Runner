export type GlobalState = {
    userId: string | null;
}

export type Actions = | {type: "SET_USER_ID", userId: string} | {type: "LOGOUT_USER_ID"};