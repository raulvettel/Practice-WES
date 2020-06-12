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

router.get('/users/cart', function (req, res, next) {
    model.getShoppingCart()
    .then(function (car) { res.json(car); })
    .catch(function (err) {
    console.error(err);
    res.status(500).json(err);
    })
    });

router.post('/users/signin', function (req, res, next) {
    model.signin(req.body.email, req.body.password)
    .then(function (cars) { res.json(cars);  })
    .catch(function (err) {
    console.error(err);
    res.status(500).json(err);
    })
    });

router.post('/users/signup', function (req, res, next) {
    console.log(req.body);
    var userInfo = {
        name : req.body.name,
        surname : req.body.surname,
        address : req.body.address,
        birth : req.body.birth,
        email : req.body.email,
        password : req.body.password,
        password2 : req.body.password2
      }
    model.signup(userInfo)
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