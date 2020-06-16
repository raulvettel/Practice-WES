var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var schema = Schema({
number: { type: String, required: true },
date: { type: Date, required: false },
ident: { type: String, required: false },
address: { type: String, required: false },
subtotal: { type: Number, required: false },
tax: { type: Number, required: false },
total: { type: Number, required: false },
cardHolder: { type: String, required: false },
cardNumber: { type: String, required: false }
});
module.exports = mongoose.model('Order', schema);