angular.module('wifiUffLocation').controller("LogoutController", ['Auth', '$state',
  function(Auth, $state) {
    var ctrl = this;

    ctrl.init = function() {
      Auth.logout();
      $state.go('login');
    };

    ctrl.init();
  }
]);
