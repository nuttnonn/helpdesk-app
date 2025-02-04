import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SearchTickState {
    query: string;
}

const initialState: SearchTickState = {
    query: "",
};

const searchTicketSlice = createSlice({
    name: "searchTicket",
    initialState,
    reducers: {
        setSearchTicketQuery: (state, action: PayloadAction<string>) => {
            state.query = action.payload;
        },
    },
});

export const { setSearchTicketQuery } = searchTicketSlice.actions;
export default searchTicketSlice.reducer;