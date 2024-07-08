const axios = require('axios');

class ApiService {
    constructor(baseURL) {
        this.baseURL = baseURL;
    }

    /**
     *
     * @param { {method: axios.Method, path: string} } requestParams
     * @param { object } queryParams
     * @description communicates with third party api and sends the response
     * @returns { Promise<import('axios').AxiosResponse> }
     */
    requestHandler(requestParams, queryParams) {
        const { method, path } = requestParams;
        let url = path;
        if (queryParams) {
            Object.keys(queryParams).forEach((key, index) => {
                if (typeof queryParams[key] !== 'function') {
                    if (index == 0) {
                        url += `?${key}=${queryParams[key]}`;
                    } else {
                        url += `&${key}=${queryParams[key]}`;
                    }
                }
            });
        }
        return axios.request({
            url,
            method,
            baseURL: this.baseURL,
            responseType: 'json',
            timeout: 60000 // 1 mins
        });
    }
}


module.exports = ApiService;