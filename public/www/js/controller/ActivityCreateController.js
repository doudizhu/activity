function ActivityCreateController($scope, $navigate, $http) {
    (function () {
        !localStorage.localEventsLists ? $scope.play = "none" : $scope.play = "block";
        $scope.back_to_activity_list_page = function () {
            $navigate.go("/")
        }
    })()
    $scope.disabled = true;
    $scope.judge_repeat = function () {
        $scope.show = $scope.name != '' && Activity.judge_activity_name_repeat($scope.name)
        $scope.disabled = $scope.name == '' || Activity.judge_activity_name_repeat($scope.name)
    }

    $scope.back_to_apply_page = function () {
        if (!$scope.disabled) {
            new Activity($scope.name).save_activity_name_and_status()
            alert($scope.name)
            $http({
                method:'POST',
                url:'/phone_login' ,
                data: {activity:$scope.name}
            }).success(function(data){
                console.log(data)  ;
//                    alert(data)
//                    if(data == 'none') return $scope.error = true;
//                    $navigate.go('/');
                })
                .error(function(err){

                })

            $navigate.go("/apply");
        }
    }
}
