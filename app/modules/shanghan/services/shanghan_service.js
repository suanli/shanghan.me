define(['angular', '../module'], function (ng) {

  console.log("shanghan service");
  'use strict';

  ng.module('shanghan.services')
  .service('SSService', [
    '$http',
    function ($http) {

      return {

        example: function () {
          return $http.get('/shanghan')
            .then(function(response){
              return response.data;
            });
        }

      };

    }

  ]);

});
