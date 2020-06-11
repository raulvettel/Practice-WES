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
    Model.cartItemCount().then(function(items){
      context.items = items;
    context.item = item;
    context.idUsuario = valores[0].userId;
    View.renderer.purchase.render(context);
    });
  });
});
}

Controller.controllers.purchase.function = function(event){  
  event.preventDefault();
  
  Model.getShoppingCart().then(function(params) {
      var orderInfo = {
      date : $('#date').val(),
      address : $('#address').val(),
      cardNumber : $('#cardNumber').val(),
      cardHolder : $('#cardHolder').val(),
      tax : params[0].total - params[0].subtotal,
      total : params[0].total,
      subtotal : params[0].subtotal,
      idUsuario : params[0].userId
    }
    Model.getItems().then(function(item){
      var item = item;
      Model.checkOut(orderInfo,item);
    });
  });
}