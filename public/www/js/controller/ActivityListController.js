function ActivityListController($scope, $navigate) {
    (function () {
        if (!localStorage.localEventsLists) {
            $navigate.go("/activity_create");
        }
        Apply.get_apply_start()||Bid.get_bid_start() ? $scope.creat_able = true : $scope.creat_able = false
    })();

    $scope.back_to_activity_create_page = function () {
        if (!$scope.creat_able) {
            $navigate.go("/activity_create")
        }
    }

    $scope.activityList = Activity.get_activity_name_and_status();

    $scope.back_to_activity_sign_up_page = function (list) {
        Activity.set_now_activity(list.name)
        if (list.status == "initial" || list.status == "start" || Apply.get_apply_start()) {
            $navigate.go("/apply")
        }
        if (list.status != "initial" && list.status != "start") {
            $navigate.go("/bid_list")
        }
    }
}