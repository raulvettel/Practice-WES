var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var schema = Schema({
idCarro: { type: String, required: false },
pid: { type: String, required: false },
qty: { type: Number, required: false },
total: { type: Number, required: false}, 
price: { type: Number, required: false },
id: { type: String, required: false }
});

module.exports = mongoose.model('ModelItem', schema);