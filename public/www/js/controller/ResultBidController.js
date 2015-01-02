function ResultBidController($scope, $navigate, $timeout) {

    $scope.back_to_bid_list = function () {
        $navigate.go("/bid_list")
    }
    $scope.back_to_statistics_bid = function () {
        $navigate.go("/statistics_bid")
    }
    $scope.bid = Bid.get_now_bid()
    $scope.number = Bid.get_result_bid().length;
    $scope.lists = Bid.get_sort_result()

    $scope.show = Bid.get_result_price()
    if($scope.show){
        $scope.succeed = Bid.get_succeed_name_and_phone()
    }

    $timeout(function () {
        $('#myModal').modal('show');
        $timeout(function () {
            $('#myModal').modal('hide');
        }, 3000)
    }, 1)
}
