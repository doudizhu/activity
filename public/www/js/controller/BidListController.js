function BidListController($scope, $navigate) {
    $scope.back_to_activity_list_page = function () {
        $navigate.go("/")
    }
    $scope.back_to_apply_page = function () {
        $navigate.go("/apply")
    }

    if (Bid.get_bid_start()) {
        $scope.start_able = true;
    }

    $scope.back_to_bid_list_page = function () {
        if (!$scope.start_able) {
            $navigate.go("/bid")
            Bid.save_bid_name_and_status()
        }
    }

    $scope.back_to_item_bid_page = function (bid) {
        Bid.set_now_bid(bid)
        Bid.get_bid_status(bid) == 'end' ? $navigate.go("/result_bid") : $navigate.go("/bid")
    }

    $scope.lists = Bid.get_bid_list()
}