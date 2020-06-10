Controller.controllers.purchase = {};

Controller.controllers.purchase.refresh = function (matching) {
  var context = {};
  Model.getItems()
  .then(function(item){
  context.item = item;
  View.renderer.purchase.render(context);
});
}