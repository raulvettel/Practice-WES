Controller.controllers.signin={};
Controller.controllers.signin.refresh = function (matching) {
  Model.cartItemCount().then(function(items){
    var context = {};
    context.items = items;
  View.renderer.signin.render(context);
  });
}
Controller.controllers.signin.goToIndex_clicked=function(event){
  event.preventDefault();
  Controller.router.go(event.target.href);
}

Controller.controllers.signin.function = function(event){
  event.preventDefault();
  email = $('#email').val();
  password = $('#password').val();
  Model.signin(email,password);
}