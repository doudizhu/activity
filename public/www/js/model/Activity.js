function Activity(name) {
    this.name = name;
    this.status = "initial"
}

Activity.prototype.save_activity_name_and_status = function () {
    var activity_array = JSON.parse(localStorage.getItem('localEventsLists')) || [];
    activity_array.unshift(this);
    localStorage.setItem('localEventsLists', JSON.stringify(activity_array))

    localStorage.setItem('nowActivity', this.name)
}

Activity.get_activity_name_and_status = function () {
    return JSON.parse(localStorage.getItem('localEventsLists')) || []
}

Activity.judge_activity_name_repeat = function (name) {
    var eventList = JSON.parse(localStorage.getItem("localEventsLists")) || [];
    if (_.find(eventList, function (event) {
        return event.name == name;
    })) {
        return true;
    } else {
        return false;
    }
}

Activity.set_now_activity = function (name) {
    localStorage.setItem("nowActivity", name)
}
Activity.get_now_activity = function () {
    return localStorage.getItem("nowActivity") || []
}

