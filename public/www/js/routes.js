myModule.config(function ($routeProvider) {
    $routeProvider.when("/", {
        templateUrl: "pages/activity_list_page.html",
        controller: ActivityListController
    }).when("/activity_create", {
            templateUrl: "pages/activity_create_page.html",
            controller: ActivityCreateController
        }).when("/apply", {
            templateUrl: "pages/apply_page.html",
            controller: ApplyController
        }).when("/bid_list", {
            templateUrl: "pages/bid_list_page.html",
            controller: BidListController
        }).when("/bid", {
            templateUrl: "pages/bid_page.html",
            controller: BidController
        }).when("/result_bid", {
            templateUrl: "pages/result_bid_page.html",
            controller: ResultBidController
        }).when("/statistics_bid", {
            templateUrl: "pages/statistics_bid_page.html",
            controller: StatisticsBidController
        }).when("/phone", {
            templateUrl: "pages/phone_login_page.html",
            controller: PhoneController
        }).otherwise({
            redirectTo: "/"
        });

    //routing generate
    //routing generated over
});