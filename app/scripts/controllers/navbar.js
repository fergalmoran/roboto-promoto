'use strict';

angular.module('robotoPromotoApp')
    .controller('NavbarCtrl', function ($scope, $location, Auth) {
        $scope.argle = 'Bargle'

        $scope.logout = function () {
            Auth.logout()
                .then(function () {
                    $location.path('/');
                });
        };
        $scope.isActive = function (route) {
            return route === $location.path();
        };
    });
