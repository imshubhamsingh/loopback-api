/**
 * @file File all Unit test related Customer Model API end points.
 * @author Shubham Singh
 */

const faker = require('faker');
const sinon = require('sinon');
const { app, expect, api } = require('../common');

const Customer = app.models.Customer;

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

describe('1. Customer Model Unit Tests', () => {
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

    it('1.1.4 should not able to create a customer with age less than 16', () => {
      api
        .post('/Customers')
        .send({
          name: 'Shubham Singh',
          email: 'imshubhamsingh97@gmail.com',
          dob: '1997/10/11'
        })
        .set('Accept', 'application/json')
        .expect(422)
        .end((err, res) => {
          const error = res.body.error;
          expect(error.message).to.contain(
            'Customer Date of birth should be of format YYYY-MM-DD.'
          );
        });
    });

    it('1.1.5 should not able to create a customer with age more than 120', () => {
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

    it('1.1.6 should able to create a customer without giving a date of birth', () => {
      const user = {
        name: 'Shubham Singh',
        email: `imshubhamsingh97@gmail.com`
      };
      api
        .post('/Customers')
        .send(user)
        .set('Accept', 'application/json')
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.contain(user);
        });
    });

    it('1.1.7 should able to create a customer with a date of birth', () => {
      const user = {
        name: 'Raj Singh',
        email: `imshubhamsingh97@gmail.com`,
        dob: '1995-01-13'
      };
      api
        .post('/Customers')
        .send(user)
        .set('Accept', 'application/json')
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.contain(user);
        });
    });

    // it('1.1.7 trigers `before save` hook on Customer model before saving the customer', () => {
    //   // Not sure how to test hooks
    //     let observer = sinon.stub(Customer, 'observe');
    //     observer.yields();
    //     let callBack = sinon.spy();
    //     const userDetails = {
    //       name: 'Shubham Singh',
    //       email: 'imshubhamsingh97@gmail.com',
    //       dob: '1997-01-13'
    //     };
    //     Customer.observe(userDetails, callBack);
    //     observer.restore();
    // });
  });

  describe('1.2 GET /Customers', () => {
    it('1.2.1 should be able to get all Customer details', () => {
      Customer.find({}, (err, customers) => {
        api
          .get('/Customers')
          .set('Accept', 'application/json')
          .expect(200);
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
          .end();
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

    // it('1.3.3 should be able to get a Customer with an id, which was not present before, from datasource after adding that many customer', () => {
    //   Customer.find().then(customers => {
    //     const index = customers.length - 1;
    //     const id = customers[index].id;
    //     const randomid = id + Math.floor(Math.random() * customers.length);
    //     api
    //       .get(`/Customers/${randomid}`)
    //       .expect('Content-Type', /json/)
    //       .expect(200)
    //       .end((err, res) => {
    //         const error = res.body.error;
    //         expect(error.message).to.contain(
    //           `Unknown "Customer" id "${randomid}`
    //         );
    //       });

    //     for (let i = id + 1; i <= randomid; i++) {
    //       const customer = {
    //         name: faker.name.findName().replace(/[\.\']/g, ''),
    //         email: faker.internet.email()
    //       };
    //       Customer.create(customer);
    //     }

    //     api
    //       .get(`/Customers/${randomid}`)
    //       .expect('Content-Type', /json/)
    //       .expect(200)
    //       .end();
    //   });
    // });
  });

  describe('1.4 GET /Customers/latest', () => {
    it('1.4.1 should able to get a latest Customer from datasource', () => {
      Customer.latest((err, customer) => {
        api
          .get(`/Customers/${customer.id}`)
          .expect('Content-Type', /json/)
          .expect(200)
          .end((err, res) => {
            expect(res.body).to.contain(customer);
          });
      });
    });
  });
});

after(function() {
  this.timeout(10000000);
  Customer.destroyAll();
});
