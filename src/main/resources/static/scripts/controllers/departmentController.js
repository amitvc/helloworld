(function(){
    // $scope is the glue between application controller and the view.
    // Any items that you add in $scope will be available to the view that this controller is passed to.
    //$log is a Simple service for logging. Default implementation safely writes the message into the browser's console (if present)
    var departmentController = function($scope,$log, dataService) {
        $scope.gridOptions = {
            data: dataService.getDepartmentInfo(),
            columnDefs: [
            { name: 'name', displayName: "Department Name"},
            { name: 'number', displayName : "No of Employees"},
            ]
        };
        
       if(dataService.getOrganizationData() == undefined) {
           dataService.getData("/resource/organization").then(function(response) {
               $log.info("Call to /resource/organization completed. http status code " + response.status);
                dataService.setOrganizationData(response.data);
                $log.info(response.data);
               $scope.gridOptions.data = dataService.getDepartmentInfo();
            }, function(response) {
                $scope.status = response.status;
           });
       } else {
           $log.info("Already received data from server. Call the dataService to get organization data");
       }
    }
    
    // Each controller is responsible for setting itself with the myApp module.   
    angular.module("myApp").controller("departmentController",departmentController);
    departmentController.$inject = ['$scope','$log','dataService'];
    
})();