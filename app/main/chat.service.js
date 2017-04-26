import _ from 'lodash'

export default class ChatService {
    constructor(Pubnub) {
        this.channel = 'livechat';
        this.pubnub = Pubnub;
    }

    init(uuid) {
        this.pubnub.init({
            publishKey: 'pub-c-937cb16f-5261-4d8c-9fc5-891a3d489147',
            subscribeKey: 'sub-c-fe81cfba-2a46-11e7-87b6-02ee2ddab7fe',
            uuid,
            presenceTimeout: 300
        });
    }

    subscribe() {
        this.pubnub.subscribe({
            channels: [this.channel],
            withPresence: true,
            triggerEvents: true
        });
    }

    unsubscribe() {
        this.pubnub.unsubscribe({
            channels: [this.channel],
        });
    }

    sendMessage(message, uuid, name) {
        return this.pubnub.publish({
            channel: this.channel,
            message: {
                content: message,
                sender_uuid: uuid,
                name,
                date: new Date()
            }
        });
    }

    getHistory() {
        return this.pubnub.history({
            channel: this.channel,
            count: 20,
            reverse: false
        });
    }

    setUserState(location, uuid, name) {
        this.pubnub.setState({
            state: {
                name,
                location
            },
            uuid,
            channels: [this.channel]
        })
    }

    getUserState(uuid) {
        return this.pubnub.getState({
            uuid,
            channels: [this.channel]
        })
    }

    toggleUserTyping(uuid, state, typing=false) {
        state.typing = typing;
        return this.pubnub.setState({
            state,
            uuid,
            channels: [this.channel]
        })
    }

    get currentChatState() {
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