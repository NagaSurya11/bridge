const { StatusCodes, ReasonPhrases } = require("http-status-codes");
const Response = require('../utils/classes/Response.cjs');
const QuoteRequest = require("../utils/classes/QuoteRequest.cjs");
const BuildTransactionRequest = require("../utils/classes/BuildTransactionRequest.cjs");

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
async function getTokens(req, res, next) {
    if (!req.query['chainId']|| (!req.query['chainName'] && req.query['chainId'] !== 'all')) {
        res.status(StatusCodes.BAD_REQUEST)
            .send(new Response(StatusCodes.BAD_REQUEST, ReasonPhrases.BAD_REQUEST, null));
        return;
    }
    next();
}

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
async function quotes(req, res, next) {
    const quoteRequest = new QuoteRequest(req.body);
    if (!quoteRequest.isAllDefined()) {
        res.status(StatusCodes.BAD_REQUEST)
            .send(new Response(StatusCodes.BAD_REQUEST, ReasonPhrases.BAD_REQUEST, null));
        return;
    }
    next();
}


/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
async function buildTx(req, res, next) {
    const buildTransactionRequest = new BuildTransactionRequest(req.body);
    if (!buildTransactionRequest.isAllDefined()) {
        res.status(StatusCodes.BAD_REQUEST)
            .send(new Response(StatusCodes.BAD_REQUEST, ReasonPhrases.BAD_REQUEST, null));
        return;
    }
    next();
}

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
async function getCurrencyValue(req, res, next) {
    if (req.query['tokenSymbol'] === undefined || req.query['currencyCode'] === undefined) {
        res.status(StatusCodes.BAD_REQUEST)
            .send(new Response(StatusCodes.BAD_REQUEST, ReasonPhrases.BAD_REQUEST, null));
        return;
    }
    next();
}

module.exports = {
    getTokens,
    quotes,
    getCurrencyValue,
    buildTx
}