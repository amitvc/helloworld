(function() {
    // $scope is the glue between application controller and the view.
    // Any items that you add in $scope will be available to the view that this controller is passed to.
    //$log is a Simple service for logging. Default implementation safely writes the message into the browser's console (if presen
    var employeeController = function($scope, $log, dataService) {

        $scope.newEmployee = {};
        $scope.service = dataService;

        $scope.onSubmit = function() {
           console.log("From the employee view - "+$scope.newEmployee);
           dataService.setNewEmployee($scope.newEmployee).then(function(response) {
               $log.info("Call to /resource/department completed. http status code " + response.status);
               var employee = {};
               employee.name = $scope.newEmployee.employeeName;
               employee.age = $scope.newEmployee.age;
               employee.sex = $scope.newEmployee.sex;
               dataService.addNewEmployee($scope.newEmployee.departmentName,employee);
               $scope.gridOptions.data = dataService.getEmployeeInfo();
            }, function(response) {
                console.log("Problme calling /resource/department " +response.status);
           });
        }

        $scope.gridOptions = {
            enableFiltering: true,
            data: dataService.getEmployeeInfo(),
            columnDefs: [
            { name: 'department', displayName: 'Department'},
            { name: 'name', displayName: "Employee Name"},
            { name: 'age', displayName: "Age"},
            { name: 'sex', displayName: 'Sex'},
            ],
            enableGridMenu: true,
            exporterCsvFilename: 'employees.csv',
            exporterPdfDefaultStyle: {fontSize: 9},
        };

       if(dataService.getOrganizationData() == undefined) {
            dataService.getData("/resource/organization").then(function(response) {
               $log.info("Call to /resource/organization completed. http status code " + response.status);
                dataService.setOrganizationData(response.data);
                $log.info(response.data);
               $scope.gridOptions.data = dataService.getEmployeeInfo();
            }, function(response) {
                $scope.status = response.status;
           });
       }else {
           $log.info("Employee Controller already received data from server. Call the dataService to get organization data");
       }
    }

    // Each controller is responsible for setting itself with the myApp module
    angular.module("myApp").controller("employeeController",employeeController);
    employeeController.$inject = ['$scope','$log', 'dataService'];

})();
