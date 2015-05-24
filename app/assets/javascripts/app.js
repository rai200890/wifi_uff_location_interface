app = angular.module('wifiUffLocation', ['smart-table','ui.router', 'ui.bootstrap','ngRoute','ngResource']);
app.controller('ApsController', ApsController);
app.factory('Ap',  Ap);

app.config(['$stateProvider', '$locationProvider', '$urlRouterProvider',
    function($stateProvider, $locationProvider, $urlRouterProvider) {
        $stateProvider
            .state('root', {
                url: "",
                abstract: true,
                templateUrl: 'home.html',
                controller: function($state){

                }
            }).state('root.aps', {
                url: "/aps",
                views: {
                    '': { templateUrl: 'aps/index.html'},
                    "new@aps": {templateUrl: "aps/new.html"},
                    "list@aps": {templateUrl: "aps/list.html", controller: 'ApsController'}
                }
            }).state('root.locations', {
                url: "/locations",
                templateUrl: "locations/index.html"
            });

        $urlRouterProvider.when('/', '/aps');

        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
    }]);

app.run(['$rootScope', '$state',
    function($rootScope, $state) {
    }]);