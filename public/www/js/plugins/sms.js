function notify_message_received(message_json) {
    native_accessor.receive_message(message_json)
}

var native_accessor = {
    process_received_message: function (json_message) {
        check_apply_or_bid(json_message)
    },
    send_sms: function (phone, message) {
        native_access.send_sms({"receivers": [
            {"name": 'name', "phone": phone}
        ]}, {"message_content": message});
    },
    receive_message: function (json_message) {
        if (typeof this.process_received_message === 'function') {
            this.process_received_message(json_message);
        }
    }
};

function check_apply_or_bid(json_message) {
    if (Sms.judge_received_apply_message(json_message)) {
        return judge_apply(json_message)
    }
    if (Sms.judge_received_bid_message(json_message)) {
        return judge_bid(json_message)
    }
}
function judge_apply(json_message) {
    Apply.get_apply_start() ? Sms.process_apply_message(json_message) : Sms.send_message(json_message, '活动未开始')
}
function judge_bid(json_message) {
    console.log(Bid.get_bid_start())
    Bid.get_bid_start() ? Sms.process_bid_message(json_message) : Sms.send_message(json_message, '活动未开始')
}

/*
 function notify_message_received(message_json) {
 //console.log(JSON.stringify(message_json));
 //JSON.stringify(message_json);
 alert(JSON.stringify(message_json.messages));    //提示是否接受
 native_accessor.receive_message(message_json)   //测试接收短信;
 //phone_number=message_json.messages[0].phone;
 }

 */