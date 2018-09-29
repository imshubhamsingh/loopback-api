/**
 * @file File Integration test related Customer Model API end points.
 * @author Shubham Singh
 */

const faker = require('faker');
const { app, expect, api } = require('../common');
const { validationUtil } = require('../../server/utils');

const Customer = app.models.Customer;

const errorMessage = {
  email: 'Customer email should be valid',
  name: 'Customer Name should only consist Roman alphabet',
  age:
    'Customer should be at least 16 years old and must be less than 120 years old',
  date: 'Customer Date of birth should be of format YYYY-MM-DD'
};

const newCustomerTest = customer => {
  let inValidCustomer = customer;

  // Customer with Invalid Email
  inValidCustomer.email = inValidCustomer.email.replace('@', '');
  api
    .post('/Customers')
    .send(inValidCustomer)
    .set('Accept', 'application/json')
    .expect(422)
    .end((err, res) => {
      const error = res.body.error;
      expect(error.message).to.contain(errorMessage.email);
    });

  // Customer with Invalid name
  inValidCustomer.email = customer.email;
  inValidCustomer.name = inValidCustomer.name + '@$#$#@';

  api
    .post('/Customers')
    .send(inValidCustomer)
    .set('Accept', 'application/json')
    .expect(422)
    .end((err, res) => {
      const error = res.body.error;
      expect(error.message).to.contain(errorMessage.name);
    });

  // Customer with Invalid age less than 16
  inValidCustomer.name = customer.name;

  let d = new Date();
  // to Date of Birth of Customer whose age is less than 16
  d.setFullYear(d.getFullYear() - Math.floor(Math.random() * 16));
  inValidCustomer.age = validationUtil.formatDate(d);

  api
    .post('/Customers')
    .send(inValidCustomer)
    .set('Accept', 'application/json')
    .expect(422)
    .end((err, res) => {
      const error = res.body.error;
      expect(error.message).to.contain(errorMessage.age);
    });

  // Customer with Invalid age greater than 120
  d = new Date();
  // to Date of Birth of Customer whose age is greater than 120
  d.setFullYear(d.getFullYear() - Math.floor(Math.random() * 200 + 120));
  inValidCustomer.age = validationUtil.formatDate(d);

  api
    .post('/Customers')
    .send(inValidCustomer)
    .set('Accept', 'application/json')
    .expect(422)
    .end((err, res) => {
      const error = res.body.error;
      expect(error.message).to.contain(errorMessage.age);
    });

  // Valid User
  api
    .post('/Customers')
    .send(customer)
    .set('Accept', 'application/json')
    .expect(200);
};

before(function(done) {
  this.timeout(10000000);
  for (let i = 0; i < 10; i++) {
    const customer = {
      name: faker.name.findName().replace(/[\.\']/g, ''),
      email: faker.internet.email()
    };
    Customer.create(customer);
  }
  done();
});

describe('2. Customer Model Integration Tests', () => {
  it('2.1 should be able to get a Customer with an id, which was not present before, from datasource after adding that many customer', () => {
    Customer.find().then(customers => {
      const index = customers.length - 1;
      const id = customers[index].id;
      const randomid = id + Math.floor(Math.random() * customers.length);
      api
        .get(`/Customers/${randomid}`)
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          const error = res.body.error;
          expect(error.message).to.contain(
            `Unknown "Customer" id "${randomid}`
          );
        });

      for (let i = id + 1; i <= randomid; i++) {
        let d = new Date();
        // to Date of Birth of Customer whose age is greater than 16 and less than 120
        d.setFullYear(d.getFullYear() - Math.floor(Math.random() * 103 + 16));

        const customer = {
          name: faker.name.findName().replace(/[\.\']/g, ''),
          email: faker.internet.email(),
          dob: validationUtil.formatDate(d)
        };
        newCustomerTest(customer);
      }

      api
        .get(`/Customers/${randomid}`)
        .expect('Content-Type', /json/)
        .expect(200)
        .end();
    });
  });
});

after(function() {
  this.timeout(10000000);
  Customer.destroyAll();
});
