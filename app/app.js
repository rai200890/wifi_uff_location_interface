var app = angular.module('wifiUffLocation', ['smart-table', 'ui.bootstrap', 'ui-leaflet', 'ngRoute',
    'ui.router', 'angularFileUpload', 'nemLogging', 'angular-jwt', 'LocalStorageModule', 'ui.navbar',
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
                templateUrl: "aps/index.html",
                controller: 'ApListController',
                controllerAs: 'ctrl',
                data: {
                    requiresLogin: true
                }
            }).state('root.departments', {
                url: "/departments",
                params: {
                  department_id: null
                },
                controller: 'DepartmentSearchController',
                controllerAs: 'ctrl',
                templateUrl: "departments/index.html",
                data: {
                    requiresLogin: true
                }
            }).state('root.departments.map', {
                url: "/{department_id}/map",
                controller: 'MapViewController',
                controllerAs: 'ctrl',
                templateUrl: "map/show.html",
                data: {
                    requiresLogin: true
                }
            }).state('root.departments.upload_map', {
                url: "/{department_id}/upload_map",
                controller: 'MapUploadController',
                controllerAs: 'ctrl',
                templateUrl: "map/upload.html",
                data: {
                    requiresLogin: true
                }
            }).state('root.importer', {
                url: "/importer",
                controller: 'ImporterController',
                templateUrl: "importer/new.html",
                controllerAs: 'ctrl',
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
        $state.go('login');
    });
}]);
