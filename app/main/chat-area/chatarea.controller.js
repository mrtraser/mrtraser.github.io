export default class ChatController {
    constructor($scope, ChatService) {
        this.messages = [];
        this.pubnub = ChatService.socket;
        this.socket = ChatService;

        $scope.$on(this.pubnub.getMessageEventNameFor(ChatService.channel), (ngEvent, message) => {
            console.log('some happened');
            $scope.$apply(() => {
                this.messages.push(message);
            })
        });
    }

    sendMessage() {
        if (!this.messageContent || this.messageContent === '') {
            return;
        }
        this.socket.sendMessage(this.messageContent);
        // Reset the messageContent input
        this.messageContent = '';
    }

    avatarUrl(uuid) {
        return 'http://robohash.org/'+uuid+'?set=set2&bgset=bg2&size=70x70';
    }
}