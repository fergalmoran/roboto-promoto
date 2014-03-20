'use strict';

angular.module('robotoApp')
  .factory('Session', function ($resource) {
    return $resource('/api/session/');
  });
