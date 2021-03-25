const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const MoneyGivenSchema = new Schema({
    debtorName: String,
    money: Number
});

const MoneyGiven = new mongoose.model('moneyGiven', MoneyGivenSchema);

module.exports = MoneyGiven;