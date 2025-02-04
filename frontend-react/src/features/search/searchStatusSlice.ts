import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TicketStatus } from '../tickets/enums/status.enum.ts';

interface SearchStatusState {
    statuses: TicketStatus[];
}

const initialState: SearchStatusState = {
    statuses: [],
};

const searchStatusSlice = createSlice({
    name: "searchStatus",
    initialState,
    reducers: {
        setSearchStatuses: (state, action: PayloadAction<string[]>) => {
            state.statuses = action.payload;
        },
        clearSearchStatuses: (state) => {
            state.statuses = [];
        },
    },
});

export const { setSearchStatuses, clearSearchStatuses } = searchStatusSlice.actions;
export default searchStatusSlice.reducer;
