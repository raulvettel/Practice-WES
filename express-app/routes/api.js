var express = require('express');
var router = express.Router();
var model=require('../model/model.js');
/* GET home page. */
router.get('/', function(req, res, next) {
res.send('API base');
});

router.get('/products', function (req, res, next) {
    model.getCars()
    .then(function (cars) { res.json(cars); })
    .catch(function (err) {
    console.error(err);
    res.status(500).json(err);
    })
    });
    
router.get('/products/:pid', function (req, res, next) {
    model.getCar(req.params.pid)
    .then(function (car) { res.json(car); })
    .catch(function (err) {
    console.error(err);
    res.status(500).json(err);
    })
    });

router.post('/cars/:email/:password', function (req, res, next) {
    model.signin(req.params.email, req.params.password)
    .then(function (cars) { res.json(cars); })
    .catch(function (err) {
    console.error(err);
    res.status(500).json(err);
    })
    });

router.post('/cars/:pid', function (req, res, next) {
    console.log(req.params.id);
    model.buy(req.params.id)
    .then(function (cars) { res.json(cars); })
    .catch(function (err) {
    console.error(err);
    res.status(500).json(err);
    })
    });
    

module.exports = router;