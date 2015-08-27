function Building($resource){
return $resource('/api//:apId.json',{apId: '@id'},
}