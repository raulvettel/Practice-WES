var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var schema = Schema({
id: { type: String, required: true },
qty: { type: Number, required: false },
pid: { type: String, required: false },
total: { type: Number, required: false }
});
module.exports = mongoose.model('OrderItems', schema);