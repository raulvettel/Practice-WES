Controller.controllers.index = {};

Controller.controllers.index.refresh = function (matching) {
  var context = {};
  Model.getCars()
  .then(function(cars){
  context.cars = cars;
  View.renderer.index.render(context);
  });
}

Controller.controllers.index.goToSignin_clicked = function (event) {
  event.preventDefault();
  Controller.router.go(event.target.href);
}
