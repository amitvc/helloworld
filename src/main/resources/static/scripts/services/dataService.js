/**
 * This service class is responsible to communicate with our backend services written in java.
 * The service is very basic right now as it performs simple http.get and http.post.
 * The service will also hold the model that drives the view. Always keep the models in the service classes
 * and not in controllers. The controllers should do bare minimum.
 * */
(function(){

    var dataService = function($http, $log) {

        // Initialize this variable to undefined. This will be fetched and populated by making call to the backend
        //service.

        this.organizationData = undefined;

        this.getOrganizationData = function() {
            return this.organizationData;
        }



        /**
         * This function is used to make a http get call to provided url.
         * The http.get call returns a promise(basically a callback function) which the caller needs to handle.
         * Either the http.get call will return success or error. The caller (typically your controller)
         * will call service methods like this. See e.g below
         * dataService.getData(someurl).then(function(response){

            },function(response){

            });
         **/
        this.getData = function(url) {
            return $http.get(url);
        }

        this.postData = function(url, data) {
            return $http.post(url,data);
        }

    }

    angular.module("myApp").service("dataService", dataService);

    dataService.$inject = ["$http","$log"];

})();