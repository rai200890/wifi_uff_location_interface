angular.module('wifiUffLocation').service("Floor", function Building($resource){
    return $resource('/api/floors/:floorId.json',{floorId: '@id'});
});
