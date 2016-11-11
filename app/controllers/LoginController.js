angular.module('wifiUffLocation').controller("LoginController", ["Auth", "$state", "localStorageService", function(Auth, $state, localStorageService) {
  var ctrl = this;
  ctrl.credentials = {};
  ctrl.alerts = [];
  ctrl.loading = false;

  ctrl.login = function() {
    ctrl.loading = true;
    Auth.login(ctrl.credentials).then(function(response) {
      $state.go('root.ap_list');
    }).catch(function(response, statusCode) {
      ctrl.alerts = [{
        type: "danger",
        messages: ['Invalid username/password!']
      }];
    }).finally(function() {
      ctrl.loading = false;
    });
  };
}]);
