const { use } = require("../routes/api");
var Car = require('./car');
var User = require('../model/user')

var Model = {}
Model.cars = [];

Model.users = [];

Model.user= [{}]

Model.orders = [];

Model.shoppingCart = [];

Model.counter = 0;

Model.item = [];

Model.orderItems = [];

Model.getCars = function () {
    return Car.find();
}
        
Model.getCar = function (id) {
    return new Promise(function (resolve, reject) {
        return Car.findOne({ _id: id })
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
    console.log(user)
 if (!user) reject('Email not found');
 else if (user.password != password) reject('Password mismatch')
 else resolve(user.id);
 })
 });
 }


Model.getUser = function (id) {
    return new Promise(function (resolve, reject) {
    setTimeout(function () {
    var i = 0;
    while (i < Model.users.length){
        if (Model.users[i].id == id){
            resolve(Model.users[i])
            break;
        } 
        else if (i == Model.users.length-1 ){   
            reject('User not found 2');
        }
        i++;  
    
    }
    }, 200);    
    }); 
}

Model.getShoppingCart = function (uid) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
        var i = 0;
        while (i < Model.shoppingCart.length){
            if (Model.shoppingCart[i].userId == uid){
                resolve(Model.shoppingCart[i])
            } 
            else if (i == Model.shoppingCart.length-1){            
                reject('Cart not found');
            }
            i++;  
        
        }
        }, 200);    
        }); 
}

Model.getItems = function () {
    return new Promise(function (resolve, reject) {
    setTimeout(function () {
    resolve(Model.item)
    }, 200);
    });
}

Model.getUserLogged = function () {
    return new Promise(function (resolve, reject) {
    setTimeout(function () {
    resolve(Model.user[0].id)
    }, 200);
    });
}

Model.buy = function (pid) {
    return new Promise(function (resolve, reject) {
        Model.getCar(pid).then(function(result2){
            info = result2
            Model.getShoppingCart(Model.user[0].id).then(function(result){
                carro = result
        carro.subtotal = carro.subtotal + info.price;
        carro.total = carro.total + (carro.tax * info.price);
        var i = 0;
        if (Model.item.length < 1){
            Model.item.push({
                idCarro : carro.userId,
                pid : info.name,
                qty : 1,
                total : info.price,
                price: info.price,
                id : info.id
            })
        }
        else{
            while (i < Model.item.length){
                if (Model.item[i].price == info.price){
                    Model.item[i].qty += 1;
                    Model.item[i].total = Model.item[i].qty * info.price
                    break;
                }
                else if(i == Model.item.length-1 && Model.item[i].price != info.price){
                    Model.item.push({
                        idCarro : carro.userId,
                        pid : info.name,
                        qty : 1,
                        total : info.price,
                        price: info.price,
                        id : info.id
                    })
                    break;
                }
                i++;
            }
        }
        Model.counter += 1;
        resolve('Product added!');
        });   
});
});
}

Model.cartItemCount = function(){
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
        resolve(Model.counter)
        }, 200);
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
        var i = 0
        while (i < Model.users.length){
            if (Model.users[i].email == userInfo.email){
                reject('This email is already exits');
                x = true;
            }
            i++;
        }
        if(userInfo.password != userInfo.password2){
            reject('Passwords dont match')
            x = true;
        }
        if(x == false){
            Model.users.push({
                id: Date.now(), 
                name: userInfo.name,
                surname: userInfo.surname,
                email: userInfo.email,
                birth: userInfo.birth,
                address: userInfo.address,
                password: userInfo.password
            })
            Model.shoppingCart.push({
                userId: Date.now(),
                subtotal: 0.00,
                tax: 1.21,
                total: 0.00
            })
            Model.orders.push({
                number : Date.now(),
                date : undefined,
                ident : undefined,
                address : undefined,
                subtotal: undefined,
                tax : undefined,
                total : undefined,
                cardHolder : undefined,
                cardNumber : undefined
            })

            resolve('Correcto')
        }
    });
}


Model.removeAllCartItem = function (pid){

    return new Promise(function (resolve, reject) {
        var i = 0;
        while (i < Model.item.length){
            if(Model.item[i].id == pid){
                Model.shoppingCart[0].subtotal -= Model.item[i].price * Model.item[i].qty;
                Model.shoppingCart[0].total = Model.shoppingCart[0].tax * Model.shoppingCart[0].subtotal;
                Model.counter -= Model.item[0].qty;
                Model.item.splice(i,1);
            }
            i++;
        }
    });

}

