import { createSlice } from "@reduxjs/toolkit";

export interface UtilState {
  hideCardShowcase: boolean;
  hideTradeSellPanel: boolean;
}

const initialState: UtilState = {
  hideCardShowcase: true,
  hideTradeSellPanel: true,
};

export const utilSlice = createSlice({
  name: "utils",
  initialState,
  reducers: {
    switchCardShowcase: (state) => {
      state.hideCardShowcase = !state.hideCardShowcase;
    },
    switchCardSellTrade: (state) => {
      state.hideTradeSellPanel = !state.hideTradeSellPanel;
    },
  },
});

export const { switchCardShowcase, switchCardSellTrade } = utilSlice.actions;

export default utilSlice.reducer;
