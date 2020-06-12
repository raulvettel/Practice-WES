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

router.get('/users/:uid/cart', function (req, res, next) {
    model.getShoppingCart(req.params.uid)
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

router.post('/users/cart/items/:pid', function (req, res, next) {
    model.buy(req.params.pid)
    .then(function (cars) { res.json(cars); })
    .catch(function (err) {
    console.error(err);
    res.status(500).json(err);
    })
    });
    
router.get('/cart/items', function (req, res, next) {
    model.getItems()
    .then(function (cars) { res.json(cars); })
    .catch(function (err) {
    console.error(err);
    res.status(500).json(err);
    })
    });

router.get('/users/userLogged', function (req, res, next) {
    model.getUserLogged()
    .then(function (cars) { res.json(cars); })
    .catch(function (err) {
    console.error(err);
    res.status(500).json(err);
    })
    });

router.get('/users/:id', function (req, res, next) {
    model.getUser(req.params.id)
    .then(function (car) { res.json(car); })
    .catch(function (err) {
    console.error(err);
    res.status(500).json(err);
    })
    });

router.get('/cart/itemCount', function (req, res, next) {
    model.cartItemCount()
    .then(function (car) { res.json(car); })
    .catch(function (err) {
    console.error(err);
    res.status(500).json(err);
    })
    });

router.delete('/users/cart/items/:pid', function (req, res, next) {
    model.removeAllCartItem(req.params.pid)
    .then(function (car) { res.json(car); })
    .catch(function (err) {
    console.error(err);
    res.status(500).json(err);
    })
    });

router.delete('/users/cart/items/:pid/decrease', function (req, res, next) {
    model.removeOneCartItem(req.params.pid)
    .then(function (car) { res.json(car); })
    .catch(function (err) {
    console.error(err);
    res.status(500).json(err);
    })
    });

router.post('/users/orders', function (req, res, next) {
    var userInfo = {
        name : req.body.name,
        surname : req.body.surname,
        address : req.body.address,
        birth : req.body.birth,
        email : req.body.email,
        password : req.body.password,
        password2 : req.body.password2
        }
    model.checkOut(userInfo, req.body.item)
    .then(function (cars) { res.json(cars); })
    .catch(function (err) {
    console.error(err);
    res.status(500).json(err);
    })
    });

router.get('/order', function (req, res, next) {
    model.getOrders()
    .then(function (cars) { res.json(cars); })
    .catch(function (err) {
    console.error(err);
    res.status(500).json(err);
    })
    });

router.get('/users/orders/:number', function (req, res, next) {
    model.getOrder(req.params.number)
    .then(function (car) { res.json(car); })
    .catch(function (err) {
    console.error(err);
    res.status(500).json(err);
    })
    });

router.get('/users/orders/:number/items', function (req, res, next) {
    model.getOrderItems(req.params.number)
    .then(function (car) { res.json(car); })
    .catch(function (err) {
    console.error(err);
    res.status(500).json(err);
    })
    });

module.exports = router;