const { StatusCodes } = require('http-status-codes');

const ApiService = require('./api.service.cjs');
const Response = require('../utils/classes/Response.cjs');

class AbstractCommunicationService extends ApiService {
    constructor(baseURL) {
        super(baseURL);
    }
    /**
    * @function
    * @param { Promise<import('axios').AxiosResponse> } promise
    * @returns { Promise<Response> }
    */
    responseHandler(promise) {
        return new Promise(resolve => {
            promise.then(response => {
                resolve(new Response(response.status, response.statusText, response.data));
            }).catch(reason => {
                resolve(new Response(StatusCodes.INTERNAL_SERVER_ERROR, reason.message, null));
            })
        })
    }
}

module.exports = AbstractCommunicationService;