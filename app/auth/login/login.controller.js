export default class LoginController {
    constructor() {

    }

    login() {
        const send = { email: this.email, password: this.password };

        this.dataLoading = true;
        AuthenticationService.signIn(send).then(function (res) {
            if (res.success){
                var _user = HelperMethods.formatFromServer(res);
                delete _user.success;
                UserService.setUser(_user);
                $rootScope.$emit(events.signedUp, _user);
                close(true);
            }

        }).finally(function(){
            this.dataLoading = false;
        });
    }
}