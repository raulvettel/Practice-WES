const { use } = require("../routes/api");
var Car = require('./car');
var User = require('../model/user')
var Carrito = require('../model/shoppingcart')
var Order = require('../model/order')
var OrderItems = require('../model/orderItems')
var ModelItems = require('../model/modelItem')
var Counter = require('../model/counter')
var Model = {}


Model.user= [{id : "null"}]


Model.getCars = function () {
    return Car.find();
}
        
Model.getCar = function (id) {
    return new Promise(function (resolve, reject) {
        return Car.findOne({ idAux: id })
        .then(function (car) {
        if (!car) reject('Car not found');
        else resolve(car);
        })
        });
}

Model.signin = function (email2, password) {
return new Promise(function (resolve, reject) {
 return User.findOne({ email: email2 })
 .then(function (user) {
 if (!user) reject('Email not found');
 else if (user.password != password) reject('Password mismatch')
 else{
     Model.user[0].id = user.id
    resolve(user);
 } 
 })
 });
 }


Model.getUser = function (id) {
    return new Promise(function (resolve, reject) {
        return User.findOne({ id: id })
        .then(function (user) {
        if (!user) reject('User not found');
        else resolve(user);
        })
        });
}
Model.signup = function(userInfo){
    var x = false;
    return new Promise(function (resolve, reject) {
        if (userInfo.name.length < 1 || userInfo.address.length < 1 || userInfo.birth.length < 1 || userInfo.email.length < 1 ||
            userInfo.surname.length < 1 || userInfo.password.length < 1 || userInfo.password2.length < 1){
                reject('All fields must be completed');
                x = true;
            }
        User.find().then(function (user) {
        var i = 0
        while (i < user.length){
            if (user[i].email == userInfo.email){
                reject('This email is already exits');
                x = true;
            }
            i++;
        }
    });
        if(userInfo.password != userInfo.password2){
            reject('Passwords dont match')
            x = true;
        }
        if(x == false){
            var user = ({
                id: Date.now(), 
                name: userInfo.name,
                surname: userInfo.surname,
                email: userInfo.email,
                birth: userInfo.birth,
                address: userInfo.address,
                password: userInfo.password
            })
            new User(user).save();
            var carrito = ({
                userId: user.id,
                subtotal: 0.00,
                tax: 1.21,
                total: 0.00
            })
            new Carrito(carrito).save();
            var order = ({
                number: user.id,
                date : undefined,
                ident : undefined,
                address : undefined,
                subtotal: undefined,
                tax : undefined,
                total : undefined,
                cardHolder : undefined,
                cardNumber : undefined
            })
            new Order(order).save();
            var counter = ({
                idUsuario: user.id,
                number : 0
            })
            new Counter(counter).save();
            resolve('Correcto')
        }
    });
}

Model.getShoppingCart = function (uid) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
        Carrito.find().then(function (shoppingCart) {
        var i = 0;
        while (i < shoppingCart.length){
            if (shoppingCart[i].userId == uid){
                resolve(shoppingCart[i])
            } 
            else if (i == shoppingCart.length-1){            
                reject('Cart not found');
            }
            i++;  
        
        }
      });
        }, 200);    
        }); 
}

Model.getItems = function (uid) {
    return new Promise(function (resolve, reject) {
    return ModelItems.find().then(function (items) {
        if (items.length < 1) resolve([])
        else{
            var i = 0;
            var result = [];
            while (i < items.length){
                if(items[i].idCarro == uid){
                    result.push({
                        idCarro: items[i].idCarro,
                        pid : items[i].pid,
                        qty : items[i].qty,
                        total : items[i].total,
                        price : items[i].price,
                        id : items[i].id
                    })
                }
                if(i == items.length-1){
                    if (result.length > 0) resolve(result)
                    else reject ('Error')
                }
                i++;
            }
        }
        });
    });
}


Model.getUserLogged = function () {
    return new Promise(function (resolve, reject) {
    setTimeout(function () {
    resolve(Model.user[0].id)
    }, 200);
    });
}

