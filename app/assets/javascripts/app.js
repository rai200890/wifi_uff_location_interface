app = angular.module('wifiUffLocation', ['smart-table','ui.router', 'ui.bootstrap','ngRoute','ngResource',
    'leaflet-directive']);
app.controller('ListApsController', ListApsController);
app.controller('ShowApController', ShowApController);

app.factory('Ap',  Ap);

app.config(['$stateProvider', '$locationProvider', '$urlRouterProvider',
    function($stateProvider, $locationProvider, $urlRouterProvider) {
        $stateProvider
            .state('root', {
                url: "",
                abstract: true,
                templateUrl: 'home.html'
            }).state('root.aps', {
                url: "/aps",
                abstract: true,
                templateUrl: 'aps/index.html'})
            .state('root.aps.list', {
                url: "",
                templateUrl: "aps/list.html",
                controller: 'ListApsController'
            }).state('root.aps.show', {
                url: "/:ap_id",
                templateUrl: "aps/show.html",
                controller: 'ShowApController'
            }).state('root.locations', {
                url: "/locations",
                templateUrl: "locations/index.html"
            }).state('root.snmp_status', {
                url: "/snmp_status",
                templateUrl: "snmp_status/show.html"
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