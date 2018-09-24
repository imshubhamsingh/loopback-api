/**
 * @file File contains Environment Configuration setup.
 * @author Shubham Singh
 */

const path = require('path');
/**
 * Configure environment variable base on env
 */
function envConfig() {
  let result;
  if (process.env.NODE_ENV === 'production') {
    require('dotenv').config({
      path: path.resolve(__dirname, '../env/.env.prod')
    });
  } else if (process.env.NODE_ENV === 'test') {
    require('dotenv').config({
      path: path.resolve(__dirname, '../env/.env.test')
    });
  } else if (process.env.NODE_ENV === 'development') {
    require('dotenv').config({
      path: path.resolve(__dirname, '../env/.env.dev')
    });
  }
}

module.exports = { envConfig };
