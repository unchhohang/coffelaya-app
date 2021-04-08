const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
    item: String,
    price: Number
});

const menuSchema = new Schema({
    title: String,
    items: [itemSchema]
})

const Menu = new mongoose.model('menu', menuSchema);

module.exports = Menu;
