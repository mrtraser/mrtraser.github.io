routes.$inject = ['$stateProvider'];
export default function routes($stateProvider) {
    $stateProvider
        .state('chat', {
            url: '/',
            template: require('./chat.html'),
            resolve: {
                geo: ['GeoService', (GeoService) => {
                    return GeoService.userIP()
                }]
            }
    });
}
