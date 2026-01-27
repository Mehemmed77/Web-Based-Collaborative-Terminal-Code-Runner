import type { Actions, GlobalState } from "./types";

const Reducer = (state: GlobalState, action: Actions): GlobalState => {
  switch (action.type) {
    case "SET_USER_ID": {
      return { ...state, userId: action.userId };
    }

    case "LOGOUT_USER_ID": {
      return { userId: null, ownership: null, connectionState: null };
    }

    case "SET_CONNECTION_STATE": {
      return {...state, connectionState: action.connectionState};
    }

    case "SET_OWNERSHIP": {
      return {...state, ownership: action.ownership}
    }

    // default:
    //   // Ensure all actions are handled or throw an error
    //   // This helps TypeScript ensure exhaustive checks
    //   const exhaustiveCheck: never = action;
    //   throw new Error(`Unknown action type: ${exhaustiveCheck}`);
  }
};

export default Reducer;
