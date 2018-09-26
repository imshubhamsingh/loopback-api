//Setup dev dependencies
const chai = require('chai');
const supertest = require('supertest');
const api = supertest('http://localhost:3001/api');
const app = require('../server/server');
const expect = chai.expect;

module.exports = {
  app,
  expect,
  supertest,
  api
};
