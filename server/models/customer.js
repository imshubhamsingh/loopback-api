'use strict';

module.exports = function(Customer) {
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
