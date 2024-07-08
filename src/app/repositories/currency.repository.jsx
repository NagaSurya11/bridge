import HttpService from "../services/http.service"

/**
 * @repository
 */
const CurrencyRepository = {

    /**
     *
     * @param { string } tokenSymbol
     * @returns {Promise<number>}
     */
    'getUSDValuePerToken': async (tokenSymbol) => {
        const response = await HttpService.GET('currencyValue', {tokenSymbol, currencyCode: 'USD'});
        if (response.status) {
            return response.data['USD'];
        } else {
            return 0;
        }
    }
}


export default CurrencyRepository;