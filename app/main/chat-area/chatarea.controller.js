/* global google */
import _ from 'lodash'

export default class ChatController {
    constructor(
        $scope,
        ChatService,
        NgMap,
        AuthService
    ) {
        this.messages = [];
        this.markers = [];
        this.users = {};
        this.pubnub = ChatService.socket;
        this.socket = ChatService;
        this._ngmap = NgMap;
        this._scope = $scope;
        this.uuid = AuthService.user.uuid;
        this.userName = AuthService.user.name;

        $scope.$on(this.pubnub.getMessageEventNameFor(ChatService.channel), (ngEvent, message) => {
            $scope.$apply(() => {
                this.messages.push(message.message);
            })
        });

        $scope.$on(this.pubnub.getPresenceEventNameFor(ChatService.channel), (ngEvent, pnEvent) => {
            this._presenceHandler(pnEvent);
        });
    }

    $onInit() {
        this.socket.init(this.uuid);
        this.socket.subscribe();

        this.isLoading = true;

        this._ngmap.getMap().then((map) => {
            this.map = map;

            this._initUserPosition(this.geo);
            this._initUsers().then((res) => {
                // console.log(res);
                if (res.channels && res.channels[this.socket.channel]) {
                    const users = Array.isArray(res.channels[this.socket.channel].occupants) ? res.channels[this.socket.channel].occupants.slice() : [];
                    _.forEach(users, (el) => {
                        this.users[el.uuid] = Object.assign({}, el.state);
                    })
                }

                this.socket.getHistory().then((res) => {
                    _.forEach(res.messages, (el) => {
                        this.messages.push(el.entry);
                    });
                    this.isLoading = false;
                }).catch((err) => {
                    this.isLoading = false;
                    console.log(err);
                })
            });

            if ("geolocation" in navigator) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        this._scope.$apply(() => {
                            this._initUserPosition(position, true);
                        });
                    },
                    (err) => {
                        console.info('Geolocation is not allowed');
                    }
                );
            } else {
                console.info('Geolocation is not available!');
            }
        });
    }

    _initUsers() {
        return this.socket.currentChatState;
    }

    _initUserPosition(geo, replace = false) {
        const marker = geo.coords ?
                    { lat: geo.coords.latitude, lng: geo.coords.longitude }
                    : {lat: geo.latitude, lng: geo.longitude};

        this.map.setCenter(marker);
        if (replace) { this.markers = [] }
        this.socket.setUserState(marker, this.uuid, this.userName);
    }

    _presenceHandler(pnEvent) {
        console.log('Presence Event', pnEvent);
        this._scope.$apply(() => {
            if (pnEvent.action === `join`) {
                this.users[pnEvent.uuid] = {};
            }
            else if (pnEvent.action === `state-change` && this.users[pnEvent.uuid]) {
                this.users[pnEvent.uuid] = Object.assign({}, pnEvent.state);
            }
            else if (pnEvent.action === `timeout` || pnEvent.action === `leave`) {
                delete this.users[pnEvent.uuid];
            }
        });
    }

    sendMessage() {
        if (!this.messageContent || this.messageContent === '') {
            return;
        }
        this.socket.sendMessage(this.messageContent, this.uuid, this.userName)
            .then((res) => {
                this.messageContent = '';
            });
    }

    // avatarUrl(uuid) {
    //     return 'http://robohash.org/'+uuid+'?set=set2&bgset=bg2&size=70x70';
    // }
}