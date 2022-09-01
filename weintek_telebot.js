const request = require('./request-0.0.2.js');
export class TelegramBot {
    constructor(token) {
        this.token = token;
        this.url = `https://api.telegram.org/bot${this.token}`;
        this.keyboard = Array();
        this.resultUpdates = {};
        }
    makeButton(button){
        this.keyboard.push(button)
    }
    sendMessage(message, chatid){
        var final_url = `${this.url}/sendmessage?`;
        var json = {
            "chat_id": chatid,
            "text": message
        };
        if (this.keyboard != 0) {
            json['reply_markup'] = {
                "resize_keyboard": true,
                "keyboard": this.keyboard
            }
        };
        var jsonData = JSON.stringify(json);
        request.post({
            url: final_url,
            header: {
                "content-type": "application/json; charset=utf-8",
            },
            data: jsonData
            }, 
            (error, response, body) => {
                if (error == "No error") {
                    console.log("body:", body);
                }
                else {
                    console.log("error:", error);
                    console.log("response:", response);
                    console.log("body:", body);
                }
            }
            );
    }
    getUpdates(){
            var final_url = `${this.url}/getUpdates?offset=-1`;
            request.get({
                url: final_url
            }, 
            (error, response, body) => {
                if (error == "No error") {
                    var body_json = JSON.parse(body);
                    this.resultUpdates = body_json.result[0]; // message from the user
                }
                else {
                    console.log("error:", error);
                    console.log("response:", response);
                    console.log("body:", body);
                }
            }
            );
            return this.resultUpdates
        }
    }