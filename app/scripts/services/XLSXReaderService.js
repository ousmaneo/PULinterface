'use strict';

/**
 * @ngdoc service
 * @name childfundApp.XLSXReaderService
 * @description
 * # XLSXReaderService
 * Factory in the childfundApp.
 */
angular.module('sbAdminApp')
.factory("XLSXReaderService", ['$q', '$rootScope',
  function ($q, $rootScope) {
      var service = function (data) {
          angular.extend(this, data);
      }

      service.readFile = function (file, readCells, toJSON) {
          var deferred = $q.defer();

          XLSXReader(file, readCells, toJSON, function (data) {
              $rootScope.$apply(function () {
                  deferred.resolve(data);
              });
          });

          return deferred.promise;
      }


      return service;
  }
      ]);
