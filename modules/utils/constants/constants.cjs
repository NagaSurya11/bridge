
const URLs = {
    XYFinanceAPI: {
        baseURL: 'https://aggregator-api.xy.finance/v1',
        getSupportedChains: {
            method: 'GET',
            path: '/supportedChains',
            type: 'supportedChains'
        },
        getTokens: {
            method: 'GET',
            path: '/recommendedTokens',
            type: 'recommendedTokens'
        },
        getRoutesForQuote: {
            method: 'GET',
            path: '/quote',
            type: 'routes'
        },
        buildTx: {
            method: 'GET',
            path: '/buildTx',
            type: 'tx'
        }
    },
    CurrencyDataAPI: {
        baseURL: 'https://min-api.cryptocompare.com',
        getCurrencyValue: {
            method: 'GET',
            path: '/data/price',
            type: 'routes'
        }
    }
}

module.exports = {
    URLs
}