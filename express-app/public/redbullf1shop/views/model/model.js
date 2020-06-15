var Model = {}

Model.getCars = function () {
    return new Promise(function (resolve, reject) {
    $.ajax({
    url: '/webapp/api/products',
    method: 'GET'
    })
    .done(function (products) {console.log(products); resolve(products); })
    .fail(function (err) {console.log(err); reject(err); })
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
    .done(function (books) {console.log(books);Controller.controllers.index.refresh(); resolve(books); })
    .fail(function (err) {console.log(err);Controller.controllers.signin.refresh(); reject(err); })
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

Model.getUser = function (id) {
    return new Promise(function (resolve, reject) {
        $.ajax({
        url: '/webapp/api/users/' + id,
        method: 'GET'
        })
        .done(function (products) { resolve(products); })
        .fail(function (err) { reject(err); })
        });
}

Model.getShoppingCart = function (uid) {
    return new Promise(function (resolve, reject) {
    $.ajax({
    url: '/webapp/api/users/' + uid + '/cart',
    method: 'GET'
    })
    .done(function (products) { resolve(products); })
    .fail(function (err) { reject(err); })
    });
}

Model.getItems = function () {
    return new Promise(function (resolve, reject) {
    $.ajax({
    url: '/webapp/api/cart/items/',
    method: 'GET'
    })
    .done(function (products) { resolve(products); })
    .fail(function (err) { reject(err); })
    });
}

Model.getUserLogged = function () {
    return new Promise(function (resolve, reject) {
    $.ajax({
    url: '/webapp/api/users/userLogged',
    method: 'GET'
    })
    .done(function (products) { resolve(products); })
    .fail(function (err) { reject(err); })
    });
}

Model.buy = function (pid) {
    return new Promise(function (resolve, reject) {
    $.ajax({
    url: '/webapp/api/users/cart/items/' + pid,
    method: 'POST',
    })
    .done(function (books) {Controller.controllers.index.refresh(); resolve(books); })
    .fail(function (err) {reject(err); })
    });
}

Model.cartItemCount = function(){
    return new Promise(function (resolve, reject) {
    $.ajax({
    url: '/webapp/api/cart/itemCount',
    method: 'GET'
    })
    .done(function (products) { resolve(products); })
    .fail(function (err) { reject(err); })
    });
}

Model.removeAllCartItem = function (pid){
    return new Promise(function (resolve, reject) {
    $.ajax({
    url: '/webapp/api/users/cart/items/' + pid,
    method: 'DELETE'
    })
    .done(function (products) {resolve(Controller.controllers.cart.refresh()); resolve(products); })
    .fail(function (err) { reject(err); })
    });
}

Model.removeOneCartItem = function (pid){

    return new Promise(function (resolve, reject) {
    $.ajax({
    url: '/webapp/api/users/cart/items/' + pid + '/decrease',
    method: 'DELETE'
    })
    .done(function (products) {resolve(Controller.controllers.cart.refresh()); resolve(products); })
    .fail(function (err) { reject(err); })
    });
    
}

Model.checkOut = function (orderInfo,item){
    var ret = {
        orderInfo : JSON.stringify(orderInfo),
        item : JSON.stringify(item)
    }
    return new Promise(function (resolve, reject) {
        $.ajax({
        url: '/webapp/api/users/orders/',
        method: 'POST',
        data: ret
        })
        .done(function (books) {Controller.controllers.profile.refresh(); resolve(books); })
        .fail(function (err) {reject(err); })
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
    $.ajax({
    url: '/webapp/api/order',
    method: 'GET'
    })
    .done(function (products) { resolve(products); })
    .fail(function (err) { reject(err); })
    });
}

Model.getOrder = function (ident) {
    return new Promise(function (resolve, reject) {
    $.ajax({
    url: '/webapp/api/users/orders/' + ident,
    method: 'GET'
    })
    .done(function (products) { resolve(products); })
    .fail(function (err) { reject(err); })
    });
}

Model.getOrderItems = function (ident) {
    return new Promise(function (resolve, reject) {
    $.ajax({
    url: '/webapp/api/users/orders/' + ident + '/items',
    method: 'GET'
    })
    .done(function (products) { resolve(products); })
    .fail(function (err) { reject(err); })
    });
}