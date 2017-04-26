routes.$inject = ['$stateProvider'];
export default function routes($stateProvider) {
    $stateProvider
        .state('signup', {
            url: '/signup',
            template: require('./auth.html')
        });
}
