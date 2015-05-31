function Ap($resource){
    return $resource('/api/aps/:apId.json',{apId: '@id'});
}