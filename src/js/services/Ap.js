function Ap($resource){
    return $resource('http://localhost:3000/api/aps/:apId.json',{apId: '@id'},
        {update: {method:'PUT'}});
}