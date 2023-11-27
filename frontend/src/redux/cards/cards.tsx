import { Card } from "@/utils/interfaces";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface CardState {
  card: Card;
  cards: Card[];
  group_cards: Card[];
  status: string;
  error: string;
}

const initialState: CardState = {
  card: {} as Card,
  cards: [],
  group_cards: [],
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
  reducers: {
    selectGroupCards: (state, action: PayloadAction<string>) => {
      const selectedCards = state.cards.filter(
        (item) => item.name === action.payload
      );
      state.group_cards = selectedCards !== undefined ? selectedCards : [];
    },
    selectCard: (state, action: PayloadAction<string>) => {
      const selectedCard = state.group_cards.find(
        (item) => item.tier === action.payload
      );
      state.card =
        selectedCard !== undefined ? selectedCard : state.group_cards[0];
    },
    resetGroupCards: (state) => {
      state.group_cards = [];
      state.card = {} as Card;
    },
  },
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

export const { selectGroupCards, selectCard, resetGroupCards } =
  cardSlice.actions;

export default cardSlice.reducer;
