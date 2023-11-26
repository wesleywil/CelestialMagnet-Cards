import { Card } from "@/utils/interfaces";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface CardState {
  card: Card;
  cards: Card[];
  status: string;
  error: string;
}

const initialState: CardState = {
  card: {} as Card,
  cards: [],
  status: "idle",
  error: "",
};

const url = "http://localhost:8000/api/cards";

export const fetchCards = createAsyncThunk("cards/fetchCards", async () => {
  const res = await fetch(`${url}/`);
  if (!res.ok) {
    throw new Error("Failed to fetch cards");
  }
  const cards: Card[] = await res.json();
  return cards;
});

export const cardSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCards.pending, (state) => {
        state.status = "trying to fetch cards";
      })
      .addCase(
        fetchCards.fulfilled,
        (state, action: PayloadAction<Card[] | []>) => {
          state.status = "cards retrieved successfully";
          state.cards = action.payload;
        }
      )
      .addCase(fetchCards.rejected, (state, action: PayloadAction<any>) => {
        state.status = "error while trying to retrieve cards";
        state.error = String(action.payload);
      });
  },
});

export const {} = cardSlice.actions;

export default cardSlice.reducer;
