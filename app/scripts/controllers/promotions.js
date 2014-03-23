'use strict';

angular.module('robotoPromotoApp')
    .controller('PromotionsCtrl', function ($scope, $http) {
        $http.get('/api/promotions').success(function(promotions) {
            $scope.gridPromotions = {
                data: promotions,
                filterOptions: $scope.filterOptions
            };
        });
    });
