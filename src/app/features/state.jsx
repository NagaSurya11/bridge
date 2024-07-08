import Chain from "../utils/classes/chain.class"

export const QuoteTransfer = {
    'from': {},
    'to': {},
    'slippage': 0.5,
    'bridgeInfo': {
    }
}

export const SelectToken = {
    'chainId': 1,
    'chainName': 'Ethereum',
    'tokenSymbol': 'ETH',
    'chainList': []
}

export const Toaster = {
    open: false,
    severity: 'success',
    message: 'message'
}

/**
 * @type {Array<Chain>}
 */
export const Chains = [];