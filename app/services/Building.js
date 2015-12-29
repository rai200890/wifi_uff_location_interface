function Building($resource){
    return $resource('/http://localhost:3000/api/:apId.json',{apId: '@id'});
};
