Controller.controllers.cart = {};

Controller.controllers.cart.refresh = function (matching) {
  var context = {};
  
  Model.getUserLogged().then(function(uid) {
    Model.getItems(uid).then(function(item){
    Model.getShoppingCart(uid).then(function(valores){
      if (valores.length < 1){
        context.subtotal = 0;
        context.total = 0;
        context.tax = 0;
      }
      else{
        context.subtotal = valores.subtotal;
        context.total = valores.total;
        context.tax = valores.total - valores.subtotal;
      }
      Model.cartItemCount(uid).then(function(items){
        if (items != null) context.items = items.number
        else context.items = items;
        context.item = item;
        View.renderer.cart.render(context);
      });
    });
  })
});
}

Controller.controllers.cart.removeAll = function (pid){
  Model.getUserLogged().then(function(uid) {
  Model.removeAllCartItem(pid,uid);
  });
}

Controller.controllers.cart.removeOne = function (pid){
  Model.getUserLogged().then(function(uid) {
    Model.removeOneCartItem(pid,uid);
    });
}