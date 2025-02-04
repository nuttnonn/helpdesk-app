import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import searchTicketReducer from "../features/search/searchTicketSlice.ts"
import searchStatusReducer from "../features/search/searchStatusSlice.ts"

export const store = configureStore({
    reducer: {
        auth: authReducer,
        searchTicket: searchTicketReducer,
        searchStatus: searchStatusReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;