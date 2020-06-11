Controller.controllers.profile = {};

Controller.controllers.profile.refresh = function (matching) {
  Model.cartItemCount().then(function(items){
    var context = {};
    context.items = items;
    View.renderer.profile.render(context);
  });
}