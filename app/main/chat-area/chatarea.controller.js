/* global google */
export default class ChatController {
    constructor(
        $scope,
        ChatService,
        NgMap
    ) {
        this.messages = [];
        this.markers = [];
        this.pubnub = ChatService.socket;
        this.socket = ChatService;
        this._ngmap = NgMap;
        this._scope = $scope;

        $scope.$on(this.pubnub.getMessageEventNameFor(ChatService.channel), (ngEvent, message) => {
            $scope.$apply(() => {
                this.messages.push(message);
            })
        });

        // $scope.$on(this.pubnub.getPresenceEventNameFor(ChatService.channel), (ngEvent, pnEvent) => {
        //     this._presenceHandler(pnEvent);
        // });
    }

    $onInit() {
        // this.socket.getHistory().then((res) => {
        //     console.log(res);
        // });
        this._ngmap.getMap().then((map) => {
            this.map = map;

            this._initUserPosition(this.geo);

            this._initChatUsers();

            if ("geolocation" in navigator) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        console.log('Allowed');
                        console.log(position);
                        this.geo = position;
                        this._scope.$apply(() => {
                            this._initUserPosition(position, true);
                        });
                    },
                    (err) => {
                        console.log('Geolocation is not allowed');
                    }
                );
            } else {
                console.log('Geolocation is not available!');
            }
        });
    }

    _initUserPosition(geo, replace = false) {
        const marker = geo.coords ?
                    { lat: geo.coords.latitude, lng: geo.coords.longitude }
                    : {lat: geo.latitude, lng: geo.longitude};

        marker.uuid = this.socket.uuid;
        this.map.setCenter(marker);
        if (replace) { this.markers = [] }
        this.markers.push(marker);
    }

    _initChatUsers() {
        this.socket.currentState.then((res) => {
           console.log('Init chat', res);
        });
    }

    _pushMarkerToMap(marker) {
        this.markers.push(marker);
    }

    _presenceHandler(pnEvent) {
        console.log('Presence Event', pnEvent);
    }

    sendMessage() {
        if (!this.messageContent || this.messageContent === '') {
            return;
        }
        this.socket.sendMessage(this.messageContent)
            .then((res) => {
                console.log(res);
            });
        this.messageContent = '';
    }

    avatarUrl(uuid) {
        return 'http://robohash.org/'+uuid+'?set=set2&bgset=bg2&size=70x70';
    }
}