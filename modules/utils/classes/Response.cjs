const { StatusCodes } = require("http-status-codes");
/**
 * @class
 */
class Response {
    /**
     * @param { StatusCodes } statusCode
     * @param { string } message
     * @param { * } data
     */
    constructor (statusCode, message, data) {
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
    }
}

module.exports = Response;