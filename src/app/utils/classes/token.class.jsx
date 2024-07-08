class Token {
    constructor(address, symbol, name, chainId, decimals, logoURI, USDperToken = 0, chainName = '', amount = 0) {
        this.address = address;
        this.symbol = symbol;
        this.name = name;
        this.chainId = chainId;
        this.chainName = chainName;
        this.decimals = decimals;
        this.logoURI = logoURI;
        this.USDperToken = USDperToken;
        this.amount = amount;
    }

    /**
     * @returns {Token}
     */
    static getDefault() {
        return {
            "address": "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
            "symbol": "ETH",
            "name": "ETH",
            "chainId": 1,
            "decimals": 18,
            "logoURI": "https://assets.coingecko.com/coins/images/279/small/ethereum.png?1595348880"
        };
    }

    static getAllPropertyKeys() {
        let keys = new Set();

        // Get static properties
        let staticPrototype = this;
        while (staticPrototype) {
            Object.getOwnPropertyNames(staticPrototype).forEach(key => keys.add(key));
            staticPrototype = Object.getPrototypeOf(staticPrototype);
        }

        // Get instance properties
        let instancePrototype = this.prototype;
        while (instancePrototype) {
            Object.getOwnPropertyNames(instancePrototype).forEach(key => keys.add(key));
            instancePrototype = Object.getPrototypeOf(instancePrototype);
        }

        // Convert Set to Array
        return Array.from(keys);
    }

}

export default Token;