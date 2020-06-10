Controller.controllers.cart = {};

Controller.controllers.cart.refresh = function (matching) {
  var context = {};
  Model.getItems()
  .then(function(item){
  context.item = item;
  View.renderer.cart.render(context);
});
}