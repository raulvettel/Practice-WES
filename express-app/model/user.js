var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var schema = Schema({
id: { type: String, required: true },
name: { type: String, required: true },
surname: { type: String, required: true },
address: { type: String, required: true },
//birth: { type: Date, required: true },
email: { type: String, required: true },
password: { type: String, required: true }
});
module.exports = mongoose.model('User', schema);