'use strict';

const { validationUtil } = require('../utils');

module.exports = function(Customer) {
  /**
   * Validate name for roman alphabet
   */
  Customer.validatesFormatOf('name', {
    with: validationUtil.regexp('name'),
    message: 'Customer Name should only consist Roman alphabet.'
  });

  /**
   * Validate email
   */
  Customer.validatesFormatOf('email', {
    with: validationUtil.regexp('email'),
    message: 'Customer email should be valid.'
  });

  //   Customer.validatesUniquenessOf('email', {
  //     message: 'User already registered.'
  //   });

  /**
   * Validate dob to be of formate YYYY-MM-DD
   */
  Customer.validatesFormatOf('dob', {
    with: mailUtil.regexp('dob'),
    message: 'Customer Date of birth should be of format YYYY-MM-DD.'
  });

  /**
   * Validate age of customer to more than 16 years and less than 120 yers
   */
  Customer.validate('dob', validationUtil.ageCheck, {
    message:
      'Customer should be at least 16 years old and must be less than 120 years old.'
  });

  /**
   * Function for fetching latest customer added to datasource
   */
  Customer.latest = function(callback) {
    Customer.find(
      {
        order: 'id DESC',
        limit: 1
      },
      (err, user) => {
        callback(null, ...user);
      }
    );
  };
};
