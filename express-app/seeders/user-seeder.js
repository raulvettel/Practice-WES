var mongoose = require('mongoose');
var User = require('../model/user');
var user = {
    id : '0',
    name : 'Raul',
    surname: 'Alarcon',
    address: 'Albacete 02006',
    birth: '1997-05-30',
    email: 'raul@email.com',
    password: 'admin'
};
var uri = 'mongodb://localhost/redbullf1shop';
mongoose.Promise = global.Promise;
var db = mongoose.connection;

db.on('connecting', function () { console.log('Connecting to ', uri);
});
db.on('connected', function () { console.log('Connected to ', uri); });
db.on('disconnecting', function () { console.log('Disconnecting from ',uri); });
db.on('disconnected', function () { console.log('Disconnected from ',uri); });
db.on('error', function (err) { console.error('Error ', err.message);
});

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true
})
.then(function () { return User.deleteMany(); })
.then(function () { return (new User(user)).save() })
.then(function () { return User.find(); })
.then(function (users) { console.log(users); })
.then(function () { mongoose.disconnect(); })
.catch(function (err) { console.error('Error', err.message); });