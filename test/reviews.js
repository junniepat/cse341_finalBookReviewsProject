require('dotenv').config()
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const Review = require('../models/review');
const User = require('../models/user');


// setup
const should = chai.should();
chai.use(chaiHttp);


// tests
describe('reviews', function () {

  beforeEach(async function () {
    // clear and create reviews
    await Review.deleteMany({});
    const review = new Review({
      username: 'darcee',
      title: 'test title',
      content: 'awesome content',
      author: 'tq',
      rating: 1,
      reviewSummary: 'great book'
    });
    await review.save();

    // clear and create user
    await User.deleteMany({});
    const credentials = {email: 'darcee@byui.edu', password: 'test123'}
    const res = await chai.request(app).post('/signup').send({
      firstName: 'darcee',
      lastName: 'quebe',
      email: credentials.email,
      username: 'darceeq',
      password: credentials.password
    })
    const user = res.body.userId;
    res.should.have.status(201);

    // pass data to test
    this.data = {review: review, user: user, credentials: credentials};
  });

  // test get reviews
  describe('getReviews', function () {

    it('should get reviews', async function() {
      const res = await chai.request(app).get('/reviews');
      res.should.have.status(200);
      res.body.should.have.property('reviews');
      res.body.reviews[0].username.should.equal('darcee');
    });

  });

  describe('getReview', function () {

    it('should get review', async function() {
      const res = await chai.request(app).get('/review/' + this.data.review.id);
      res.should.have.status(200);
      res.body.should.have.property('review');
      res.body.review.username.should.equal('darcee');
    });

  });

  describe('deleteReview', function () {

    it('should delete review', async function() {
      const auth = await chai.request(app).post('/login').send(this.data.credentials);
      const token = auth.body.token;
      const res = await chai.request(app).delete('/review/' + this.data.review.id).set('Authorization', 'Bearer ' + token);
      res.should.have.status(200);
      res.body.should.have.property('review');
      res.body.review.username.should.equal('darcee');
      const count = await Review.count();
      count.should.equal(0);
    });

    // it('should be protected', async function() {
    //   const res = await chai.request(app).get('/reviews')
    //   res.should.have.status(401);
    // });
  });

});
