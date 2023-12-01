import { configureStore } from "@reduxjs/toolkit";
import cardReducer from "./cards/cards";
import userReducer from "./user/user";
import userCardReducer from "./user_cards/user_cards";
import utilReducer from "./utils/utils";

export const store = configureStore({
    reducer:{
        user:userReducer,
        utils:utilReducer,
        cards:cardReducer,
        usercards:userCardReducer
    }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;