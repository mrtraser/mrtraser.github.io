function directive($timeout) {
    return {
        restrict: 'A',
        scope: {
            list: '=scrollBottom'
        },
        link: function(scope, element) {
            scope.$watchCollection('list', function(newValue) {
                if (newValue) {
                    $timeout(function(){
                        // debugger;
                        element[0].scrollTop = element[0].scrollHeight;
                    }, 200);
                }
            });
        }
    }
}

export default directive;