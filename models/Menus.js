const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MenuSchema = new Schema({
    item: String,
    price: Number
});

const Menu = new mongoose.model('menu', MenuSchema);

module.exports = Menu;
