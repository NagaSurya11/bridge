const request = require('supertest');
const express = require('express');
const controller = require('../controllers/controller.cjs');
const validator = require('../validators/validator.cjs');

const app = express();

app.get('/api/supportedchains', controller.getSupportedChains);
app.get('/api/tokens', validator.getTokens, controller.getTokens);

describe('GET /api/supportedchains', () => {
  it('should return list of supported tokens', async () => {
    const response = await request(app).get('/api/supportedchains');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    response.body.forEach(chain => {
      expect(chain).toHaveProperty('chainId');
      expect(chain).toHaveProperty('name');
      expect(typeof chain.chainId).toBe('number');
      expect(typeof chain.name).toBe('string');
    });
  });
});


describe('GET /api/tokens', () => {
  it('should return Bad request', async () => {
    const response = await request(app).get('/api/tokens');
    expect(response.status).toBe(400); // bad request
  });
});

describe('GET /api/tokens', () => {
  it('should return list of tokens', async () => {
    const response = await request(app).get('/api/tokens?chainId=1&chainName=Ethereum');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    response.body.forEach(chain => {
      expect(chain).toHaveProperty('chainId');
      expect(chain).toHaveProperty('chainName');
      expect(typeof chain.chainId).toBe('number');
      expect(typeof chain.chainName).toBe('string');
      expect(typeof chain.address).toBe('string');
      expect(typeof chain.name).toBe('string');
      expect(typeof chain.decimals).toBe('number');
      expect(typeof chain.logoURI).toBe('string');
    });
  });
});

