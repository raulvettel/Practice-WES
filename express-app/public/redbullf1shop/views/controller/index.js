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
Controller.controllers.addProduct={};
Controller.controllers.addProduct.addProduct_clicked = function (event, pid) {
  console.log('Lego')
  event.preventDefault();
  Model.buy(pid)
 .then(function () {
  console.log('Product added successfully');
  })
  .catch(function (err) {
  console.error('Product cannot be added', err.message);
  })
  }