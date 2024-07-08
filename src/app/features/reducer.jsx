import { createSlice } from "@reduxjs/toolkit";
import { Chains, QuoteTransfer, SelectToken, Toaster } from "./state";
import { CommonActions, QuoteTransferActions, ToasterActions } from "./actions";

const SAR = createSlice({
    name: 'ACTION',
    initialState: {
        QuoteTransfer,
        SelectToken,
        Chains,
        Toaster
    },
    reducers: {
        ...CommonActions,
        ...QuoteTransferActions,
        ...ToasterActions
    }
});

export const actions = SAR.actions;
export default SAR.reducer;