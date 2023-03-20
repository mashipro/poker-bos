import { CardSetsDecksTypes } from "./../../utilities/CardDataset";
import { createSlice } from "@reduxjs/toolkit";

type PlayerTypes = {
  uid: string;
  playerDecks: CardSetsDecksTypes[];
  playerCardWell: CardSetsDecksTypes[];
};

type DefaultReducerTypes = {
  value: number;
  cardDecks: CardSetsDecksTypes[];
  tableDecks: CardSetsDecksTypes[];
  player: PlayerTypes[];
  isStart: boolean;
  turns: string | null;
  turnsCount: number;
  isClockwise: boolean;
  sessionID: string;
};

const InitialState: DefaultReducerTypes = {
  value: 0,
  cardDecks: [],
  tableDecks: [],
  player: [],
  isStart: false,
  turns: null,
  turnsCount: 0,
  isClockwise: true,
  sessionID: "default",
};

export const gameReducer = createSlice({
  name: "counter",
  initialState: InitialState,
  reducers: {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = gameReducer.actions;

export default gameReducer.reducer;
