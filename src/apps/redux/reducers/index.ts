import { gameReducer } from "./gameReducer";
import { defaultReducer } from "./defaultReducer";
import { combineReducers } from "@reduxjs/toolkit";

export default combineReducers({
  default: defaultReducer.reducer,
  game: gameReducer.reducer,
});
