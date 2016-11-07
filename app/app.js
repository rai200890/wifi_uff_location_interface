var app = angular.module('wifiUffLocation', ['smart-table',
  'ui.bootstrap', 'ui-leaflet', 'ngResource',
  'ngRoute', 'ui.router', 'angularFileUpload', 'nemLogging'
]);

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
        templateUrl: 'aps/index.html'
      })
      .state('root.aps.list', {
        url: "",
        templateUrl: "aps/list.html",
        controller: 'ListApsController'
      }).state('root.aps.show', {
        url: "/:ap_id",
        templateUrl: "aps/show.html",
        controller: 'ShowApController'
      }).state('root.search', {
        url: "/search?department_id",
        controller: 'SearchController',
        templateUrl: "search/index.html"
      }).state('root.db_uploader', {
        url: "/db_uploader",
        controller: 'DBUploaderController',
        templateUrl: "db_uploader/index.html"
      })

    $urlRouterProvider.when('/', '/aps');

    $locationProvider.html5Mode({
      enabled: true,
      requireBase: true
    });
  }
]);
