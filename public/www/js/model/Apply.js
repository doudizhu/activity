function Apply() {

}

Apply.get_now_activity_status = function () {
    var event = Activity.get_activity_name_and_status();
    var now_activity = localStorage.getItem("nowActivity") || '';
    var now_status = _.find(event,function (num) {
        return num.name == now_activity
    }).status
    if (Apply.get_apply_start() != '' && Apply.get_apply_start() != now_activity && now_status == 'initial') {
        return 'initial_start'
    }
    if (now_status == 'start_bid' || now_status == 'end') {
        return 'end_apply'
    }
    return now_status
}

Apply.set_apply_start = function () {
    var apply = Activity.get_now_activity();
    localStorage.setItem("judge_apply_start", apply);
}
Apply.get_apply_start = function () {
    return localStorage.getItem('judge_apply_start') || ''
}
Apply.clean_apply_start = function () {
    localStorage.setItem("judge_apply_start", '')
}

Apply.button_apply_status = function (status) {
    var event = Activity.get_activity_name_and_status();
    var now_activity = Activity.get_now_activity()
    _.map(event, function (num) {
        if (num.name == now_activity) {
            num.status = status
        }
        return num
    })
    localStorage.setItem('localEventsLists', JSON.stringify(event));
}

Apply.get_apply_list = function () {
    var list = JSON.parse(localStorage.getItem("name_and_phone")) || [];
    var now_activity = Activity.get_now_activity();
    var new_list = _.filter(list, function (num) {
        return num.activity == now_activity
    }) || []

    return new_list;
}