/**
 * Organization controller deals with organization view which is organizations.html.
 * This controller is responsible to use dataService object to make backend calls for fetching data,
 * updating data.
 *
 */
(function(){
    var organizationController = function($scope, $log, dataService) {

      $scope.gridOptions = {
           data: $scope.orgData,
           columnDefs: [
           { name: 'name', displayName: "Company Name"},
           { name: 'revenue', displayName : "Revenue"},
           {name : "address", displayName : "Address"},
           ],
           enableGridMenu: true,
           exporterCsvFilename: 'appData.csv',
           exporterPdfDefaultStyle: {fontSize: 9},
       };

      if(dataService.getAppData() == undefined) {
          dataService.getData("/resource/config").then(function(response) {
              $log.info("Call to /resource/config completed. http status code " + response.status);
               dataService.setAppData(response.data);
               $log.info(response.data);
               $scope.gridOptions.data = dataService.getOrganizationInfo();
               $scope.orgData = dataService.getOrganizationInfo();

               // Default select the organization at index 0 when the UI loads up. Be careful if there is not organization
               // setup the code below will blow up.
               $scope.selectedOrgName = $scope.orgData[0].name;
           }, function(response) {
               $scope.status = response.status;
          });
      } else {
          $log.info("Already received data from server. Call the dataService to get organization data");
          $scope.gridOptions.data = dataService.getOrganizationInfo();
          $scope.orgData = dataService.getOrganizationInfo();
          $scope.selectedOrgName = dataService.getSelectedOrgName() == undefined ? $scope.orgData[0].name : dataService.getSelectedOrgName();
      }



      // This function gets called when the user selects the organization.
      $scope.organizationSelected = function() {
        // Update the dataService with the selected orgname so other controllers when they are loaded
        // can see which organization was selected. This is one way to store state across different controllers.
        // Another way is to use $rootScope which is global scope and is available from any controller.
        dataService.setSelectedOrgName($scope.selectedOrgName);
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
