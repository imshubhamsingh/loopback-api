/**
 * @file File all test related to API and Models.
 * @author Shubham Singh
 */
describe('API v1 Testing', () => {
  // Unit test for end points related to Customer Model
  describe(':: UNIT TESTS ::', () => {
    require('./unit/customer.test');
  });

  // Integration test for Customer Model
  describe(':: INTEGRATION TEST ::', () => {
    require('./integration/customer.test');
  });
});
