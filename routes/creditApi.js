const express = require('express');
const router = express.Router();
const Bill = require('../models/Bill');


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

module.exports = router;