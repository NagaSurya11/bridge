const { StatusCodes } = require("http-status-codes");

const Response = require('../utils/classes/Response.cjs');
const QuoteRequest = require('../utils/classes/QuoteRequest.cjs');
const BuildTransactionRequest = require('../utils/classes/BuildTransactionRequest.cjs');
const BridgeService = require('../services/bridge.service.cjs');
const CurrencyDataService = require('../services/currency.data.service.cjs');

const bridgeService = new BridgeService();
const currencyDataService = new CurrencyDataService();

/**
 *
 * @param {import('express').Request} _req
 * @param {import('express').Response} res
 */
async function getSupportedChains(_req, res) {
    try {
        const response = await bridgeService.getSupportedChains();
        res.status(response.statusCode).send((response.statusCode === StatusCodes.OK ? response.data : response.message));
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR)
            .send(new Response(StatusCodes.INTERNAL_SERVER_ERROR, error.message, null));
    }
}

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
async function getTokens(req, res) {
    try {
        const { chainId, chainName } = req.query;
        let response;
        if (chainId === 'all') {
            response = await bridgeService.getAllTokens();
        } else {
            response = await bridgeService.getTokens(chainId);
            if (response.data && response.data.length > 1) {
                response.data = response.data.map(obj => ({ ...obj, chainName }));
            }
        }
        res.status(response.statusCode).send((response.statusCode === StatusCodes.OK ? response.data : response.message));
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR)
            .send(new Response(StatusCodes.INTERNAL_SERVER_ERROR, error.message, null));
    }
}

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
async function quote(req, res) {
    try {
        const quoteRequest =
            new QuoteRequest(req.body);
        const response = await bridgeService.getRoutesForQuote(quoteRequest);
        res.status(response.statusCode).send((response.statusCode === StatusCodes.OK ? response.data : response.message));
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR)
            .send(new Response(StatusCodes.INTERNAL_SERVER_ERROR, error.message, null));
    }
}

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
async function getCurrencyValue(req, res) {
    try {
        const { tokenSymbol, currencyCode } = req.query;
        const response = await currencyDataService.getCurrencyValue(tokenSymbol, currencyCode);
        res.status(response.statusCode).send((response.statusCode === StatusCodes.OK ? response.data : response.message));
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR)
            .send(new Response(StatusCodes.INTERNAL_SERVER_ERROR, error.message, null));
    }
}

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
async function buildTx(req, res) {
    try {
        const buildTransactionRequest =
            new BuildTransactionRequest(req.body);
        const response = await bridgeService.buildTx(buildTransactionRequest);
        res.status(response.statusCode).send((response.statusCode === StatusCodes.OK ? response.data : response.message));
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR)
            .send(new Response(StatusCodes.INTERNAL_SERVER_ERROR, error.message, null));
    }
}



module.exports = {
    getSupportedChains,
    getTokens,
    quote,
    buildTx,
    getCurrencyValue
}