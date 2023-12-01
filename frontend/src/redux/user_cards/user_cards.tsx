import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { headers } from "../user/user";
import { Card } from "@/utils/interfaces";

export interface UserCardState {
  card: Card;
  cards: Card[];
  filtered_cards: Card[];
  status: string;
  error: string;
}

const initialState: UserCardState = {
  card: {} as Card,
  cards: [],
  filtered_cards: [],
  status: "idle",
  error: "",
};

const url = "http://localhost:8000/api/cards";

export const fetchUserCards = createAsyncThunk(
  "cards/fetchUserCards",
  async () => {
    const res = await fetch(`${url}/usercards/`, {
      method: "GET",
      headers: headers,
      credentials: "include",
    });
    if (!res.ok) {
      throw new Error("Failed to fetch user cards");
    }
    const userCards: Card[] = await res.json();
    return userCards;
  }
);

export const userCardSlice = createSlice({
  name: "user_cards",
  initialState,
  reducers: {
    selectCardById: (state, action: PayloadAction<number>) => {
      const selectedCard = state.cards.find(
        (item) => item.id === action.payload
      );
      state.card = selectedCard !== undefined ? selectedCard : ({} as Card);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserCards.pending, (state) => {
        state.status = "trying to fetch user cards";
      })
      .addCase(
        fetchUserCards.fulfilled,
        (state, action: PayloadAction<Card[] | []>) => {
          state.status = "user cards retrieved successfully";
          state.cards = action.payload;
          state.filtered_cards = action.payload;
        }
      )
      .addCase(fetchUserCards.rejected, (state, action: PayloadAction<any>) => {
        state.status = "error while trying to retrieve user cards";
        state.error = String(action.payload);
      });
  },
});

export const { selectCardById } = userCardSlice.actions;

export default userCardSlice.reducer;
