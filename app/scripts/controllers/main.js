'use strict';

angular.module('robotoPromotoApp')
    .controller('MainCtrl', function ($scope, $http) {
        function __smallChangeVal(val) {
            var new_val = Math.floor(100*Math.random());
            var plusOrMinus = Math.random() < 0.5 ? -1 : 1;
            var result = val[0]+new_val*plusOrMinus;
            if (parseInt(result) > 1000){
                return [val[0] - new_val]
            }
            if (parseInt(result) < 0){
                return [val[0] + new_val]
            }
            return [result];
        }
        function __generateDonuts() {
            Morris.Donut({
                element: 'morris_donut_1',
                data: [
                    {value: 70, label: 'zippyshare', formatted: '70%' },
                    {value: 15, label: 'torrents', formatted: '15%' },
                    {value: 10, label: 'blogs', formatted: '10%' },
                    {value: 5, label: 'other', formatted: '5%' }
                ],
                formatter: function (x, data) {
                    return data.formatted;
                }
            });
            Morris.Donut({
                element: 'morris_donut_2',
                data: [
                    {value: 20, label: 'T. Barrett', formatted: '20%' },
                    {value: 35, label: 'L. Larson', formatted: '35%' },
                    {value: 20, label: 'J. Powell', formatted: '20%' },
                    {value: 25, label: 'S. Martin', formatted: '25%' }
                ],
                formatter: function (x, data) {
                    return data.formatted;
                }
            });
            Morris.Donut({
                element: 'morris_donut_3',
                data: [
                    {value: 17, label: 'current', formatted: 'current' },
                    {value: 22, label: 'week', formatted: 'last week' },
                    {value: 10, label: 'month', formatted: 'last month' },
                    {value: 25, label: 'period', formatted: 'period' },
                    {value: 25, label: 'year', formatted: 'this year' }
                ],
                formatter: function (x, data) {
                    return data.formatted;
                }
            });
        }

        function __generateSparklines() {
            var sparkline_clients = [];
            for (var i = 0, l = 12; i < l; i++) {
                sparkline_clients.push(Math.round(Math.random() * l))
            }

            $('.bar').each(function () {
                $(this).sparkline(sparkline_clients.map(__smallChangeVal), {type: 'bar', barWidth: 5, highlightColor: '#000', barSpacing: 2, height: 30, stackedBarColor: '#6AA6D6'});
            });
            var sparkline_table = [
                [1, 341],
                [2, 464],
                [4, 564],
                [5, 235],
                [6, 335],
                [7, 535],
                [8, 642],
                [9, 342],
                [10, 765]
            ];
            $('.td-graph').each(function () {
                var arr = $.map(sparkline_table, function (val, index) {
                    return [
                        [val[0], __smallChangeVal([val[1]])]
                    ];
                });
                $(this).sparkline(arr,
                    {defaultPixelsPerValue: 10, minSpotColor: null, maxSpotColor: null, spotColor: null,
                        fillColor: false, lineWidth: 2, lineColor: '#5A8DB6'});
            });
        }

        function __generatePromotionPerformance() {
            var promotion_performance_data = [
                {"period": "ROB-001", "listened": 3407, "downloaded": 660},
                {"period": "ROB-002", "listened": 2446, "downloaded": 1005},
                {"period": "ROB-003", "listened": 1687, "downloaded": 804},
                {"period": "ROB-004", "listened": 2867, "downloaded": 1957},
                {"period": "ROB-005", "listened": 3976, "downloaded": 2456},
                {"period": "ROB-006", "listened": 784, "downloaded": 137},
                {"period": "ROB-007", "listened": 2437, "downloaded": 1783}
            ];
            Morris.Bar({
                element: 'promotion-performance',
                data: promotion_performance_data,
                xkey: 'period',
                ykeys: ['listened', 'downloaded'],
                labels: ['listened', 'downloaded'],
                xLabelAngle: 60
            });
        }

        __generateDonuts();
        __generateSparklines();
        __generatePromotionPerformance();
    });
