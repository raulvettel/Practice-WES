Controller.controllers.cart = {};

Controller.controllers.cart.refresh = function (matching) {
  var context = {};
  Model.getItems()
  .then(function(item){
  Model.getUserLogged().then(function(uid) {
    Model.getShoppingCart(uid).then(function(valores){
      console.log(valores)
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
      Model.cartItemCount().then(function(items){
        context.items = items;
        context.item = item;
        View.renderer.cart.render(context);
      });
    });
  })
});
}

Controller.controllers.cart.removeAll = function (pid){
  Model.removeAllCartItem(pid);
}

Controller.controllers.cart.removeOne = function (pid){
  Model.removeOneCartItem(pid);
}