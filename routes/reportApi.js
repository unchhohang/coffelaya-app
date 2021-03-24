const express = require('express')
const router = express.Router()
const Bill = require('../models/Bill')
const Stock = require('../models/stock')

//get sold total
router.get('/sold/:startDate/:endDate', (req, res, next) => {
    let startDate = req.params.startDate;
    let endDate = req.params.endDate;

    Bill.find({
        date: {
            $gte: new Date(startDate),
            $lt: new Date(endDate)
        }
    }).then(data => res.json(data))
        .catch(next)
})

//get expenses stock
router.get('/stock/:startDate/:endDate', (req, res, next) => {
    let startDate = req.params.startDate;
    let endDate = req.params.endDate;

    Stock.find({
        date: {
            $gte: new Date(startDate),
            $lt: new Date(endDate)
        }
    })
        .then(data => res.json(data))
        .catch(next)

})

//given credit cash of the following day
router.get('/credit/:startDate/:endDate', (req, res, next) => {
    let findStatus = 'onCredit';
    let startDate = req.params.startDate;
    let endDate = req.params.endDate;

    let filter = {
        status: findStatus,
        date: {
            $gte: new Date(startDate),
            $lt: new Date(endDate)
        }
    }

    Bill.find(filter)
        .then(data => res.json(data))
        .catch(next)
})

//CreditView

//get all creditors paid and unpaid
router.get('/creditView/debtorNames', (req, res, next) => {
    Bill.distinct('debtorName')
        .then(data => res.json(data))
        .catch(next)
})

//get debtor unpaid
router.get('/creditView/unpaid/:debtorName', (req, res, next) => {
    let filter = {
        debtorName: req.params.debtorName.toUpperCase(),
        status: 'onCredit'
    }

    Bill.find(filter)
        .then(data => res.json(data))
        .catch(next)
})

//get debtor paid
router.get('/creditView/paid/:debtorName', (req, res, next) => {
    let filter = {
        debtorName: req.params.debtorName.toUpperCase(),
        status: 'paid'
    }

    Bill.find(filter)
        .then(data => res.json(data))
        .catch(next)
})

module.exports = router;