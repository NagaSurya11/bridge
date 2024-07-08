export const CommonActions = {
    'SET_SUPPORTED_CHAINS': (state, action) => {
        state.Chains = action.payload;
    }
}

export const QuoteTransferActions = {
    'SET_FROM_QUOTE': (state, action) => {
        const { address, symbol, name, chainId, decimals, logoURI, USDperToken, amount, chainName } = action.payload;
        Object.entries({ address, symbol, name, chainId, decimals, logoURI, USDperToken, amount, chainName })
            .forEach(([key, value]) => {
                if (value !== undefined) {
                    state.QuoteTransfer.from[key] = value;
                }
            });
    },
    'SET_TO_QUOTE': (state, action) => {
        const { address, symbol, name, chainId, decimals, logoURI, USDperToken, amount, chainName } = action.payload;
        Object.entries({ address, symbol, name, chainId, decimals, logoURI, USDperToken, amount, chainName })
            .forEach(([key, value]) => {
                if (value !== undefined) {
                    state.QuoteTransfer.to[key] = value;
                }
            });
    },
    'SET_SLIPPAGE': (state, action) => {
        if (action.payload) {
            state.QuoteTransfer.slippage = action.payload;
        }
    }
}