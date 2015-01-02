function Sms() {

}

Sms.judge_received_apply_message = function (json_message) {
    var temp_message = json_message.messages[0].message
    if (temp_message.substr(0, 2).toUpperCase() == "BM") {
        return true
    }
}

Sms.process_apply_message = function (json_message) {
    var temp_message = json_message.messages[0].message
    var temp_name_message = temp_message.substr(2)
    var temp_phone = json_message.messages[0].phone
    var temp_apply = localStorage.getItem("judge_apply_start") || []
    var event = {activity: temp_apply, name: temp_name_message, phone: temp_phone}

    var event_list = JSON.parse(localStorage.getItem("name_and_phone")) || []
    if (Sms.check_apply_message(json_message, event, event_list)) {
        event_list.push(event)
        localStorage.setItem("name_and_phone", JSON.stringify(event_list))
        Sms.go_to_act_detail_page_by_name_of('apply_list')
        Sms.send_message(json_message, '报名成功')
    }
}
Sms.check_apply_message = function (json_message, event, event_list) {
    if (event_list == []) {
        return true
    }
    if (_.find(event_list, function (num) {
        return num.phone == event.phone && num.activity == event.activity
    })) {
        Sms.send_message(json_message, '请勿重复报名')
        return false
    }
    return true
}

Sms.go_to_act_detail_page_by_name_of = function (act_name) {
    var page_jump_or_not = document.getElementById(act_name)
    if (page_jump_or_not) {
        var scope = angular.element(page_jump_or_not).scope()
        scope.$apply(function () {
            console.log('refresh')
            scope.data_refresh()
        })
    }
}

Sms.judge_received_bid_message = function (json_message) {
    var temp_message = json_message.messages[0].message;
    if (temp_message.substr(0, 2).toUpperCase() == "JJ" && !isNaN(temp_message.substr(2))) {
        return true
    }
}

Sms.process_bid_message = function (json_message) {
    var temp_message = json_message.messages[0].message
    var temp_price_message = temp_message.substr(2)
    var temp_activity = localStorage.getItem("nowActivity")
    var temp_bid = Sms.get_temp_bid()
    var temp_phone = json_message.messages[0].phone
    if (!Sms.get_temp_apply(temp_activity, temp_phone)) {
        Sms.send_message(json_message, '未报名此次活动')
        return
    }
    var temp_name = Sms.get_temp_apply(temp_activity, temp_phone).name

    var event = {activity: temp_activity, bid: temp_bid, price: temp_price_message, name: temp_name, phone: temp_phone};
    var event_list = JSON.parse(localStorage.getItem("bid_name_and_phone")) || []
    if (Sms.check_bid_message(json_message, event, event_list)) {
        event_list.push(event)
        localStorage.setItem("bid_name_and_phone", JSON.stringify(event_list))
        Sms.go_to_act_detail_page_by_name_of('bid')
        Sms.send_message(json_message, '竞价成功')
    }
}
Sms.get_temp_bid = function () {
    var events = JSON.parse(localStorage.getItem("bid")) || []
    var bid_start = localStorage.getItem("judge_bid_start") || []
    return _.find(events,function (num) {
        return bid_start == num.activity + num.bid
    }).bid || ''
}
Sms.get_temp_apply = function (temp_activity, temp_phone) {
    var apply = JSON.parse(localStorage.getItem("name_and_phone")) || []
    return _.find(apply, function (num) {
        return num.activity == temp_activity && num.phone == temp_phone
    })
}
Sms.check_bid_message = function (json_message, event, event_list) {
    if (event_list == []) {
        return true
    }
    if (_.find(event_list, function (num) {
        return num.phone == event.phone && num.activity == event.activity && num.bid == event.bid
    })) {
        Sms.send_message(json_message, '请勿重复竞价')
    }
    return true
}


Sms.send_message = function (json_message, content) {
    var message = content
    console.log(json_message.messages[0].phone, message)
    native_accessor.send_sms(json_message.messages[0].phone, message)
}