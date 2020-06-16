Controller.controllers.order = {};

Controller.controllers.order.refresh1 = function(matching){
  console.log(matching.input.substr(27,41))
  Controller.controllers.order.refresh(matching.input.substr(27,41));
}

Controller.controllers.order.refresh = function (ident) {  

    Model.getUserLogged().then(function (uid) {
      Model.cartItemCount(uid).then(function(items){
    Model.getOrder(ident,uid).then(function(order) {
      var context = {};
      if (items != null) context.items = items.number
      else context.items = items;
      context.total = order[0].total;
      context.subtotal = order[0].subtotal;
      context.tax = order[0].tax;
      context.date = order[0].date.substr(0,10);
      context.address = order[0].address;
      context.cardNumber = order[0].cardNumber;
      context.cardHolder = order[0].cardHolder;
      context.ident = order[0].ident;
      
      Model.getOrderItems(ident,uid).then(function(params) {
        context.orderitem = params;
        View.renderer.order.render(context);
      })
    })
    })
  });
}