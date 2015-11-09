/**
 * Organization controller deals with organization view which is organizations.html.
 * This controller is responsible to use dataService object to make backend calls for fetching data,
 * updating data.
 *
 */
(function(){
    var organizationController = function($scope, $log, dataService) {
       $scope.gridOptions = {
            data: dataService.getOrganizationInfo(),
            columnDefs: [
            { name: 'name', displayName: "Company Name"},
            { name: 'revenue', displayName : "Revenue"},
            {name : "address", displayName : "Address"},
            ],
            enableGridMenu: true,
            exporterCsvFilename: 'organization.csv',
            exporterPdfDefaultStyle: {fontSize: 9},
        };
        
       if(dataService.getOrganizationData() == undefined) {
           dataService.getData("/resource/organization").then(function(response) {
               $log.info("Call to /resource/organization completed. http status code " + response.status);
                dataService.setOrganizationData(response.data);
                $log.info(response.data);
               $scope.gridOptions.data = dataService.getOrganizationInfo();
            }, function(response) {
                $scope.status = response.status;
           });
       } else {
           $log.info("Already received data from server. Call the dataService to get organization data");
       }
    }

    /**
     * Each controller is responsible for registering itself with the app main module which in our case is myApp.
     * See app.js for main module.
     * */
    angular.module("myApp").controller("organizationController",organizationController);
    //This is cleaner way to inject dependencies that this controller needs and also helps protect against js minifiers
    // obfuscating the names of the dependencies.
    organizationController.$inject = ["$scope", "$log","dataService"];
})();