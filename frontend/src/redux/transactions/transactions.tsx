import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Transaction } from "@/utils/interfaces";

export interface TransactionState {
  transactions: Transaction[];
  transaction: Transaction;
  status: string;
  error: string;
}

const initialState: TransactionState = {
  transactions: [],
  transaction: {} as Transaction,
  status: "",
  error: "",
};

export const transactionSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    createTransaction: (state, action: PayloadAction<Transaction>) => {
      state.transaction = { ...action.payload };
    },
  },
});

export const { createTransaction } = transactionSlice.actions;

export default transactionSlice.reducer;
