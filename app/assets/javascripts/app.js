app = angular.module('wifiUffLocation', ['ui.router', 'ngRoute']);
app.config(['$stateProvider', '$locationProvider', '$urlRouterProvider',
    function($stateProvider, $locationProvider, $urlRouterProvider) {
        $stateProvider
            .state('home', {
                url: "/home",
                templateUrl: 'home.html',
                controller: function($state){

                }
            });

        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
    }]);

app.run(['$rootScope', '$state',
    function($rootScope, $state) {
        console.log($state.current);
    }]);
