Controller.controllers.order = {};

Controller.controllers.order.refresh = function (matching) {  
  Model.cartItemCount().then(function(items){
    var context = {};
    context.items = items;
  View.renderer.order.render(context);
  });
}