import { createSlice } from "@reduxjs/toolkit";
import { Chains, QuoteTransfer, SelectToken } from "./state";
import { CommonActions, QuoteTransferActions } from "./actions";

const SAR = createSlice({
    name: 'ACTION',
    initialState: {
        QuoteTransfer,
        SelectToken,
        Chains
    },
    reducers: {
        ...CommonActions,
        ...QuoteTransferActions
    }
});

export const actions = SAR.actions;
export default SAR.reducer;