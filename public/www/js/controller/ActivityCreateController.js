function ActivityCreateController($scope, $navigate) {
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
            $navigate.go("/apply");
        }
    }
}
