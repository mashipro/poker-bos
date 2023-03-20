import { createSlice } from "@reduxjs/toolkit";

type DefaultReducerTypes = {
  value: number;
};
const InitialState: DefaultReducerTypes = {
  value: 0,
};

export const defaultReducer = createSlice({
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
export const { increment, decrement, incrementByAmount } =
  defaultReducer.actions;

export default defaultReducer.reducer;
