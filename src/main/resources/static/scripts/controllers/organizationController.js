/**
 * Organization controller deals with organization view which is organizations.html.
 * This controller is responsible to use dataService object to make backend calls for fetching data,
 * updating data.
 *
 */
(function(){
    var organizationController = function($scope, $log){
        $scope.hello = "OrganizationController";
    }

    /**
     * Each controller is responsible for registering itself with the app main module which in our case is myApp.
     * See app.js for main module.
     * */
    angular.module("myApp").controller("organizationController",organizationController);
    //This is cleaner way to inject dependencies that this controller needs and also helps protect against js minifiers
    // obfuscating the names of the dependencies.
    organizationController.$inject = ["$scope", "$log"];
})();