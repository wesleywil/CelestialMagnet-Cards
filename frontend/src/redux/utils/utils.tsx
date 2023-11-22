import { createSlice } from "@reduxjs/toolkit";

export interface UtilState {
  hideCardShowcase: boolean;
}

const initialState: UtilState = {
  hideCardShowcase: true,
};

export const utilSlice = createSlice({
  name: "utils",
  initialState,
  reducers: {
    switchCardShowcase: (state) => {
      state.hideCardShowcase = !state.hideCardShowcase;
    },
  },
});

export const { switchCardShowcase } = utilSlice.actions;

export default utilSlice.reducer;
