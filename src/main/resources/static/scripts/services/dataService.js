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

        this.setOrganizationData = function(val) {
            this.organizationData = val;
        }

        this.getOrganizationInfo = function() {
            var orgData = [];

            if(this.organizationData != undefined) {
                var temp = {};
                temp.name = this.organizationData.orgName;
                temp.revenue = this.organizationData.revenue;
                temp.address = this.organizationData.address;
                orgData.push(temp);
            }

            return orgData;
        }

        this.getDepartmentInfo = function() {
            var deptData = [];

            if(this.organizationData != undefined) {
                for(var i=0; i < this.organizationData.departments.length; i++) {
                    var temp = {};
                    temp.name = this.organizationData.departments[i].name;
                    temp.number = this.organizationData.departments[i].employees.length;
                    deptData.push(temp);
                }
            }
            return deptData;
        }

        this.getEmployeeInfo = function() {
            var empData = [];
            if(this.organizationData != undefined) {
                for(var i=0; i < this.organizationData.departments.length; i++) {
                    for(var j=0; j < this.organizationData.departments[i].employees.length; j++){
                        var temp = {};
                        temp.department = this.organizationData.departments[i].name;
                        temp.name = this.organizationData.departments[i].employees[j].name;
                        temp.age = this.organizationData.departments[i].employees[j].age;
                        temp.sex = this.organizationData.departments[i].employees[j].sex;
                        empData.push(temp);
                    }
                 }
            }
            return empData;
        }

        this.setNewEmployee = function(data, refreshView) {
          if(this.organizationData != undefined) {
            for(var i=0; i < this.organizationData.departments.length; i++){
              if(data.departmentName == this.organizationData.departments[i].name) {
                var employee = {};
                employee.name = data.employeeName;
                employee.age = data.age;
                employee.sex = data.sex;
                var url = "/resource/department/"+data.departmentName;
                console.log(url);
                var self = this;
                self.counter = i;
                console.log("Sending new employee to backend service " + employee);
                this.postData(url, employee).then(function(response) {
                    $log.info("Call to /resource/department completed. http status code " + response.status);
                    self.organizationData.departments[self.counter].employees.push(employee);
                    refreshView();
                 }, function(response) {
                     console.log("Problme calling /resource/department " +response.status);
                });
              }
            }
          }
        }


        /**
         * This function is used to make a http get call to provided url.
         * The http.get call returns a promise(basically a callback function) which the caller needs to handle.
         * Either the http.get call will return success or error. The caller (typically your controller)
         * will call service methods like this. See e.g below
         * dataService.getData(some url).then(function(response){

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
