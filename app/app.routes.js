routes.$inject = ['$urlRouterProvider', '$locationProvider'];

export default function routes($urlRouterProvider, $locationProvider) {
    $urlRouterProvider.otherwise('/');
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
}
