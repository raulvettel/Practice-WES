var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var schema = Schema({
idUsuario: { type: String, required: false },
number: { type: Number, required: false }
});

module.exports = mongoose.model('Counter', schema);