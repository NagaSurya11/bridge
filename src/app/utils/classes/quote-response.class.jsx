class QuoteResponse {
    constructor(bridgeProvider, srcBridgeTokenAddress, dstBridgeTokenAddress,
        srcSwapProvider, dstSwapProvider, srcQuoteTokenUsdValue, dstQuoteTokenUsdValue, dstQuoteTokenAmount, transactionCounts, bridgeFee) {
        this.bridgeProvider = bridgeProvider;
        this.srcBridgeTokenAddress = srcBridgeTokenAddress;
        this.dstBridgeTokenAddress = dstBridgeTokenAddress;
        this.srcSwapProvider = srcSwapProvider;
        this.dstSwapProvider = dstSwapProvider;
        this.srcQuoteTokenUsdValue = srcQuoteTokenUsdValue;
        this.dstQuoteTokenUsdValue = dstQuoteTokenUsdValue;
        this.dstQuoteTokenAmount = dstQuoteTokenAmount;
        this.transactionCounts = transactionCounts;
        this.bridgeFee = bridgeFee;
    }
}

export default QuoteResponse;