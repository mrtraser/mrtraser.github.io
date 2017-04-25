routes.$inject = ['$stateProvider'];
export default function routes($stateProvider) {
    $stateProvider
        .state('chat', {
            url: '/chat',
            template: require('./chat.html'),
            resolve: {
                geo: ['GeoService', (GeoService) => {
                    return GeoService.userIP()
                }]
            },
            data: {
                permission: true
            }
    });
}
