import { combineReducers } from "redux";

import { reducer as appReducer } from "./slice";

const rootReducer = combineReducers({
  appReducer,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
