import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import UserTypes from "../../utilities/types/UserTypes";

type DefaultReducerTypes = {
  value: number;
  uid: string;
  name: string;
  lastSessionID: string | null;
};

const InitialState: DefaultReducerTypes = {
  value: 0,
  uid: "",
  name: "",
  lastSessionID: null,
};

export const userReducer = createSlice({
  name: "user",
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
    signIn: (state, action: PayloadAction<UserTypes>) => {
      const payload = action.payload;

      //   state.uid = payload.uid;
      //   state.name = payload.name;
      return { ...state, ...payload };
    },
    signOut: () => {
      return { ...InitialState };
    },
  },
});

// Action creators are generated for each case reducer function
export const { signIn, signOut } = userReducer.actions;

export default userReducer.reducer;
