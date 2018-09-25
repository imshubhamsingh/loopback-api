/**
 * @file File contains Customer Model validation, remote-methods etc.
 * @author Shubham Singh
 */

'use strict';

const { mailUtil, validationUtil } = require('../utils');

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
   * Validating Date of birth of Customer before saving it in datasource
   */
  Customer.observe('before save', (ctx, next) => {
    if (ctx.instance) {
      if (ctx.instance.dob) {
        /**
         * Validate dob to be of formate YYYY-MM-DD
         */
        Customer.validatesFormatOf('dob', {
          with: validationUtil.regexp('dob'),
          message: 'Customer Date of birth should be of format YYYY-MM-DD.'
        });

        /**
         * Validate age of customer to more than 16 years and less than 120 yers
         */
        Customer.validate('dob', validationUtil.ageCheck, {
          message:
            'Customer should be at least 16 years old and must be less than 120 years old.'
        });
      }
    }
    return next();
  });

  /**
   * Function for fetching latest customer added to datasource
   */
  Customer.latest = function(callback) {
    Customer.find(
      {
        order: 'createdAt DESC',
        limit: 1
      },
      (err, user) => {
        callback(null, ...user);
      }
    );
  };

  /**
   * Sending email to Admin with the new Customer detials.
   */
  Customer.observe('after save', (ctx, next) => {
    if (ctx.instance) {
      if (ctx.instance && process.env.NODE_ENV !== 'test') {
        const hostname = ctx.Model.app.get('host');
        const msg = mailUtil.generateMessageToAdmin(
          ctx.instance.email,
          hostname,
          ctx.instance.dob
        );
        mailUtil.sendMailToAdmin(msg, (err, response) => {
          if (!err) {
            next();
          }
        });
      } else {
        next();
      }
    }
  });
};
