Controller.controllers.cart = {};

Controller.controllers.cart.refresh = function (matching) {
  var context = {};
  Model.getItems()
  .then(function(item){
  context.item = item;
  View.renderer.cart.render(context);
});
}

Controller.controllers.cart.removeAll = function (pid){
  Model.removeAllCartItem(pid);
}

Controller.controllers.cart.removeOne = function (pid){
  Model.removeOneCartItem(pid);
}