Model.buy = function (pid, uid) {
    return new Promise(function (resolve, reject) {
        Model.getCar(pid).then(function(result2){
            info = result2
            Model.getShoppingCart(uid).then(function(result){
            carro = result
        carro.subtotal = carro.subtotal + info.price;
        carro.total = carro.total + (carro.tax * info.price);
        Carrito(carro).save();
        ModelItems.find().then(function (item) {
        var i = 0;
        if (item.length < 1){
            var mItem = ({
                idCarro : carro.userId,
                pid : info.name,
                qty : 1,
                total : info.price,
                price: info.price,
                id : info.idAux
            })
            ModelItems(mItem).save();
        }
        else{
            while (i < item.length){
                if (item[i].price == info.price){
                    item[i].qty += 1;
                    item[i].total = item[i].qty * info.price
                    ModelItems(item[i]).save();
                    break;
                }
                else if(i == item.length-1 && item[i].price != info.price){
                    var mItem = ({
                        idCarro : carro.userId,
                        pid : info.name,
                        qty : 1,
                        total : info.price,
                        price: info.price,
                        id : info.idAux
                    })
                    ModelItems(mItem).save();
                    break;
                }
                i++;
            }
        }
    });

    Counter.find().then(function (contador) {
        var i = 0;
        while(i < contador.length){
            if(contador[i].idUsuario == uid){
                contador[i].number += 1;
            Counter(contador[i]).save();
            }
            i++;
        }
        })
        resolve('Product added!');
        });   
});
});
}

Model.cartItemCount = function (id) {
    return new Promise(function (resolve, reject) {
        return Counter.findOne({ idUsuario: id })
        .then(function (car) {
        if (car == 'null') resolve(0)
        else resolve(car);
        })
        });
}

Model.removeAllCartItem = function (pid,uid){
    return new Promise(function (resolve, reject) {
        var i = 0;
        ModelItems.find().then(function(item) {
        while (i < item.length){
            var itemAux = item[i]
            if(item[i].id == pid){
                Model.getShoppingCart(uid).then(function (shoppingCart) {
                shoppingCart.subtotal -= itemAux.price * itemAux.qty;
                shoppingCart.total = shoppingCart.tax * shoppingCart.subtotal;
                Carrito(shoppingCart).save();
                Counter.findOne({ idUsuario: uid }).then(function (contador) {
                contador.number -= itemAux.qty;
                Counter(contador).save();
                })
                ModelItems.findByIdAndRemove(itemAux._id).then(function (err) {
                    console.log(err)
                })
                resolve('Correct')
                })
            }
            i++;
        }
    });
        });

}

Model.removeOneCartItem = function (pid,uid){
    return new Promise(function (resolve, reject) {
        var i = 0;
        ModelItems.find().then(function(item) {
        while (i < item.length){
            if(item[i].id == pid){
                var itemAux = item[i]
                if(item[i].qty <= 1){
                    Model.getShoppingCart(uid).then(function (shoppingCart) {
                    shoppingCart.subtotal -= itemAux.price;
                    shoppingCart.total = shoppingCart.tax * shoppingCart.subtotal;
                    Counter.findOne({ idUsuario: uid }).then(function (contador) {
                        contador.number -= 1;
                        Counter(contador).save();
                        })
                    ModelItems.findByIdAndRemove(itemAux._id).then(function (err) {
                        console.log(err)
                    })
                    Carrito(shoppingCart).save();
                    });
                    resolve('Correct')
                }
                else{
                    Model.getShoppingCart(uid).then(function (shoppingCart) {
                    itemAux.qty -= 1;
                    itemAux.total = itemAux.qty * itemAux.price;
                    ModelItems(itemAux).save();
                    shoppingCart.subtotal -= itemAux.price;
                    shoppingCart.total = shoppingCart.tax * shoppingCart.subtotal
                    Counter.findOne({ idUsuario: uid }).then(function (contador) {
                        contador.number -= 1;
                        Counter(contador).save();
                        })
                    Carrito(shoppingCart).save();
                    });
                    resolve('Correct')
                }

            }
            i++;
        }
    });
    });

}


