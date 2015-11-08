(function(){
    // $scope is the glue between application controller and the view.
    // Any items that you add in $scope will be available to the view that this controller is passed to.
    //$log is a Simple service for logging. Default implementation safely writes the message into the browser's console (if present)
    var departMentController = function($scope,$log) {
        // Define different handle functions for this controller here.
    }
    
    // Each controller is responsible for setting itself with the myApp module.   
    angular.module("myApp").controller("departMentController",departMentController);
    departMentController.$inject = ['$scope','$log'];
    
})();