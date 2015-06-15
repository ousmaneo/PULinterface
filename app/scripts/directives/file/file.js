/**
 * Created by ousmanesamba on 6/15/15.
 */
angular.module('sbAdminApp')
    .directive('file', function () {
        return {
            require:"ngModel",
            restrict: 'A',
            link: function($scope, el, attrs, ngModel){
                el.bind('change', function(event){
                    var files = event.target.files;
                    var file = files[0];

                    ngModel.$setViewValue(file);
                    $scope.$apply();
                });
            }
        };
    });