Model.checkOut = function (orderInfo,item,uid){
    return new Promise(function (resolve,reject){
        var i = 0;
        var x = 0;
        Order.find().then(function (orders) {
        while (i < orders.length){
            if(orders[i].number == orderInfo.idUsuario && orders[i].ident == undefined){
                orders[i].ident = Date.now();
                orders[i].date = orderInfo.date;
                orders[i].address = orderInfo.address;
                orders[i].subtotal = orderInfo.subtotal;
                orders[i].tax = orderInfo.tax;
                orders[i].total = orderInfo.total;
                orders[i].cardHolder = orderInfo.cardHolder;
                orders[i].cardNumber = orderInfo.cardNumber;
                Order(orders[i]).save();
                while(x < item.length){
                    var oI = ({
                        id : orders[i].ident,
                        qty : item[x].qty,
                        pid : item[x].pid,
                        total : item[x].total
                    });
                    OrderItems(oI).save();
                    x++;
                }
                
                
            }
            else if (orders[i].number == orderInfo.idUsuario && i == orders.length-1){
                var order = ({
                ident : Date.now(),
                date : orderInfo.date,
                address : orderInfo.address,
                subtotal : orderInfo.subtotal,
                tax : orderInfo.tax,
                total : orderInfo.total,
                cardHolder : orderInfo.cardHolder,
                cardNumber : orderInfo.cardNumber,
                number : uid
                })
                Order(order).save();
                while(x < item.length){
                    var oI = ({
                        id : order.ident,
                        qty : item[x].qty,
                        pid : item[x].pid,
                        total : item[x].total
                    });
                    OrderItems(oI).save();
                    x++;
                }
                

            }
                Counter.findOne({ idUsuario: uid }).then(function (contador) {
                contador.number = 0;
                Counter(contador).save();
                })
                Model.getShoppingCart(Model.user[0].id).then(function (shoppingCart) {
                    if (shoppingCart.userId == orderInfo.idUsuario){
                        shoppingCart.total = 0
                        shoppingCart.subtotal = 0
                        Carrito(shoppingCart).save();
                    }  
                })
                i++;
            }
            resolve(orders)
            return ModelItems.deleteMany();
            })
        });
        
    }

Model.getOrderItems = function (ident,uid) {
        return new Promise(function (resolve, reject) {
        var i = 0;
        var result = [];
        OrderItems.find().then(function (orderItems) {
        if(orderItems.length < 1){
            resolve (orderItems)
        }
        else{
        while (i < orderItems.length){
            if (orderItems[i].id == ident){
                result.push({
                    id : orderItems[i].id,
                    qty : orderItems[i].qty,
                    pid : orderItems[i].pid,
                    total : orderItems[i].total
                });
            }
            if(i == orderItems.length-1){
                if (result.length > 0) resolve(result)
                else reject ('Error')
            }
            i++;
        }
    }
        });
        });
    }

Model.getOrders = function (uid) {
    return new Promise(function (resolve, reject) {
        return Order.find().then(function (items) {
            if (items.length < 1) resolve([]);
            else{
                var i = 0;
                var result = [];
                while (i < items.length){
                    if(items[i].number == uid){
                        result.push({
                            number: items[i].number,
                            address : items[i].address,
                            cardHolder : items[i].cardHolder,
                            cardNumber : items[i].cardNumber,
                            date : items[i].date,
                            ident : items[i].ident,
                            subtotal : items[i].subtotal,
                            tax : items[i].tax,
                            total : items[i].total
                        })
                    }
                    if(i == items.length-1){
                        if (result.length > 0) resolve(result)
                        else resolve([]);
                    }
                    i++;
                }
            }
            });
        });
}

Model.getOrder = function (ident,uid) {
    return new Promise(function (resolve, reject) {
        return Order.find().then(function (items) {
            if (items.length < 1) resolve([]);
            else{
                var i = 0;
                var result = [];
                while (i < items.length){
                    if(items[i].number == uid && items[i].ident == ident){
                        result.push({
                            number: items[i].number,
                            address : items[i].address,
                            cardHolder : items[i].cardHolder,
                            cardNumber : items[i].cardNumber,
                            date : items[i].date,
                            ident : items[i].ident,
                            subtotal : items[i].subtotal,
                            tax : items[i].tax,
                            total : items[i].total
                        })
                    }
                    if(i == items.length-1){
                        if (result.length > 0) resolve(result)
                        else reject ('Error')
                    }
                    i++;
                }
            }
            });
        });
}

module.exports = Model;