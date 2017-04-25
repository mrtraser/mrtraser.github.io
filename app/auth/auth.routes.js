routes.$inject = ['$stateProvider'];
export default function routes($stateProvider) {
    $stateProvider
        .state('signup', {
            url: '/',
            template: require('./auth.html')
        });
}
