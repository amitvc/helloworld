(function(){
     angular.module("myApp",[]);
    
    var tracyController = function($scope, $http, $log) {
            $http.get("/employee").success(function(response) {
                $scope.records = response;
            }).error(function(response) {
                $log.error("Problem in calling config resource");
            });
    }
    
    var organizationController = angular.module("myApp").controller("organizationController",tracyController);
    organizationController.$inject = ['$scope', '$http','$log'];
    
})();