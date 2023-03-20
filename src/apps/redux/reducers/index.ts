import { userReducer } from "./userReducer";
import { gameReducer } from "./gameReducer";
import { defaultReducer } from "./defaultReducer";
import { combineReducers } from "@reduxjs/toolkit";

export const blacklistReducer = ["user"];
export default combineReducers({
  default: defaultReducer.reducer,
  user: userReducer.reducer,
  game: gameReducer.reducer,
});
