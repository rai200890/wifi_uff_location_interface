angular.module('wifiUffLocation').service("Building", function Building($resource, API_URL){
    return $resource(API_URL +'/api/buildings/:buildingId.json', {buildingId: '@id'});
});
