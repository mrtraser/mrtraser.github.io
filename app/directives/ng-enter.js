function directive() {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, elem, attrs) {
            elem.bind("keydown keypress", function (event) {
                if(event.which === 13 || event.keyCode === 13) {
                    scope.$apply(function (){
                        scope.$eval(attrs.ngEnter);
                    });

                    event.preventDefault();
                }
            });
        }
    }
}

export default directive;