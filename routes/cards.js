var express = require('express');
var app = express();
var router = express.Router();
require('../controller/card.js')();
var constant=require('../constants/card.js');
var Card = require('../models/card.js');
app.locals.cards = []

/* GET cards listing. */
router.get('/', function(req, res) {
  return res.json( app.locals.cards);
});

/* create a Card (accessed at POST http://localhost:3000/cards) */
router
  .post('/',function(req, res) {
    var card = new Card(); // create a new instance of the Card model
    card.name = req.body.name; // set the card name (comes from the request)
    card.cardNumber = req.body.cardNumber; // set the card number (comes from the request)
    card.limit = req.body.limit; // set the card limit (comes from the request)
    card.balance = 0; // set the card balance default as 0
    if (!isValidCreditCard(req.body.cardNumber)) {
      return res.json({ status :0 ,message: constant.INVALID_CARD });
    }
    if (!isValidLimit(req.body.limit)) {
      return res.json({ status :0 ,message: constant.CARD_LIMIT });
    }
    var cardsPre = app.locals.cards;
    cardsPre.push(card);
    app.locals.cards =cardsPre;
    return res.json({ status :1 ,message: constant.CARD_CREATED});
  })




module.exports = router;
