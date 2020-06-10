Controller.controllers.signup = {};

Controller.controllers.signup.refresh = function (matching) {
  View.renderer.signup.render({});
}

Controller.controllers.signup.create = function (event){
  event.preventDefault();
  var userInfo = {
    name : $('#name').val(),
    surname : $('#surname').val(),
    address : $('#address').val(),
    birth : $('#birth').val(),
    email : $('#email').val(),
    password : $('#password').val(),
    password2 : $('#password2').val()
  }
  Model.signup(userInfo);

}