Model.removeOneCartItem = function (pid){

    return new Promise(function (resolve, reject) {
        var i = 0;
        while (i < Model.item.length){
            if(Model.item[i].id == pid){
                if(Model.item[i].qty <= 1){
                    Model.shoppingCart[0].subtotal -= Model.item[i].price;
                    Model.shoppingCart[0].total = Model.shoppingCart[0].tax * Model.shoppingCart[0].subtotal;
                    Model.counter -= 1;
                    Model.item.splice(i,1);
                }
                else{
                    Model.item[i].qty -= 1;
                    Model.item[i].total = Model.item[i].qty * Model.item[i].price;
                    Model.shoppingCart[0].subtotal -= Model.item[i].price;
                    Model.shoppingCart[0].total = Model.shoppingCart[0].tax * Model.shoppingCart[0].subtotal
                    Model.counter -= 1;
                }

            }
            i++;
        }
    });

}


Model.checkOut = function (orderInfo,item){
    return new Promise(function (resolve,reject){
        var i = 0;
        var x = 0;
        while (i < Model.orders.length){
            if(Model.orders[i].number == orderInfo.idUsuario && Model.orders[i].ident == undefined){
                Model.orders[i].ident = Date.now();
                Model.orders[i].date = orderInfo.date;
                Model.orders[i].address = orderInfo.address;
                Model.orders[i].subtotal = orderInfo.subtotal;
                Model.orders[i].tax = orderInfo.tax;
                Model.orders[i].total = orderInfo.total;
                Model.orders[i].cardHolder = orderInfo.cardHolder;
                Model.orders[i].cardNumber = orderInfo.cardNumber;

                while(x < item.length){
                    Model.orderItems.push({
                        id : Date.now(),
                        qty : item[x].qty,
                        pid : item[x].pid,
                        total : item[x].total
                    });
                    x++;
                }
            }
            else if (Model.orders[i].number == orderInfo.idUsuario){
                Model.orders.push({
                ident : Date.now(),
                date : orderInfo.date,
                address : orderInfo.address,
                subtotal : orderInfo.subtotal,
                tax : orderInfo.tax,
                total : orderInfo.total,
                cardHolder : orderInfo.cardHolder,
                cardNumber : orderInfo.cardNumber
                })
                
                while(x < item.length){
                    Model.orderItems.push({
                        id : Date.now(),
                        qty : item[x].qty,
                        pid : item[x].pid,
                        total : item[x].total
                    });
                    x++;
                }

            }
                Model.counter = 0
                if (Model.shoppingCart[0].userId == orderInfo.idUsuario){
                    Model.shoppingCart[0].total = 0
                    Model.shoppingCart[0].subtotal = 0
                }
                Model.item = [];
                i++;
            }
            resolve(Model.orders)
        });
        
    }

Model.getOrderItems = function (ident) {
        return new Promise(function (resolve, reject) {
        var i = 0;
        var result = [];
        if(Model.orderItems.length < 1){
            resolve (Model.orderItems)
        }
        else{
        while (i < Model.orderItems.length){
            if (Model.orderItems[i].id == ident){
                result.push({
                    id : Model.orderItems[i].id,
                    qty : Model.orderItems[i].qty,
                    pid : Model.orderItems[i].pid,
                    total : Model.orderItems[i].total
                });
            }
            if(i == Model.orderItems.length-1){
                if (result.length > 0) resolve(result)
                else reject ('Error')
            }
            i++;
        }
    }
        });
    }

Model.getOrders = function () {
    return new Promise(function (resolve, reject) {
    setTimeout(function () {
        resolve(Model.orders)
    }, 200);
    });
}

Model.getOrder = function (ident) {
    return new Promise(function (resolve, reject) {
    setTimeout(function () {
    var i = 0;
    while (i < Model.orders.length && Model.orders[i].ident != ident) i++;
    if (i < Model.orders.length)
    resolve(Model.orders[i])
    else
    reject('Order not found');
    }, 200);
    });
}

module.exports = Model;