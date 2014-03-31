'use strict';

angular.module('robotoPromotoApp')
    .controller('PromotionsCtrl', function ($scope, $http) {
        $scope.filterOptions = {
            filterText: "",
            useExternalFilter: true
        };
        $scope.totalServerItems = 0;
        $scope.pagingOptions = {
            pageSizes: [5, 10, 20],
            pageSize: 5,
            currentPage: 1
        };

        $scope.setPagingData = function(data, total){
            $scope.promotionData = data;
            $scope.totalServerItems = total;
            if (!$scope.$$phase){
                $scope.$apply();
            }
        };
        $scope.getPagedDataAsync = function(pageSize, page, searchText){
            setTimeout(function(){
                var data;
                if (searchText){
                    var ft = searchText.toLowerCase();
                }else{
                    $http.get('api/promotion?sort=created&limit=' + pageSize + '&skip=' + pageSize * (page-1))
                        .success(function (promotions) {
                            $scope.setPagingData(promotions.payload, promotions.total);
                        });
                }
            }, 3000);
        };
        $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);
        $scope.$watch('pagingOptions', function(newVal, oldVal){
            if (newVal != oldVal && newVal.currentPage != oldVal.currentPage){
                $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
            }
        }, true);

        $scope.$watch('filterOptions', function(newVal, oldVal){
            if (newVal != oldVal){
                $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
            }
        }, true);

        $scope.gridPromotions = {
            data: 'promotionData',
            enablePaging: true,
            showFooter: true,
            totalServerItems: 'totalServerItems',
            pagingOptions: $scope.pagingOptions,
            filterOptions: $scope.filterOptions,
            columnDefs: [{field:'title', displayName:'Title'}, {field:'created', displayName:'Date Created'}]
        };
        
    });
