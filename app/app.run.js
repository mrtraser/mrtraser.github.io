run.$inject = ['$rootScope', '$state', '$cookies', '$timeout', 'AuthService'];

export default function run($rootScope, $state, $cookies, $timeout, AuthService,) {
    AuthService.setUser($cookies.getObject('_user'));

    $rootScope.$on('$stateChangeStart', function (e, to, toParams, from) {
        // debugger;
        if (to.name === 'signup'){
            if (AuthService.isRegistered() && from && from.name){
                e.preventDefault();

                return;
            }
            else if(AuthService.isRegistered() && from && !from.name){
                $timeout(function () {
                    $state.go('chat');
                });

                return;
            }
        }
        if (to.data && to.data.permission && !AuthService.isRegistered()){
            e.preventDefault();
            $timeout(function () {
                $state.go('signup');
            });
        }
    });
}