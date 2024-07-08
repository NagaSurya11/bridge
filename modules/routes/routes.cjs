const express = require('express');
const validator = require('../validators/validator.cjs');
const controller = require('../controllers/controller.cjs');

const routes = express.Router();

routes.use((_req, _res, next) => next());

routes.get('/supportedchains', controller.getSupportedChains);
routes.get('/tokens', validator.getTokens, controller.getTokens);
routes.post('/quotes', validator.quotes, controller.quote);
routes.get('/currencyvalue', validator.getCurrencyValue, controller.getCurrencyValue);
routes.post('/buildTx', validator.buildTx, controller.buildTx);

module.exports = routes;