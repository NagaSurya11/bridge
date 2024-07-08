import HttpService from '../services/http.service';
import Chain from '../utils/classes/chain.class';
import QuoteResponse from '../utils/classes/quote-response.class';

/**
 * @repository
 */
const BridgeRepository = {
    /**
     * @function
     * @description retrives supported chains
     * @returns {Promise<Array<Chain>}
     */
    'getSupportedChains': async () => {
        const response = await HttpService.GET('supportedchains');
        if (response.status) {
            return response.data;
        } else {
            return [];
        }
    },
    /**
     * @param {number} chainId
     * @param {string} chainName
     * @returns {Promise<Array<Token>>}
     */
    'getTokenData': async (chainId, chainName) => {
        const response = await HttpService.GET('tokens', { chainId, chainName });
        if (response.status && response.data) {
            return response.data;
        } else {
            return [];
        }
    },
    /**
     *
     * @param {*} srcChainId
     * @param {*} srcQuoteTokenAddress
     * @param {*} srcQuoteTokenAmount
     * @param {*} dstChainId
     * @param {*} dstQuoteTokenAddress
     * @param {*} slippage
     * @returns { Promise<Array<QuoteResponse>> }
     */
    'Quotes': async (srcChainId, srcQuoteTokenAddress,
        srcQuoteTokenAmount, dstChainId, dstQuoteTokenAddress, slippage) => {
        const response = await HttpService.POST('quotes',
            { srcChainId, srcQuoteTokenAddress, srcQuoteTokenAmount, dstChainId, dstQuoteTokenAddress, slippage });
        if (response.status && response.data) {
            return response.data;
        } else {
            return [];
        }
    }
}

export default BridgeRepository;