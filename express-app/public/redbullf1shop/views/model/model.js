var Model = {}

Model.getCars = function () {
    return new Promise(function (resolve, reject) {
    $.ajax({
    url: '/webapp/api/products',
    method: 'GET'
    })
    .done(function (products) { resolve(products); })
    .fail(function (err) { reject(err); })
    });
};
        
Model.getCar = function (pid) {
    return new Promise(function (resolve, reject) {
    $.ajax({
    url: '/webapp/api/products/' + pid,
    method: 'GET'
    })
    .done(function (products) { resolve(products); })
    .fail(function (err) { reject(err); })
    });
}

Model.signin = function (email, password){
    return new Promise(function (resolve, reject) {
    $.ajax({
    url: '/webapp/api/users/signin',
    method: 'POST',
    data: {email,password}
    })
    .done(function (books) {Controller.controllers.index.refresh(); resolve(books); })
    .fail(function (err) {Controller.controllers.signin.refresh(); reject(err); })
    });
}

Model.signup = function(userInfo){
    return new Promise(function (resolve, reject) {
    $.ajax({
    url: '/webapp/api/users/signup',
    method: 'POST',
    data: userInfo
    })
    .done(function (books) {Controller.controllers.signin.refresh(); resolve(books); })
    .fail(function (err) {Controller.controllers.signup.refresh(); reject(err); })
    });
}

Model.users = [];

Model.user= [{}]

Model.orders = [];


Model.shoppingCart = [];

Model.getUser = function (id) {
    return new Promise(function (resolve, reject) {
    setTimeout(function () {
    var i = 0;
    while (i < Model.users.length && Model.users[i].id != id) i++;
    if (i < Model.users.length)
    resolve(Model.users[i])
    else
    reject('User not found');
    }, 1000);
    });
}

Model.getShoppingCart = function () {
    return new Promise(function (resolve, reject) {
    setTimeout(function () {
    resolve(Model.shoppingCart)
    }, 1000);
    });
}

Model.counter = 0;

Model.item = [];

Model.getItems = function () {
    return new Promise(function (resolve, reject) {
    setTimeout(function () {
    resolve(Model.item)
    }, 1000);
    });
}

Model.buy = function (pid) {
    Model.getCar(pid).then(function(result){
        info = result
        Model.getShoppingCart().then(function(result){
            carro = result[0]
            return new Promise(function (resolve, reject) {
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
                console.log(Model.item)
                resolve(carro);
                console.log(carro)
                });   
        });
    });
}

Model.cartItemCount = function(){
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
        resolve(Model.counter)
        }, 1000);
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
                resolve(Controller.controllers.cart.refresh());
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
                    resolve(Controller.controllers.cart.refresh());
                    console.log(Model.shoppingCart)
                }
                else{
                    Model.item[i].qty -= 1;
                    Model.item[i].total = Model.item[i].qty * Model.item[i].price;
                    Model.shoppingCart[0].subtotal -= Model.item[i].price;
                    Model.shoppingCart[0].total = Model.shoppingCart[0].tax * Model.shoppingCart[0].subtotal
                    Model.counter -= 1;
                    resolve(Controller.controllers.cart.refresh());
                    console.log(Model.shoppingCart)
                }

            }
            i++;
        }
    });

}

Model.orderItems = [];

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
            console.log(Model.orders) 
        });
        
    }

Model.getOrderItems = function (ident) {
        return new Promise(function (resolve, reject) {
        var i = 0;
        var result = [];
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
        });
    }

Model.getOrders = function () {
    return new Promise(function (resolve, reject) {
    setTimeout(function () {
    resolve(Model.orders)
    }, 1000);
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
    }, 1000);
    });
}