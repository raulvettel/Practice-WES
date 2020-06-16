Controller.controllers.index = {};

Controller.controllers.index.refresh = function (matching) {
  var context = {};
  Model.getCars()
  .then(function(cars){
    Model.getUserLogged().then(function(uid) {
  Model.cartItemCount(uid).then(function(items){
    if (items != null) context.items = items.number
    else context.items = items;
    context.cars = cars;    
    View.renderer.index.render(context);
  });
});
  });
}

Controller.controllers.index.goToSignin_clicked = function (event) {
  event.preventDefault();
  Controller.router.go(event.target.href);
}
Controller.controllers.addProduct={};
Controller.controllers.addProduct.addProduct_clicked = function (event,pid) {
  event.preventDefault();
  Model.getUserLogged().then(function(uid) {
  Model.buy(pid,uid)
  Model.cartItemCount(uid);
  });
  }