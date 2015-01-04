function PhoneController($scope, $http, $navigate) {
    $scope.user = {};
    $scope.submit = function(){
        $http({
            method:'POST',
            url:'/process_login' ,
            data: {user:$scope.user,from:'phone'}
        }).success(function(data){
//                console.log(data)  ;
                if(data == 'none') return $scope.error = true;
                $navigate.go('/');
            })
            .error(function(err){

            })

//        $http({
//            method:'GET',
//            url:'/login' ,
//            data: $scope.user
//        }).success(function(data){
//
//            })
//            .error(function(err){
//
//            })

    }
}