function StatisticsBidController($scope, $navigate) {
    $scope.back_to_bid_list = function () {
        $navigate.go("/bid_list")
    }
    $scope.back_to_result_bid = function () {
        $navigate.go("/result_bid")
    }

    $scope.bid = Bid.get_now_bid()
    $scope.number = Bid.get_result_bid().length
    $scope.lists = Bid.statistics_price()

    function process_result(succeed) {
        var deal = {
            true:function(){
                $scope.result = 'succeed'
                $scope.succeed = Bid.get_succeed_name_and_phone()
            },
            false:function(){
                $scope.result = 'failed'
            }
        }
        if(succeed){
            succeed = true
        }
        deal[succeed]()
    }
    process_result(Bid.get_result_price())
}