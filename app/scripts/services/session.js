'use strict';

angular.module('robotoPromotoApp')
    .factory('Session', function ($resource) {
        return $resource('/api/session/');
    });
