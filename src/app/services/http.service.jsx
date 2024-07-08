import axios from "axios";
import Response from "../utils/classes/response.class";
import { StatusCodes } from "http-status-codes";

const baseURL = 'http://localhost:3000/api/';

/**
 *
 * @param { string } path
 * @param { object } queryParams
 * @description builds url with query params
 */
function urlBuilder(path, queryParams) {
    if (queryParams) {
        let url = path;
        Object.keys(queryParams).forEach((key, index) => {
            if (typeof queryParams[key] !== 'function') {
                if (index == 0) {
                    url += `?${key}=${queryParams[key]}`;
                } else {
                    url += `&${key}=${queryParams[key]}`;
                }
            }
        });
        return url;
    }
    return path;
}

/**
 *
 * @param { import("axios").Method } method
 * @param { string } url
 * @param { object } queryParams
 * @description communicates with BE
 * @returns { Promise<Response> }
 */
function requestHandler(method, url, queryParams, requestBody) {
    return new Promise(resolve => {
        axios.request({
            method,
            url: urlBuilder(url, queryParams),
            baseURL,
            responseType: 'json',
            data: requestBody,
            timeout: 60000 // 1 mins
        })
        .then(response => {
            if (response.status === StatusCodes.OK) {
                resolve(new Response(true, response.data));
            }
            // show error message
            resolve(new Response(false, null));
        })
        .catch(reason => {
            console.log('reason', reason);
            resolve(reason);
        })
    })

}


const HttpService = {
    /**
     *
     * @param { string } url
     * @param { object } queryParams
     */
    'GET': (url, queryParams = {}) => requestHandler('GET', url, queryParams),
    /**
     *
     * @param { string } url
     * @param { object } requestBody
     * @param { object } queryParams
     */
    'POST': (url, requestBody = {}, queryParams = {}) => requestHandler('POST', url, queryParams, requestBody)
}
export default HttpService;