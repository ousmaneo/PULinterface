'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp')
  .controller('MainCtrl', function($scope,$position) {

  })
    .controller('StoreCtrl',['$scope','$position','$state','XLSXReaderService',function ($scope,$position,$state,XLSXReaderService) {
      console.log($state.params.id);
      $scope.data = [{"UPC":"test"," Short Description":"test","Long description":"test","Store Price":111111,"Metric (ea or lb) ":12,"Department":"Vegetables","Sub-department ":"Fresh","Synonyms":"legumes"},{"UPC":"test2"," Short Description":"test2","Long description":"test2","Store Price":12222,"Metric (ea or lb) ":43,"Department":"Vegetables","Sub-department ":"Fresh","Synonyms":"legumes"}];
       $scope.stores = [
         {id:1, name:'Store 1'},
         {id:2, name:'Store 2'},
         {id:3, name:'Store 3'}
       ];
        $scope.store  = {};
      $scope.saveStore = function (store) {
        console.log(store);
        store.id  = $scope.stores.length + 1;
        $scope.store = store;
        $scope.stores.unshift(store);
        $scope.store  = {};

      }


      if($state.params.id){
        $scope.store = _.find($scope.stores, function(chr) {
          return chr.id = $state.params.id;
        })

      };

      $scope.import = function (file) {

        $scope.isProcessing = true;
        $scope.sheets = [];
        $scope.excelFile = file;
        XLSXReaderService.readFile($scope.excelFile, true, false).then(function (xlsxData) {
          $scope.sheets = xlsxData.sheets;
          $scope.json_string = JSON.stringify($scope.sheets["Sheet1"], null, 2);
          $scope.json_string = $scope.parseExcelData($scope.json_string);

          $scope.data = $scope.json_string;
          console.log(JSON.stringify($scope.data));
        });
      }



      $scope.parseExcelData = function (json_string) {
        var excelData = JSON.parse(json_string);
        var headers = excelData.data[0];
        var array = [];
        for (var i = 1; i < excelData.data.length; i++) {
          var item = excelData.data[i];
          var element = {};
          for (var j = 0; j < item.length; j++) {
            if(item[j]!=null){
              var propertyName = headers[j];
              element[propertyName] = item[j];
            }
          }
          array.push(element);
        }
        var list = array;
        return list;
      }
    }]);

