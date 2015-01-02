function ApplyController($scope, $navigate) {
    $scope.back_to_activity_list_page = function () {
        $navigate.go("/")
    }
    $scope.back_to_bid_list_page = function () {
        $navigate.go("/bid_list")
    }
    $scope.status = Apply.get_now_activity_status()

    $scope.start_apply = function () {
        Apply.set_apply_start()
        Apply.button_apply_status('start')
        $scope.status = 'start';
    }

    $scope.over_apply = function () {
        if (confirm('报名结束确认？')) {
            $scope.status = 'disabled'
            Apply.button_apply_status('end_apply')
            $navigate.go("/bid_list")
            Apply.clean_apply_start()
        }
    }

    $scope.data_refresh = function () {
        $scope.number = Apply.get_apply_list().length
        $scope.lists = Apply.get_apply_list()
    }
    $scope.data_refresh()
}
