var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var schema = Schema({
userId: { type: String, required: true },
subtotal: { type: Number, required: true },
tax: { type: Number, required: true },
total: { type: Number, required: true }
});
module.exports = mongoose.model('Carrito', schema);