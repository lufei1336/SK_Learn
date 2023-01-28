const mongoose = require('mongoose');

const Product = new mongoose.Schema({
    name: String,
    price: String
});

module.exports = mongoose.model('product', Product);