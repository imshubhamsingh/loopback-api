/**
 * @file File all Unit test related Customer Model API end points.
 * @author Shubham Singh
 */

const { app, expect, api } = require('../common');

const Customer = app.models.Customer;

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
        dob: '2005-10-11'
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
  it('1.2.1 should be able to all Customer details', () => {
    api
      .get('/Customers')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        Customer.find({}, (err, customers) => {
          expect(res.body).to.have.length(customers.length);
        });
      });
  });
});

describe('1.3 GET /Customers/{id}', () => {
  it('1.3.1 should able to get a Customer with an id present in datasource', () => {
    api
      .get('/Customers/3')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {});
  });

  it('1.3.1 should not able to get a Customer with an id not present in datasource', () => {
    api
      .get('/Customers/243')
      .expect('Content-Type', /json/)
      .expect(404)
      .end((err, res) => {});
  });
});
