export default class NavbarController {
    constructor(AuthService, $state) {
        this.user = AuthService.user;
        this._auth = AuthService;
        this._state = $state;
    }

    cleanUp(e) {
        e.preventDefault()
        this._auth.unsetUser();
        this._state.go('signup');
    }
}