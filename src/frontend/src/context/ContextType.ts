import type { Actions, GlobalState } from "../state/types"

export type GlobalContextType = {
    state: GlobalState,
    dispatch: React.Dispatch<Actions>
}