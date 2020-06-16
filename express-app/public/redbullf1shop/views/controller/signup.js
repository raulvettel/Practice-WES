Controller.controllers.signup = {};

Controller.controllers.signup.refresh = function (matching) {
  Model.getUserLogged().then(function(uid) {
  Model.cartItemCount(uid).then(function(items){
    var context = {};
    if (items != null) context.items = items.number
    else context.items = items;
  View.renderer.signup.render(context);
  });
});
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