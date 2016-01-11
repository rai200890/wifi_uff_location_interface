angular.module('wifiUffLocation').service("Floor", function Building($resource, API_URL){
    return $resource(API_URL + '/api/floors/:floorId.json',{floorId: '@id'});
});
