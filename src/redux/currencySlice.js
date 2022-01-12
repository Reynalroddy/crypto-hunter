import { createSlice } from "@reduxjs/toolkit";

export const currencySlice = createSlice({
  name: "currency",
  initialState: {
    cur: "usd",
  },

  reducers: {
    update: (state, action) => {
      return { ...state, cur: action.payload };
      /*  state.name = action.payload.name;
      state.email = action.payload.email; */
    },
  },
});

export const { update } = currencySlice.actions;

export default currencySlice.reducer;
