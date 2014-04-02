'use strict';

angular.module('robotoPromotoApp')
    .controller('PromotionsCtrl', function ($scope, $http) {

        // not mandatory, here as an example
        $scope.tblColumns = [
            { "sTitle": "Title" },
            { "sTitle": "Created" }
        ];

        // not mandatory, you can use defaults in directive
        $scope.overrideOptions = {
            "aaSorting": [
                [ 0, "asc" ]
            ],
            "sDom": "<'box-content'<'col-sm-6'f><'col-sm-6 text-right'l><'clearfix'>>rt<'box-content'<'col-sm-6'i><'col-sm-6 text-right'p><'clearfix'>>",
            "sPaginationType": "bootstrap",
            "oLanguage": {
                "sSearch": "",
                "sLengthMenu": '_MENU_'
            }
        };
        $scope.columnDefs = [
            { "sTitle": "Title",  "bSearchable": true, "mDataProp": "title", "aTargets": [0]},
            { "sTitle": "Date Created", "bSearchable": false, "mDataProp": "created", "aTargets": [1]}
        ];

        $scope.counter = 0;
        var pageSize = 100;
        var page = 1;
        $http.get('api/promotion?sort=created&limit=' + pageSize + '&skip=' + pageSize * (page - 1))
            .success(function (promotions) {
                $scope.promotionData = promotions.payload;
                $('select').select2();
            });
    });
