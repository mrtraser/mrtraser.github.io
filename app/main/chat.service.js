import _ from 'lodash'

export default class ChatService {
    constructor(Pubnub) {
        this.channel = 'livechat';
        this.pubnub = Pubnub;
    }

    init(uuid) {
        this.pubnub.init({
            publishKey: 'pub-c-7802bed3-e993-4ceb-80b6-6bace1de568f',
            subscribeKey: 'sub-c-e267f03a-29b9-11e7-bc52-02ee2ddab7fe',
            uuid,
            presenceTimeout: 20
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