const { StatusCodes } = require('http-status-codes');

const CurrencyData = require('./currency.data.service.cjs');

const axios = require('axios');

async function getGasPrice(chainId) {
    const response = await axios.get(`https://api.blocknative.com/gasprices/blockprices?chainid=${chainId}`, {
        headers: {
            Authorization: '98033f9c-b614-47e6-8652-2d7bf12f9b29'  // Replace with your actual Blocknative API key
        }
    });
    return response.data.blockPrices ?? [];
}

async function calculateGasFeeInUsd(chainId, estimatedGas, srcQuoteTokenUsdValue) {
    const gasPrices = await getGasPrice(chainId);
    const gasPriceGwei = gasPrices[0].estimatedPrices[0].price;
    const gasPriceNative = gasPriceGwei * 1e-9; // Convert Gwei to native token

    const totalGasFeeNative = parseInt(estimatedGas) * gasPriceNative; // Total gas fee in native token

    // Use srcQuoteTokenUsdValue directly to get the gas fee in USD
    const totalGasFeeUsd = totalGasFeeNative * srcQuoteTokenUsdValue;
    return totalGasFeeUsd;
}


async function getGasFee(estimatedGas, chainId, tokenSymbol, currencyCode) {
    let response = 0;
    try {
        const chainIdInt = parseInt(chainId, 10);
        const USDValueResponse = await new CurrencyData().getCurrencyValue(tokenSymbol, currencyCode);
        if (USDValueResponse.statusCode === StatusCodes.OK && USDValueResponse.data) {
            response = await calculateGasFeeInUsd(chainIdInt, estimatedGas, USDValueResponse.data['USD']);
        }
    } catch (error) {
        console.error(error.message);
    }
    return response;
}

async function getDstQuoteTokenAmount(amount, decimal) {

    // Convert the amount to a number and divide by 10^decimal
    let result = Number(amount) / (10 ** decimal);

    // Format the result to 2 decimal places
    return result.toFixed(2);
}


module.exports = {
    getGasFee,
    getDstQuoteTokenAmount
}