import _ from 'lodash'

export default class ChatService {
    constructor(Pubnub) {
        this.channel = 'livechat';
        this.uuid = _.random(100).toString();

        this.pubnub = Pubnub;

        // this.pubnub.addListener({
        //     message: function(m) {
        //         // handle message
        //         var channelName = m.channel; // The channel for which the message belongs
        //         var channelGroup = m.subscription; // The channel group or wildcard subscription match (if exists)
        //         var pubTT = m.timetoken; // Publish timetoken
        //         var msg = m.message; // The Payload
        //     },
        //     presence: function(p) {
        //         // handle presence
        //         var action = p.action; // Can be join, leave, state-change or timeout
        //         var channelName = p.channel; // The channel for which the message belongs
        //         var occupancy = p.occupancy; // No. of users connected with the channel
        //         var state = p.state; // User State
        //         var channelGroup = p.subscription; //  The channel group or wildcard subscription match (if exists)
        //         var publishTime = p.timestamp; // Publish timetoken
        //         var timetoken = p.timetoken;  // Current timetoken
        //         var uuid = p.uuid; // UUIDs of users who are connected with the channel
        //     },
        //     status: function(s) {
        //         // handle status
        //     }
        // })

        this.pubnub.init({
            publishKey: 'pub-c-7802bed3-e993-4ceb-80b6-6bace1de568f',
            subscribeKey: 'sub-c-e267f03a-29b9-11e7-bc52-02ee2ddab7fe',
            uuid: this.uuid
        });

        this.pubnub.subscribe({
            channels  : [this.channel],
            withPresence: true,
            triggerEvents: ['message'],
            presence: function(data) {

                // get notified when people join
                if(data.action == "join") {

                    var $new_user = $('<li id="' + data.uuid + '" class="list-group-item">' + data.uuid + '</li>')

                    $('#online-users').append($new_user);

                }

                // and when they leave
                if(data.action == "leave" || data.action == "timeout") {
                    $('#' + data.uuid).remove();
                }

            }
        });
    }

    sendMessage(message) {
        return this.pubnub.publish({
            channel: this.channel,
            message: {
                content: message,
                sender_uuid: this.uuid,
                date: new Date()
            }
        });
    }

    // getHistory() {
    //     return this.pubnub.history({
    //         channel: this.channel,
    //         count: 20,
    //         reverse: false
    //     });
    // }

    get socket() {
        return this.pubnub;
    }
}