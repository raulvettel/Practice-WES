Controller.controllers.purchase = {};

Controller.controllers.purchase.refresh = function (matching) {
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
    context.item = item;
    View.renderer.purchase.render(context);
  });
});
}