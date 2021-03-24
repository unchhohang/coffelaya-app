const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StockSchema = new Schema({
    stock: String,
    cost: Number,
    date: Date
});

const Stock = new mongoose.model('stock', StockSchema);

module.exports = Stock;