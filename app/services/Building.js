angular.module('wifiUffLocation').service("Building", function Building($resource){
    return $resource('/api/buildings/:buildingId.json', {buildingId: '@id'});
});
