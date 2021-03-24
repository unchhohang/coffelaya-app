const express = require('express');
const router = express.Router();
const Bill = require('../models/Bill');
const Menu = require('../models/Menus');


//find bills based on status
router.get('/billingStatus', (req, res, next) => {
    Bill.find({ status: "onGoing" })
        .then(data => res.json(data))
        .catch(next)
});

router.get('/billing/:id', (req, res, next) => {
    Bill.findOne({ "_id": req.params.id })
        .then(data => res.json(data))
        .catch(next)
});


router.post('/billing', (req, res, next) => {
    if (req.body) {
        Bill.create({ "tableName": req.body.tableName, "status": req.body.status })
            .then(data => res.json(data))
            .catch(next)
    } else {
        res.json({
            error: "The input field is empty"
        })
    }
});


//Delete Bill
router.delete('/billing/:id', (req, res, next) => {
    Bill.findOneAndDelete({ "_id": req.params.id })
        .then(data => res.json(data))
        .catch(next)
});



router.patch('/billing/noncredit/:id', (req, res, next) => {
    if (req.body) {
        let filter = { "_id": req.params.id };
        let update = {
            "discount": req.body.discount,
            "totalPrice": req.body.totalPrice,
            "paidPrice": req.body.paidPrice,
            "status": req.body.status,
            "date": new Date()
        };


        Bill.findOneAndUpdate(filter, update)
            .then(data => res.json(data))
            .catch(next)
    }
})

router.patch('/billing/credit/:id', (req, res, next) => {
    if (req.body) {
        let filter = { "_id": req.params.id };
        let update = {
            "discount": req.body.discount,
            "debtorName": req.body.debtorName,
            "creditAmount": req.body.creditAmount,
            "totalPrice": req.body.totalPrice,
            "paidPrice": req.body.paidPrice,
            "status": req.body.status,
            "date": new Date()
        };


        Bill.findOneAndUpdate(filter, update)
            .then(data => res.json(data))
            .catch(next)
    }
})

//sub document APIs

//get orderList data by Id
router.get('/billing/orderList/:id', (req, res, next) => {
    Bill.findOne({ "orderList._id": req.params.id })
        .then(data => res.json(data))
        .catch(next)
});

//Add item to order list
router.patch('/billing/orderList/:id', (req, res, next) => {
    let filter = { "_id": req.params.id };

    Bill.updateOne(filter, {
        $push: {
            "orderList":
            {
                item: req.body.item,
                rate: req.body.rate,
                quantity: req.body.quantity,
                itemTotal: req.body.itemTotal
            }
        }
    },
        { upsert: true })
        .then(data => res.json(data))
        .catch(next)



});

//Delete orderList data
router.delete('/billing/orderList/:billId/:orderListId', (req, res, next) => {
    let filter = { _id: req.params.billId };
    let subDocId = req.params.orderListId;

    Bill.findOneAndUpdate(filter, { $pull: { orderList: { _id: subDocId } } })
        .then(data => res.json(data))
        .catch(next)
});

//update orderList item Only
router.patch('/billing/orderList/itemName/:orderId', (req, res, next) => {
    let filter = { "orderList._id": req.params.orderId }

    Bill.findOneAndUpdate(filter,
        {
            "orderList.$.item": req.body.item
        }
        , { upsert: true }).then(data => res.json(data)).catch(next)
});

//update orderList rate only
router.patch('/billing/orderList/rate/:orderId', (req, res, next) => {
    let filter = { "orderList._id": req.params.orderId }

    Bill.findOneAndUpdate(filter,
        {
            "orderList.$.rate": req.body.rate,
        }
        , { upsert: true }).then(data => res.json(data)).catch(next)
});

//update order List quantity only
router.patch('/billing/orderList/quantity/:orderId', (req, res, next) => {
    let filter = { "orderList._id": req.params.orderId }

    Bill.findOneAndUpdate(filter,
        {
            "orderList.$.quantity": req.body.quantity,
        }
        , { upsert: true }).then(data => res.json(data)).catch(next)
});

//get all detors name
router.get('/debtors', (req, res, next) => {
    Bill.distinct('debtorName')
        .then(data => res.json(data))
        .catch(next)
});

//Menu list
router.get('/menu', (req, res, next) => {
    Menu.find({})
        .then(data => res.json(data))
        .catch(next)
})

router.post('/menu', (req, res, next) => {
    Menu.create({ "item": req.body.item, "price": req.body.price })
        .then(data => res.json(data))
        .catch(next)
})

router.delete('/menu/:id', (req, res, next) => {
    Menu.deleteOne({"_id": req.params.id})
        .then(data => res.json(data))
        .catch(next)     
})



module.exports = router;