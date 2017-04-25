import _ from 'lodash'

export default class ChatService {
    constructor(Pubnub, AuthService) {
        this.channel = 'livechat';
        // this.uuid = _.random(100).toString();
        this.uuid = AuthService.user.uuid;
        this.userName = AuthService.user.name;

        console.log('User UUID', this.uuid);

        this.pubnub = Pubnub;

        this.pubnub.init({
            publishKey: 'pub-c-7802bed3-e993-4ceb-80b6-6bace1de568f',
            subscribeKey: 'sub-c-e267f03a-29b9-11e7-bc52-02ee2ddab7fe',
            uuid: this.uuid,
            // heartbeatInterval: 20
            presenceTimeout: 20
        });


        this.pubnub.subscribe({
            channels: [this.channel],
            withPresence: true,
            triggerEvents: true
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

    setUserState(location) {
        this.pubnub.setState({
            state: {
                name:
                location
            },
            uuid: this.uuid,
            channels: [this.channel]
        })
    }

    get currentState() {
        return this.pubnub.hereNow({
            channels: [this.channel],
            includeUUIDs: true,
            includeState: true
        })
    }

    get socket() {
        return this.pubnub;
    }
}