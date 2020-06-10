Controller.controllers.signin={};
Controller.controllers.signin.refresh = function (matching) {
  View.renderer.signin.render({});
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