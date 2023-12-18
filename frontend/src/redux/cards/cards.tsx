import { Card } from "@/utils/interfaces";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface CardState {
  selectedCard: Card;
  allCards: Card[];
  groupedCards: Card[];
  filteredByType: Card[];
  filteredByName: Card[];
  status: string;
  error: string;
}

const initialState: CardState = {
  selectedCard: {} as Card,
  allCards: [],
  groupedCards: [],
  filteredByType: [],
  filteredByName: [],
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

export const fetchCardsByName = createAsyncThunk(
  "cards/fetchCardsByName",
  async (cardName: string) => {
    const res = await fetch(`${url}/search/?name=${cardName}`);
    if (!res.ok) {
      throw new Error("Failed to fetch cards by name");
    }
    const cards: Card[] = await res.json();
    return cards;
  }
);

export const cardSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    selectGroupCards: (state, action: PayloadAction<string>) => {
      const selectedCards = state.allCards.filter(
        (item) => item.name === action.payload
      );
      state.groupedCards = selectedCards !== undefined ? selectedCards : [];
    },
    selectCard: (state, action: PayloadAction<string>) => {
      const selectedCard = state.groupedCards.find(
        (item) => item.tier === action.payload
      );
      state.selectedCard =
        selectedCard !== undefined ? selectedCard : state.groupedCards[0];
    },
    selectCardById: (state, action: PayloadAction<number>) => {
      const selectedCard = state.filteredByName.find(
        (item) => item.id === action.payload
      );
      state.selectedCard =
        selectedCard !== undefined ? selectedCard : ({} as Card);
    },
    resetCard: (state) => {
      state.selectedCard = {} as Card;
    },
    resetGroupCards: (state) => {
      state.groupedCards = [];
      state.selectedCard = {} as Card;
    },
    filterByCardType: (state, action: PayloadAction<string>) => {
      const filteredCards = state.allCards.filter((item) => {
        if (typeof item.card_type !== "number") {
          return item.card_type.title === action.payload;
        } else {
          return true;
        }
      });
      state.filteredByType = filteredCards;
    },
    resetFilter: (state) => {
      state.filteredByType = state.allCards;
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
          state.allCards = action.payload;
          state.filteredByType = action.payload;
        }
      )
      .addCase(fetchCards.rejected, (state, action: PayloadAction<any>) => {
        state.status = "error while trying to retrieve cards";
        state.error = String(action.payload);
      })
      .addCase(fetchCardsByName.pending, (state) => {
        state.status = "trying to fetch cards by name";
      })
      .addCase(
        fetchCardsByName.fulfilled,
        (state, action: PayloadAction<Card[] | []>) => {
          state.status = "cards by name retrieved successfully";
          state.filteredByName = action.payload;
        }
      )
      .addCase(
        fetchCardsByName.rejected,
        (state, action: PayloadAction<any>) => {
          state.status = "error while trying to retrieve cards by name";
          state.error = String(action.payload);
        }
      );
  },
});

export const {
  selectGroupCards,
  selectCard,
  selectCardById,
  resetCard,
  resetGroupCards,
  filterByCardType,
  resetFilter,
} = cardSlice.actions;

export default cardSlice.reducer;
