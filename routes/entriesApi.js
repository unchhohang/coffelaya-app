const express = require('express');
const router = express.Router();
const Bill = require('../models/Bill');

//find bill with date
router.get('/:startDate/:endDate', (req, res, next) => {
    let startDate = req.params.startDate;
    let endDate = req.params.endDate;

    Bill.find({
        date: {
            $gte: new Date(startDate),
            $lt: new Date(endDate)
        }
    })
        .then(data => res.json(data))
        .catch(next)
});

module.exports = router;