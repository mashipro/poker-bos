import { userReducer } from "./userReducer";
import { gameReducer } from "./gameReducer";
import { combineReducers } from "@reduxjs/toolkit";

export const blacklistReducer = [
  // "user"
];

const RootReducer = combineReducers({
  user: userReducer.reducer,
  game: gameReducer.reducer,
});

export type RootStateTypes = ReturnType<typeof RootReducer>;
export default RootReducer;
