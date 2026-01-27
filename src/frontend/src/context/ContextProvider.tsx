import { createContext, useReducer, type ReactNode } from "react";
import type { GlobalContextType } from "./ContextType";
import Reducer from "./reducer";

export const GlobalContext = createContext<GlobalContextType | null>(null);

const GlobalContextProvider = ({children}: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(Reducer, { userId: null, ownership: null, connectionState: "IDLE" });

    return (
        <GlobalContext.Provider value={{state: state, dispatch: dispatch}}>
            {children}
        </GlobalContext.Provider>
    )
}


export default GlobalContextProvider