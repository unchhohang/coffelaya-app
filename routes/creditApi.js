const express = require('express');
const router = express.Router();
const Bill = require('../models/Bill');
const MoneyGiven = require('../models/MoneyGiven');


//find all credit in Bill collection
router.get('/', (req, res, next) => {
    Bill.find({ status: 'onCredit' })
        .then(data => res.json(data))
        .catch(next)
});

router.get('/debtors', (req, res, next) => {
    Bill.find({ status: "onCredit" }).distinct('debtorName')
        .then(data => res.json(data))
        .catch(next)
})

router.get('/debtorByName/:name', (req, res, next) => {
    let filter = { status: "onCredit", debtorName: req.params.name };

    Bill.find(filter)
        .then(data => res.json(data))
        .catch(next)
})

router.patch('/pay/:billId', (req, res, next) => {
    Bill.findOneAndUpdate(
        { _id: req.params.billId },
        { status: "paid" }
    )
        .then(data => res.json(data))
        .catch(next)
})

//create debtor in MoneyGiven collection
router.post('/moneyGiven/:name', (req, res, next) => {
    MoneyGiven.create({
        debtorName: req.params.name,
        money: 0

    })
        .then(data => res.json(data))
        .catch(err => res.json(err))
})

//get all debtors in MoneyGiven collection
router.get('/moneyGiven/all', (req, res, next) => {
    MoneyGiven.find({})
        .then(data => res.json(data))
        .catch(err => res.json(err));
})

//Delete debtor in MoneyGiven collection
router.delete('/moneyGiven/:name', (req, res, next) => {
    MoneyGiven.findOneAndDelete({ debtorName: req.params.name })
        .then(data => res.json(data))
        .catch(err => res.json(err));
})

//find debtor in MoneyGiven collection
router.get('/moneyGiven/debtor/:name', (req, res, next) => {
    MoneyGiven.findOne({ debtorName: req.params.name })
        .then(data => res.json(data))
        .catch(err => res.json(err));
})

//modify single debtor
router.patch('/moneyGiven/debtor/:name', (req, res, next) => {
    let filter = { debtorName: req.params.name };
    let update = { money: req.body.remaining }

    MoneyGiven.findOneAndUpdate(filter, update)
        .then(data => res.json(data))
        .catch(err => res.json(err))
})

module.exports = router;