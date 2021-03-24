const express = require('express');
const router = express.Router();
const Stock = require('../models/stock');

//Get Stock according to date
router.get('/:startDate/:endDate', (req, res, next) => {
    let startDate = req.params.startDate;
    let endDate = req.params.endDate;

    Stock.find({
        date: {
            $gte: new Date(startDate),
            $lt: new Date(endDate)
        }
    }).then(data => res.json(data)).catch(next)
})

//create stock
router.post('/', (req, res, next) => {
    if (req.body) {
        Stock.create({
            stock: req.body.stock,
            cost: req.body.cost,
            date: req.body.date
        })
            .then(data => res.json(data))
            .catch(next)
    }
})

//Delete Stock
router.delete('/:stockId', (req, res, next) => {
    Stock.deleteOne({ _id: req.params.stockId })
        .then(data => res.json(data))
        .catch(next)
})


module.exports = router;