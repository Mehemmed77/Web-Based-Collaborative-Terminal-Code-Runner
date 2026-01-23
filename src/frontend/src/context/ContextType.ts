import type { Actions, GlobalState } from "./types"

export type GlobalContextType = {
    state: GlobalState,
    dispatch: React.Dispatch<Actions>
}