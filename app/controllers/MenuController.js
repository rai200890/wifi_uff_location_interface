angular.module('wifiUffLocation').controller("MenuController", ["Auth", function(Auth) {
  var ctrl = this;

  ctrl.current_user = null;

  ctrl.aps_menu = [{
         name: "List Aps",
         link: "root.aps"
     }];

  ctrl.departments_menu = [{
            name: "Search for Department",
            link: "root.departments"
  }];

  ctrl.importer_menu = [{
            name: "Import data from spreadsheet",
            link: "root.importer"
  }];

  ctrl.session_menu = [{
            name: "Logout",
            link: "logout"
  }];

  Auth.getCurrentUser().then(function(response){
    ctrl.current_user = response.data;
  });

}]);
