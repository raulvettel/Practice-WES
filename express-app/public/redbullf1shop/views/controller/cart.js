Controller.controllers.cart = {};

Controller.controllers.cart.refresh = function (matching) {
  var context = {};
  Model.getItems()
  .then(function(item){
  Model.getShoppingCart().then(function(valores){
    if (valores.length < 1){
      context.subtotal = 0;
      context.total = 0;
      context.tax = 0;
    }
    else{
      context.subtotal = valores[0].subtotal;
      context.total = valores[0].total;
      context.tax = valores[0].total - valores[0].subtotal;
    }
    Model.cartItemCount().then(function(items){
      context.items = items;
      context.item = item;
      View.renderer.cart.render(context);
    });
  });
});
}

Controller.controllers.cart.removeAll = function (pid){
  Model.removeAllCartItem(pid);
}

Controller.controllers.cart.removeOne = function (pid){
  Model.removeOneCartItem(pid);
}