Controller.controllers.order = {};

Controller.controllers.order.refresh1 = function(matching){
  console.log(matching.input.substr(27,41))
  Controller.controllers.order.refresh(matching.input.substr(27,41));
}

Controller.controllers.order.refresh = function (ident) {  
  Model.cartItemCount().then(function(items){
    Model.getOrder(ident).then(function(order) {
      var context = {};
      context.items = items;
      context.total = order.total;
      context.subtotal = order.subtotal;
      context.tax = order.tax;
      context.date = order.date;
      context.address = order.address;
      context.cardNumber = order.cardNumber;
      context.cardHolder = order.cardHolder;
      context.ident = order.ident;
      Model.getOrderItems(ident).then(function(params) {
        context.orderitem = params;
        View.renderer.order.render(context);
      })
      
    })
  });
}