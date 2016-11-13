angular.module('wifiUffLocation')
    .controller("DepartmentSearchController", ["$state", "$stateParams", "Department", function($state, $stateParams, Department) {
        var ctrl = this;
        ctrl.loading = false;
        ctrl.department = null;

        ctrl.typeaheadDepartment = function(value) {
            return Department.typeahead(value);
        };

        ctrl.typeaheadSelected = function(department) {
          ctrl.loadDeparment(department.id);
        };

        ctrl.loadDeparment = function(departmentId){
          Department.get(departmentId)
              .success(function(department) {
                  ctrl.department = department.name;
                  if (department.map_url) {
                      $state.go("root.departments.map", {
                          department_id: department.id
                      });
                  } else {
                      $state.go("root.departments.upload_map", {
                          department_id: department.id
                      });
                  };
              });
        }

        if ($stateParams.department_id){
          ctrl.loadDeparment($stateParams.department_id);
        };

    }]);
