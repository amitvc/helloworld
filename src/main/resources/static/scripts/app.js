(function(){
    var myApp = angular.module("myApp",["ngRoute"]);
     
    myApp.config(function($routeProvider) {
        $routeProvider.when("/", {
            templateUrl : "views/organizations.html",
            controller : "organizationController"
        })
        .when("/organizations", {
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