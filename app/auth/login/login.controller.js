import _ from 'lodash'

export default class LoginController {
    constructor(AuthService, $state) {
        this._auth = AuthService;
        this._state = $state;
    }

    signUp() {
        const send = { name: this.name, uuid: _.random(100).toString() };
        this._auth.setUser(send);
        this._state.go('chat');
    }
}