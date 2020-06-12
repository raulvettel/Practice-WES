Controller.controllers.purchase = {};

Controller.controllers.purchase.refresh = function (matching) {
  var context = {};
  Model.getItems()
  .then(function(item){
  Model.getUserLogged().then(function(uid) {
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
      Model.cartItemCount().then(function(items){
        context.items = items;
      context.item = item;
      context.idUsuario = valores.userId;
      View.renderer.purchase.render(context);
      });
    });    
  })

});
}

Controller.controllers.purchase.function = function(event){  
  event.preventDefault();
  Model.getUserLogged().then(function(uid) {
    Model.getShoppingCart(uid).then(function(params) {
      var orderInfo = {
      date : $('#date').val(),
      address : $('#address').val(),
      cardNumber : $('#cardNumber').val(),
      cardHolder : $('#cardHolder').val(),
      tax : params.total - params.subtotal,
      total : params.total,
      subtotal : params.subtotal,
      idUsuario : params.userId
    }
    Model.getItems().then(function(item){
      var item = item;
      Model.checkOut(orderInfo,item);
    });
  });  
  })
  
}