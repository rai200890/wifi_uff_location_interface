'use strict';

  angular.module("wifiUffLocation")
    .constant('API_URL', "https://wifi-uff-location-api.herokuapp.com/api")
    .constant('BASE_URL', "https://wifi-uff-location-interface.herokuapp.com")
    .constant('WHITELISTED_DOMAINS', ["wifi-uff-location-api.herokuapp.com"]);
