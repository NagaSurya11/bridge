const AbstractCommunicationService = require('./abstract.communication.service.cjs');
const { CurrencyDataAPI } = require('../utils/constants/constants.cjs').URLs;


class CurrencyData extends AbstractCommunicationService {
    constructor() {
        super(CurrencyDataAPI.baseURL);
    }
    /**
     *
     * @param { string } tokenSymbol
     * @param { string } currencyCode
     */
    getCurrencyValue(tokenSymbol, currencyCode) {
        return this.responseHandler(
            this.requestHandler(CurrencyDataAPI.getCurrencyValue, {fsym: tokenSymbol, tsyms: currencyCode}));
    }
}

module.exports = CurrencyData;
