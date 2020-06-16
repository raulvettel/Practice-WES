Controller.controllers.profile = {};

Controller.controllers.profile.refresh = function () {
  Model.cartItemCount().then(function(items){
    var context = {};
    context.items = items;
    Model.getUserLogged().then(function (uid) {
      Model.getUser(uid).then(function(params) {
        context.name = params.name;
        context.surname = params.surname;
        context.birth = params.birth.substr(0,10);;
        context.address = params.address;
        context.email = params.email;   
        Model.getOrders(uid).then(function(params2) {
          if (params2[0].ident != undefined) context.orders = params2;
          View.renderer.profile.render(context);
        })
      });  
    })
    
  });
}