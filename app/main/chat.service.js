import _ from 'lodash'

export default class ChatService {
    constructor(Pubnub) {
        this.channel = 'livechat';
        this.uuid = _.random(100).toString();

        this.pubnub = Pubnub;

        this.pubnub.init({
            publishKey: 'pub-c-7802bed3-e993-4ceb-80b6-6bace1de568f',
            subscribeKey: 'sub-c-e267f03a-29b9-11e7-bc52-02ee2ddab7fe',
            uuid: this.uuid
        });

        this.pubnub.subscribe({
            channels  : [this.channel],
            withPresence: true,
            triggerEvents: ['message']
        });

        console.log(this.uuid);
    }

    sendMessage(message) {
        this.pubnub.publish({
            channel: this.channel,
            message: {
                content: message,
                sender_uuid: this.uuid,
                date: new Date()
            }
        });
    }

    get socket() {
        return this.pubnub;
    }
}