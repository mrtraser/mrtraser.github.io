export default class AuthService {
    constructor($cookies, ChatService) {
        this.currentUser = {};
        this._coockies = $cookies;
        this._chat = ChatService;
    }

    get user() {
        return this.currentUser;
    }

    setUser(obj) {
        if (typeof obj === `object`) {
            this.currentUser = Object.assign(this.currentUser, obj);
            this._setUserCoockies()
        }
    }

    unsetUser() {
        this._chat.unsubscribe();
        this.currentUser = {};
        this._coockies.remove('_user');
    }

    _setUserCoockies() {
        var user = Object.assign({}, this.currentUser);
        var cookieExp = new Date();
        cookieExp.setDate(cookieExp.getDate() + 7);
        this._coockies.putObject('_user', user, { expires: cookieExp });
    }

    isRegistered() {
        return !!this.currentUser.name;
    }
}