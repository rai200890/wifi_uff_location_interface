angular.module('wifiUffLocation').service("Ap", function Ap($resource, API_URL){
    return $resource(API_URL+'/api/aps/:apId.json', {apId: '@id'},
        {update: {method:'PUT'}});
});
