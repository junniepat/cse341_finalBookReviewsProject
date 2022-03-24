require('dotenv').config()
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const Review = require('../models/review');


// setup
const should = chai.should();
chai.use(chaiHttp);


// tests
describe('reviews', function () {

  // clear database before tests
  beforeEach(async function () {
    await Review.remove({});
  });

  // test get reviews
  describe('getReviews', function () {
      const res = await chai.request(app).get('/reviews')
      res.should.have.status(200);
      res.body.should.have.property('reviews');
    });
  });

});
