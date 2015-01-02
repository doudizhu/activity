function Bid() {

}

Bid.set_bid_status = function () {
    var event = JSON.parse(localStorage.getItem("bid")) || [];
    var bid_now = localStorage.getItem("bid_now") || [];
    return _.find(event, function (num) {
        return num.activity + num.bid == bid_now
    }).status
}

Bid.set_bid_start = function () {
    var bid_start = localStorage.getItem("bid_now") || '';
    localStorage.setItem("judge_bid_start", bid_start);
}
Bid.get_bid_start = function () {
    return localStorage.getItem('judge_bid_start') || ''
}
Bid.clean_bid_start = function(){
    localStorage.setItem("judge_bid_start", '');
}

Bid.button_bid_status = function (status) {
    var bid_start = localStorage.getItem("bid_now");
    var event = JSON.parse(localStorage.getItem("bid")) || [];
    _.map(event, function (num) {
        if (num.activity + num.bid == bid_start) {
            num.status = status
        }
        return num
    })
    localStorage.setItem('bid', JSON.stringify(event));
}

Bid.button_activity_status = function (status) {
    var start_activity = localStorage.getItem("nowActivity")
    var activity = JSON.parse(localStorage.getItem('localEventsLists')) || [];
    _.map(activity, function (num) {
        if (num.name == start_activity) {
            num.status = status
        }
        return num
    })
    localStorage.setItem("localEventsLists", JSON.stringify(activity))
}

Bid.get_bid = function () {
    var list = JSON.parse(localStorage.getItem("bid_name_and_phone")) || [];
    var bid_now = localStorage.getItem("bid_now") || [];
    return _.filter(list, function (num) {
        return num.activity + num.bid == bid_now
    }) || []
}


Bid.save_bid_name_and_status = function () {
    var event_list = JSON.parse(localStorage.getItem("bid")) || [];
    var bid_activity = localStorage.getItem('nowActivity') || [];

    var a = _.filter(event_list, function (num) {
        return num.activity == bid_activity
    })
    var index = a.length + 1;
    var bid_status = "initial";
    var bid_name = "竞价" + index;
    var bid_activity = localStorage.getItem("nowActivity")

    var event = {activity: bid_activity, bid: bid_name, status: bid_status};
    event_list.unshift(event);
    localStorage.setItem("bid", JSON.stringify(event_list));

    localStorage.setItem("bid_now", bid_activity + bid_name)
}
Bid.get_now_bid = function () {
    return localStorage.getItem('bid_now') || ''
}
Bid.set_now_bid = function (bid) {
    localStorage.setItem("bid_now", bid.activity + bid.bid)
}

Bid.get_bid_status = function (bid) {
    var event = JSON.parse(localStorage.getItem("bid"))
    return _.find(event,function (num) {
        return num.activity + num.bid == bid.activity + bid.bid
    }).status
}

Bid.get_bid_list = function () {
    var list = JSON.parse(localStorage.getItem("bid")) || [];
    return _.filter(list, function (num) {
        return num.activity == localStorage.getItem("nowActivity")
    }) || []
}

Bid.get_result_bid = function () {
    var event = JSON.parse(localStorage.getItem("bid_name_and_phone")) || [];
    return _.filter(event, function (num) {
        return num.activity + num.bid == Bid.get_now_bid()
    })
}
Bid.get_sort_result = function () {
    return _.sortBy(Bid.get_result_bid(), function (num) {
        return num.price
    })
}

Bid.statistics_price = function () {
    var statistics = [];
    var count = _.groupBy(Bid.get_sort_result(), function (num) {
        return num.price
    });
    _.map(count, function (value, key) {
        statistics.push({'price': key, 'key': value.length})
    });
    localStorage.setItem("statistics_bid", JSON.stringify(statistics))
    return statistics
}
Bid.get_result_price = function () {
    var result = _.find(Bid.statistics_price(), function (num) {
        return num.key == 1
    })
    if(result){
        return result.price
    }
    Bid.save_success_bid('竞价失败')
    return false
}
Bid.get_succeed_name_and_phone = function () {
    return _.find(Bid.get_sort_result(), function (num) {
        return num.price == Bid.get_result_price()
    })
}

Bid.save_success_bid = function(success_bid){
    localStorage.setItem("success_bid", success_bid);
}
Bid.get_success_bid = function(){
    return localStorage.getItem("success_bid");
}
