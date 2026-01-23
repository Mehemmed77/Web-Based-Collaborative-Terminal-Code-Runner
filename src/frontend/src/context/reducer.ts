import type { Actions, GlobalState } from "./types";

const Reducer = (state: GlobalState, action: Actions): GlobalState => {
  switch (action.type) {
    case "SET_USER_ID": {
      return { userId: action.userId };
    }

    case "LOGOUT_USER_ID": {
      return { userId: null };
    }
    default:
      // Ensure all actions are handled or throw an error
      // This helps TypeScript ensure exhaustive checks
      const exhaustiveCheck: never = action;
      throw new Error(`Unknown action type: ${exhaustiveCheck}`);
  }
};

export default Reducer;
