export default class AuthService {
    constructor($cookies) {
        this.currentUser = {};
        this._coockies = $cookies;
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