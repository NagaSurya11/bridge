const PostRequestWrapper = require("./PostRequestWrapper.cjs");

class QuoteRequest extends PostRequestWrapper{

    constructor({srcChainId, srcQuoteTokenAddress, srcQuoteTokenAmount, dstChainId, dstQuoteTokenAddress, slippage}) {
        super();
        this.srcChainId = srcChainId;
        this.srcQuoteTokenAddress = srcQuoteTokenAddress;
        this.srcQuoteTokenAmount = srcQuoteTokenAmount;
        this.dstChainId = dstChainId;
        this.dstQuoteTokenAddress = dstQuoteTokenAddress;
        this.slippage = slippage;
    }
}

module.exports = QuoteRequest;

