(function(){
    // All external dependencies we need should be injected during bootstrapping the app
    var myApp = angular.module("myApp",["ngRoute","ui.grid","ui.grid.exporter"]);
     
    myApp.config(function($routeProvider) {
        $routeProvider.when("/", {
            templateUrl : "views/organizations.html",
            controller : "organizationController"
        })
        .when("/organization", {
            templateUrl : "views/organizations.html",
            controller : "organizationController"
        })
        .when("/departments", {
            templateUrl : "views/departments.html",
            controller : "departmentController"
        })
        .when("/employees", {
            templateUrl : "views/employees.html",
            controller : "employeeController"
        })
        .otherwise({redirect:"/"});
                            
    });
})();