/**
 * @file File all Unit test related Customer Model API end points.
 * @author Shubham Singh
 */

const faker = require('faker');
const { app, expect, api } = require('../common');

const Customer = app.models.Customer;

describe('1. Customer Model Unit Tests', () => {
  before(() => {
    for (let i = 0; i < 10; i++) {
      const customer = {
        name: faker.name.findName().replace(/[\.\']/g, ''),
        email: faker.internet.email()
      };
      Customer.create(customer);
    }
  });
  after(() => {
    Customer.destroyAll();
  });
  describe('1.1 POST /Customers', () => {
    it('1.1.1 should not able to create a customer with invalid name', () => {
      api
        .post('/Customers')
        .send({
          name: 'Shubham Singh',
          email: 'imshubhamsinghgmail.com'
        })
        .set('Accept', 'application/json')
        .expect(422)
        .end((err, res) => {
          const error = res.body.error;
          expect(error.message).to.contain('Customer email should be valid.');
        });
    });
    it('1.1.2 should not able to create a customer with invalid email', () => {
      api
        .post('/Customers')
        .send({
          name: 'Shubham121',
          email: 'imshubhamsingh97@gmail.com'
        })
        .set('Accept', 'application/json')
        .expect(422)
        .end((err, res) => {
          const error = res.body.error;
          expect(error.message).to.contain(
            'Customer Name should only consist Roman alphabet.'
          );
        });
    });

    it('1.1.3 should not able to create a customer with age less than 16', () => {
      api
        .post('/Customers')
        .send({
          name: 'Shubham Singh',
          email: 'imshubhamsingh97@gmail.com',
          dob: '2015-10-11'
        })
        .set('Accept', 'application/json')
        .expect(422)
        .end((err, res) => {
          const error = res.body.error;
          expect(error.message).to.contain(
            'Customer should be at least 16 years old and must be less than 120 years old.'
          );
        });
    });

    it('1.1.4 should not able to create a customer with age more than 120', () => {
      api
        .post('/Customers')
        .send({
          name: 'Shubham Singh',
          email: 'imshubhamsingh97@gmail.com',
          dob: '2205-10-11'
        })
        .set('Accept', 'application/json')
        .expect(422)
        .end((err, res) => {
          const error = res.body.error;
          expect(error.message).to.contain(
            'Customer should be at least 16 years old and must be less than 120 years old.'
          );
        });
    });
  });

  describe('1.2 GET /Customers', () => {
    it('1.2.1 should be able to get all Customer details', () => {
      Customer.find({}, (err, customer) => {
        api
          .get('/Customers')
          .set('Accept', 'application/json')
          .expect(200)
          .end((err, res) => {
            expect(res.body).to.have.length(customer.length);
          });
      });
    });
  });

  describe('1.3 GET /Customers/{id}', () => {
    it('1.3.1 should able to get a Customer with an id present in datasource', () => {
      Customer.find().then(customers => {
        const index = Math.floor(Math.random() * customers.length);
        const id = customers[index].id;
        api
          .get(`/Customers/${id}`)
          .expect('Content-Type', /json/)
          .expect(200)
          .end((err, res) => {
            console.log(res.body);
          });
      });
    });

    it('1.3.2 should not able to get a Customer with an id not present in datasource', () => {
      Customer.find().then(customers => {
        const index = customers.length - 1;
        const id = customers[index].id;
        api
          .get(`/Customers/${id + 1}`)
          .expect('Content-Type', /json/)
          .expect(200)
          .end((err, res) => {
            const error = res.body.error;
            expect(error.message).to.contain(
              `Unknown "Customer" id "${id + 1}`
            );
          });
      });
    });
  });

  describe('1.4 GET /Customers/latest', () => {
    it('1.4.1 should able to get a latest Customer from datasource', () => {
      Customer.find().then(customers => {
        const index = customers.length - 1;
        const id = customers[index].id;
        api
          .get(`/Customers/${id}`)
          .expect('Content-Type', /json/)
          .expect(200)
          .end((err, res) => {
            console.log(res.body);
            expect(res.body).to.contain(customers[index]);
          });
      });
    });
  });
});
