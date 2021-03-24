const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderListSchema = new Schema({
    item: String,
    rate: Number,
    quantity: Number
});

// const orderListModel = new mongoose.model('orderList', orderListSchema);

const BillSchema = new Schema({
    tableName: String,
    orderList: [orderListSchema],
    totalPrice: Number,
    discount: Number,
    debtorName: String,
    creditAmount: Number,
    status: String,
    //paid price 
    paidPrice: Number,
    //bill created date
    date: Date
});

const Bill = new mongoose.model('bill', BillSchema);

module.exports = Bill;