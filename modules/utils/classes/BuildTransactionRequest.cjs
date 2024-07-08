const PostRequestWrapper = require("./PostRequestWrapper.cjs");


class BuildTransactionRequest extends PostRequestWrapper {
    constructor({srcChainId , srcQuoteTokenAddress, srcQuoteTokenAmount, 
        dstChainId, dstQuoteTokenAddress , slippage , receiver , bridgeProvider, srcBridgeTokenAddress, 
        dstBridgeTokenAddress, srcSwapProvider, dstSwapProvider})  {
        super();

        this.srcChainId = srcChainId;
        this.srcQuoteTokenAddress = srcQuoteTokenAddress;
        this.srcQuoteTokenAmount = srcQuoteTokenAmount;
        this.dstChainId = dstChainId;
        this.dstQuoteTokenAddress = dstQuoteTokenAddress;
        this.slippage = slippage;
        this.receiver = receiver;
        this.bridgeProvider = bridgeProvider;
        this.srcBridgeTokenAddress = srcBridgeTokenAddress;
        this.dstBridgeTokenAddress = dstBridgeTokenAddress;
        this.srcSwapProvider = srcSwapProvider;
        this.dstSwapProvider = dstSwapProvider;

    }
}

module.exports = BuildTransactionRequest;