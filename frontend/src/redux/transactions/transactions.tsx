import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Transaction } from "@/utils/interfaces";
import { headers } from "../user/user";
import { Token } from "@stripe/stripe-js";

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

export const deleteTransaction = createAsyncThunk(
  "transactions/deleteTransaction",
  async (id: number) => {
    try {
      const res = await fetch(`${url}/transactions/user/${id}`, {
        method: "DELETE",
        headers: headers,
        credentials: "include",
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to delete transaction");
      }
      const data = await res.json();
      return data;
    } catch (error: any) {
      throw new Error(error.message || "Error while deleting transaction");
    }
  }
);

export const sellCardTransaction = createAsyncThunk(
  "transactions/sellCardTransaction",
  async (data: { transaction_id: number; token: string }) => {
    try {
      const res = await fetch(`${url}/sell/`, {
        method: "POST",
        headers: headers,
        credentials: "include",
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to sell card item");
      }
      const dataSell = await res.json();
      return dataSell;
    } catch (error: any) {
      throw new Error(error.message || "Error while trying to sell card");
    }
  }
);

export const transactionSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    addTransaction: (state, action: PayloadAction<Transaction>) => {
      state.transaction = { ...action.payload };
    },
    selectTransactionById: (state, action: PayloadAction<number>) => {
      const selectedTransaction = state.transactions.find(
        (item) => item.id === action.payload
      );
      state.transaction =
        selectedTransaction !== undefined
          ? selectedTransaction
          : ({} as Transaction);
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
      )
      .addCase(deleteTransaction.pending, (state) => {
        state.status = "deleting transaction";
      })
      .addCase(
        deleteTransaction.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.status = "transaction deleted successfully";
        }
      )
      .addCase(
        deleteTransaction.rejected,
        (state, action: PayloadAction<any>) => {
          state.status = "error while trying to delete a transaction";
          state.error = String(action.payload);
        }
      )
      .addCase(sellCardTransaction.pending, (state) => {
        state.status = "trying to sell card";
      })
      .addCase(
        sellCardTransaction.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.status = "card was sold successfully";
        }
      )
      .addCase(
        sellCardTransaction.rejected,
        (state, action: PayloadAction<any>) => {
          state.status = "failed to sell card";
          state.error = String(action.payload);
        }
      );
  },
});

export const { addTransaction, selectTransactionById, resetStatus } =
  transactionSlice.actions;

export default transactionSlice.reducer;
