Controller.controllers.profile = {};

Controller.controllers.profile.refresh = function () {
  
    
    Model.getUserLogged().then(function (uid) {
      Model.getUser(uid).then(function(params) {
        Model.cartItemCount(uid).then(function(items){
        var context = {};
        if (items != null) context.items = items.number
        else context.items = items;
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