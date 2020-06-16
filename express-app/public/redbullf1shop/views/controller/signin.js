Controller.controllers.signin={};
Controller.controllers.signin.refresh = function (matching) {
  Model.getUserLogged().then(function(uid) {
  Model.cartItemCount(uid).then(function(items){
    var context = {};
    if (items != null) context.items = items.number
    else context.items = items;
  View.renderer.signin.render(context);
  });
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