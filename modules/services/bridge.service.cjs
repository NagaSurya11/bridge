const { getGasFee, getDstQuoteTokenAmount } = require('./bridge.service.util.cjs');

const { StatusCodes, ReasonPhrases } = require('http-status-codes');
const Response = require('../utils/classes/Response.cjs')

const QuoteRequest = require('../utils/classes/QuoteRequest.cjs');
const AbstractCommunicationService = require('./abstract.communication.service.cjs');
const { XYFinanceAPI } = require('../utils/constants/constants.cjs').URLs;


class BridgeService extends AbstractCommunicationService {
    constructor() {
        super(XYFinanceAPI.baseURL);
    }

    /**
    * @override
    * @description overrides the response handler of AbstractCommunicationService
    * @param { Promise<import('axios').AxiosResponse> } promise
    * @param { string } type // response type
    * @returns { Promise<Response> }
    */
    responseHandler(promise, type) {
        let data = null;
        return new Promise(resolve => {
            promise.then(response => {
                if (response.data['success']) {
                    data = response.data[type];
                }
                resolve(new Response(response.status, response.statusText, data));
            }).catch(reason => {
                resolve(new Response(StatusCodes.INTERNAL_SERVER_ERROR, reason.message, null));
            })
        });
    }

    /**
     * @description get the supported block chains from XYFinance server
     */
    getSupportedChains() {
        return this.responseHandler(
            this.requestHandler(XYFinanceAPI.getSupportedChains), XYFinanceAPI.getSupportedChains.type);
    }

    getAllTokens() {
        let data = [];
        return new Promise(resolve => {
            this.getSupportedChains()
                .then(async response => {
                    if (response.data !== null) {
                        for (let chain of response.data) {
                            const res = await this.getTokens(chain.chainId);
                            if (res.data !== null) {
                                res.data.forEach(obj => {
                                    data.push({ ...obj, chainName: chain.name });
                                })
                            }
                        }
                        resolve(new Response(StatusCodes.OK, ReasonPhrases.OK, data));
                    }
                }).catch(reason => {
                    resolve(new Response(StatusCodes.INTERNAL_SERVER_ERROR, reason.message, null));
                })
        })
    }

    /**
     * @param { number } chainId
     * @description get the tokens respective to the provided chainId
     */
    getTokens(chainId) {
        return this.responseHandler(this.requestHandler(XYFinanceAPI.getTokens, { chainId }), XYFinanceAPI.getTokens.type);
    }

    /**
     *
     * @param {QuoteRequest} quoteRequest
     * @description sends the routes available for swap
     */
    async getRoutesForQuote(quoteRequest) {
        const quoteResponse = await this.responseHandler(this.requestHandler(XYFinanceAPI.getRoutesForQuote, quoteRequest), XYFinanceAPI.getRoutesForQuote.type);
        let data = [];
        if (quoteResponse.data && quoteResponse.data.length > 0) {
            for (const route of quoteResponse.data) {
                data.push({
                    bridgeProvider: route?.bridgeDescription?.provider ?? null,
                    srcBridgeTokenAddress: route?.bridgeDescription?.srcBridgeTokenAddress ?? null,
                    dstBridgeTokenAddress: route?.bridgeDescription?.dstBridgeTokenAddress ?? null,
                    srcSwapProvider: route?.srcSwapDescription?.provider ?? null,
                    dstSwapProvider: route?.dstSwapDescription?.provider ?? null,
                    srcQuoteTokenUsdValue: route?.srcQuoteTokenUsdValue ?? 0,
                    dstQuoteTokenUsdValue: route?.dstQuoteTokenUsdValue ?? 0,
                    transactionCounts: route?.transactionCounts ?? 0,
                    dstQuoteTokenAmount: await getDstQuoteTokenAmount(route?.dstQuoteTokenAmount ?? 0, route?.dstQuoteToken?.decimals ?? 0) ?? 0,
                    bridgeFee: await getGasFee(route?.estimatedGas, route?.srcQuoteToken?.chainId, route?.srcQuoteToken?.symbol, 'USD')
                })
            }
        }
        return new Response(quoteResponse.statusCode, quoteResponse.message, data);
    }

    async buildTx(buildTransactionRequest) {
        return this.responseHandler(this.requestHandler(XYFinanceAPI.buildTx, buildTransactionRequest));
    }
}

module.exports = BridgeService;