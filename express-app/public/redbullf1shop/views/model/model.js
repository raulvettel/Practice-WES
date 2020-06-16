var Model = {}

Model.getCars = function () {
    return new Promise(function (resolve, reject) {
    $.ajax({
    url: '/webapp/api/products',
    method: 'GET'
    })
    .done(function (products) {resolve(products); })
    .fail(function (err) {reject(err); })
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

Model.getItems = function (uid) {
    return new Promise(function (resolve, reject) {
    $.ajax({
    url: '/webapp/api/users/' + uid + '/cart/items/',
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

Model.buy = function (pid, uid) {
    return new Promise(function (resolve, reject) {
    $.ajax({
    url: '/webapp/api/users/' + uid + '/cart/items/' + pid,
    method: 'POST',
    })
    .done(function (books) {Controller.controllers.index.refresh(); resolve(books); })
    .fail(function (err) {reject(err); })
    });
}

Model.cartItemCount = function(uid){
    return new Promise(function (resolve, reject) {
    $.ajax({
    url: '/webapp/api/cart/itemCount/' + uid,
    method: 'GET'
    })
    .done(function (products) { resolve(products); })
    .fail(function (err) { reject(err); })
    });
}

Model.removeAllCartItem = function (pid,uid){
    return new Promise(function (resolve, reject) {
    $.ajax({
    url: '/webapp/api/users/'+uid+'/cart/items/' + pid,
    method: 'DELETE'
    })
    .done(function (products) {resolve(Controller.controllers.cart.refresh()); resolve(products); })
    .fail(function (err) { reject(err); })
    });
}

Model.removeOneCartItem = function (pid,uid){
    return new Promise(function (resolve, reject) {
    $.ajax({
    url: '/webapp/api/users/' + uid+'/cart/items/' + pid + '/decrease',
    method: 'DELETE'
    })
    .done(function (products) {resolve(Controller.controllers.cart.refresh()); resolve(products); })
    .fail(function (err) { reject(err); })
    });
    
}

Model.checkOut = function (orderInfo,item,uid){
    var ret = {
        orderInfo : JSON.stringify(orderInfo),
        item : JSON.stringify(item)
    }
    return new Promise(function (resolve, reject) {
        $.ajax({
        url: '/webapp/api/users/' + uid+ '/orders/',
        method: 'POST',
        data: ret
        })
        .done(function (books) {Controller.controllers.profile.refresh(); resolve(books); })
        .fail(function (err) {reject(err); })
        });
}

Model.getOrders = function (uid) {
    console.log(uid)
    return new Promise(function (resolve, reject) {
    $.ajax({
    url: '/webapp/api/users/' + uid +'/orders',
    method: 'GET'
    })
    .done(function (products) { resolve(products); })
    .fail(function (err) { reject(err); })
    });
}

Model.getOrder = function (ident,uid) {
    return new Promise(function (resolve, reject) {
    $.ajax({
    url: '/webapp/api/users/' + uid + '/orders/' + ident,
    method: 'GET'
    })
    .done(function (products) { resolve(products); })
    .fail(function (err) { reject(err); })
    });
}

Model.getOrderItems = function (ident,uid) {
    return new Promise(function (resolve, reject) {
    $.ajax({
    url: '/webapp/api/users/' + uid + '/orders/' + ident + '/items',
    method: 'GET'
    })
    .done(function (products) { resolve(products); })
    .fail(function (err) { reject(err); })
    });
}