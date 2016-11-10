var app = angular.module('wifiUffLocation', ['smart-table',
  'ui.bootstrap', 'ui-leaflet', 'ngResource',
  'ngRoute', 'ui.router', 'angularFileUpload', 'nemLogging', 'angular-jwt', 'LocalStorageModule'
]);

app.config(['$stateProvider', '$locationProvider', '$urlRouterProvider', 'localStorageServiceProvider', 'jwtOptionsProvider', 'WHITELISTED_DOMAINS', '$httpProvider',
  function($stateProvider, $locationProvider, $urlRouterProvider, localStorageServiceProvider, jwtOptionsProvider, WHITELISTED_DOMAINS, $httpProvider) {
    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'login.html',
        controller: 'LoginController',
        controllerAs: 'ctrl',
        data: {
          requiresLogin: false
        }
      })
      .state('logout', {
        url: '/logout',
        abstract: true,
        controller: 'LogoutController',
        data: {
          requiresLogin: false
        }
      })
      .state('root', {
        url: "",
        abstract: true,
        templateUrl: 'home.html',
        data: {
          requiresLogin: true
        }
      }).state('root.aps', {
        url: "/aps",
        abstract: true,
        templateUrl: 'aps/index.html',
        data: {
          requiresLogin: true
        }
      })
      .state('root.aps.list', {
        url: "",
        templateUrl: "aps/list.html",
        controller: 'ListApsController',
        data: {
          requiresLogin: true
        }
      }).state('root.search', {
        url: "/search?department_id",
        controller: 'SearchController',
        templateUrl: "search/index.html",
        data: {
          requiresLogin: true
        }
      }).state('root.db_uploader', {
        url: "/db_uploader",
        controller: 'DBUploaderController',
        templateUrl: "db_uploader/index.html",
        data: {
          requiresLogin: true
        }
      })

    $urlRouterProvider.when('/', '/aps');

    $locationProvider.html5Mode({
      enabled: true,
      requireBase: true
    });

    localStorageServiceProvider
      .setPrefix('wifiUffLocation')
      .setNotify(true, true)
      .setDefaultToCookie(false);

    jwtOptionsProvider.config({
      whiteListedDomains: WHITELISTED_DOMAINS,
      tokenGetter: ['Auth', function(Auth) {
        var token = Auth.getToken();
        return token;
      }],
      unauthenticatedRedirector: ['$state', function($state) {
        $state.go('login');
      }]
    });

    $httpProvider.interceptors.push('jwtInterceptor');
  }
]);

app.run(['Auth', '$state', 'authManager', 'localStorageService', '$rootScope', function(Auth, $state, authManager, localStorageService, $rootScope) {

  authManager.checkAuthOnRefresh();
  authManager.redirectWhenUnauthenticated();

  $rootScope.$on('tokenHasExpired', function() {
    console.log('Your session has expired!');
    $state.go('login');
  });

}]);
