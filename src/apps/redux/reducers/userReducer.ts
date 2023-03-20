import { createSlice } from "@reduxjs/toolkit";

type DefaultReducerTypes = {
  value: number;
  uid: string;
  name: string;
};
const InitialState: DefaultReducerTypes = {
  value: 0,
  uid: "",
  name: "",
};

export const userReducer = createSlice({
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
export const { increment, decrement, incrementByAmount } = userReducer.actions;

export default userReducer.reducer;
