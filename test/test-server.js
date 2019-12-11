var expect  = require('chai').expect;
var request = require('request');      
var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../app');
chai.use(chaiHttp);
var constant=require('../constants/card.js');


describe('Status and content', function() {
   describe ('Server page', function() {
       it('check connection', function(done){
           request('http://localhost:8080/', function(error, response, body) {
               expect(response.statusCode).to.equal(200);
               done();
           });
       });

       it('should get API works', function(done) {
           request('http://localhost:8080/cards' , function(error, response, body) {
            expect(response.statusCode).to.equal(200);
               done();
           });
       });

       it('should return card array inn GET API', function(done) {
         request('http://localhost:8080/cards' , function(error, response, body) {
          expect( response.body).to.not.be.null;
             done();
         });
     });

   });

     /*
  * Test the /POST route
  */
  describe('/POST cards', () => {
    it('should not post wrong credit card info', function(done) {
     let card = {
            name: "name",
            cardNumber: "437093859",
            limit: "0"
        }

        chai.request(app)
          .post('/cards')
          .send(card)
          .end(function(err, res){
              expect(res.statusCode).to.equal(200);
              expect(res.body.status).to.equal(0);
              expect(res.body.message).to.equal(constant.INVALID_CARD);
            done();
          });
      });

      it('should not post limit below 0', function(done) {
        let card = {
               name: "name",
               cardNumber: "6958286244",
               limit: "-1"
           }
   
           chai.request(app)
             .post('/cards')
             .send(card)
             .end(function(err, res){
                 expect(res.statusCode).to.equal(200);
                 expect(res.body.status).to.equal(0);
                 expect(res.body.message).to.equal(constant.CARD_LIMIT);
               done();
             });
         });

         it('should post with correct credit card info', function(done) {
            let card = {
                   name: "name",
                   cardNumber: "6958286244",
                   limit: "121"
               }
       
               chai.request(app)
                 .post('/cards')
                 .send(card)
                 .end(function(err, res){
                     expect(res.statusCode).to.equal(200);
                     expect(res.body.status).to.equal(1);
                     expect(res.body.message).to.equal(constant.CARD_CREATED);
                   done();
                 });
             });
});
});