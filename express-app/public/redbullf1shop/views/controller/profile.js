Controller.controllers.profile = {};

Controller.controllers.profile.refresh = function () {
  Model.cartItemCount().then(function(items){
    var context = {};
    context.items = items;
    Model.getUserLogged().then(function (uid) {
      console.log(uid)
      Model.getUser(uid).then(function(params) {
        context.name = params.name;
        context.surname = params.surname;
        context.birth = params.birth;
        context.address = params.address;
        context.email = params.email;
        Model.getOrders().then(function(params2) {
          console.log(context.orders)
          console.log(params2[0])
          if (params2[0].ident != undefined) context.orders = params2;
          View.renderer.profile.render(context);
        })
      });  
    })
    
  });
}