import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Transaction } from "@/utils/interfaces";
import { headers } from "../user/user";

export interface TransactionState {
  transactions: Transaction[];
  transaction: Transaction;
  status: string;
  error: string;
}

const initialState: TransactionState = {
  transactions: [],
  transaction: {} as Transaction,
  status: "idle",
  error: "",
};

const url = "http://localhost:8000/api/cards";

export const fetchTransactions = createAsyncThunk(
  "transactions/fetchTransactions",
  async () => {
    const res = await fetch(`${url}/transactions/`, {});
    if (!res.ok) {
      throw new Error("Failed to fetch transactions");
    }
    const transactions = await res.json();
    return transactions;
  }
);

export const fetchUserTransactions = createAsyncThunk(
  "transactions/fetchUserTransactions",
  async () => {
    const res = await fetch(`${url}/transactions/user/`, {
      headers: headers,
      credentials: "include",
    });
    if (!res.ok) {
      throw new Error("Failed to fetch transactions");
    }
    const transactions = await res.json();
    return transactions;
  }
);

export const createTransaction = createAsyncThunk(
  "transactions/createTransaction",
  async (data: Transaction) => {
    const res = await fetch(`${url}/transactions/user/`, {
      method: "POST",
      headers: headers,
      credentials: "include",
      body: JSON.stringify(data),
    });
    const transaction = await res.json();
    return transaction;
  }
);

export const transactionSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    addTransaction: (state, action: PayloadAction<Transaction>) => {
      state.transaction = { ...action.payload };
    },
    resetStatus: (state) => {
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.status = "fetching transactions";
      })
      .addCase(
        fetchTransactions.fulfilled,
        (state, action: PayloadAction<Transaction[] | []>) => {
          state.status = "transactions fetched";
          state.transactions = action.payload;
        }
      )
      .addCase(
        fetchTransactions.rejected,
        (state, action: PayloadAction<any>) => {
          state.status = "failed to fetched the transactions";
          state.error = String(action.payload);
        }
      )
      .addCase(fetchUserTransactions.pending, (state) => {
        state.status = "fetching user transactions";
      })
      .addCase(
        fetchUserTransactions.fulfilled,
        (state, action: PayloadAction<Transaction[] | []>) => {
          state.status = "user transactions fetched";
          state.transactions = action.payload;
        }
      )
      .addCase(
        fetchUserTransactions.rejected,
        (state, action: PayloadAction<any>) => {
          state.status = "failed to fetched the user transactions";
          state.error = String(action.payload);
        }
      )
      .addCase(createTransaction.pending, (state) => {
        state.status = "creating transaction";
      })
      .addCase(
        createTransaction.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.status = "transaction created successfully";
        }
      )
      .addCase(
        createTransaction.rejected,
        (state, action: PayloadAction<any>) => {
          state.status = "error while trying to create a transaction";
          state.error = String(action.payload);
        }
      );
  },
});

export const { addTransaction, resetStatus } = transactionSlice.actions;

export default transactionSlice.reducer;
