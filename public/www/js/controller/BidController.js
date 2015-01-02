function BidController($scope, $navigate) {
    $scope.back_to_activity_list_page = function () {
        $navigate.go("/bid_list")
    }

    change_button_status();
    function change_button_status() {
        var bid_status = Bid.set_bid_status()
        var bid_start = Bid.get_bid_start()
        var bid_now = localStorage.getItem("bid_now") || [];
        $scope.show = !(bid_status == 'initial')
        $scope.start_able = !( bid_start == '' && bid_status == 'initial' )
        $scope.over_able = !(bid_start == bid_now )
    }

    $scope.start_bid = function () {
        if (!$scope.start_able) {
            Bid.set_bid_start();
            Bid.button_bid_status('start')
            change_button_status();
            Bid.button_activity_status('start_bid')
        }
    }

    $scope.over_bid = function () {
        if ($scope.over_able) {
            return
        }
        if (confirm('竞价结束确认？')) {
            Bid.button_bid_status('end')
            localStorage.setItem('judge_bid_start', '')
            Bid.button_activity_status('end')
            $navigate.go("/result_bid")
        }
    }

    $scope.data_refresh = function () {
        $scope.lists = Bid.get_bid();
        $scope.number = Bid.get_bid().length
    }
    $scope.data_refresh()
}