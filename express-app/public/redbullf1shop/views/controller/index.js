Controller.controllers.index = {};

Controller.controllers.index.refresh = function (matching) {
  var context = {};
  Model.getCars()
  .then(function(cars){
  Model.cartItemCount().then(function(items){
    context.items = items;
    context.cars = cars;    
    View.renderer.index.render(context);
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
  Model.cartItemCount();
  });
  }