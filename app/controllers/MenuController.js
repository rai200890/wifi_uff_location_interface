angular.module('wifiUffLocation').controller("MenuController", [function() {
  var ctrl = this;

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


}]);
