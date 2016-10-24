'use strict';

/**
 * @ngdoc function
 * @name yapp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of yapp
 */
angular.module('yapp')
  .controller('LoginCtrl',['$scope', '$rootScope', '$location', '$localStorage', 'webService', function($scope, $rootScope, $location, localStorage, webService) {
  	$scope.$storage = localStorage;
  	$scope.email = 'ekan_umuerri@yahoo.co.uk';
  	$scope.password = '00000000';
    $scope.submit = function() {
    	var data = {email: $scope.email, password: $scope.password};
    	console.log(data);
    	
    	var url = 'auth/sign_in';
    	webService.post(url, data)
    	.success(function(data, status, headers, config){
    		var header = headers();
    		var token = {
    			"Access-Token": header["access-token"],
	            "Client": header["client"],
	            "Expiry": header["expiry"],
	            "Token-Type": header["token-type"],
	            "Uid": header["uid"]
    		};
            $scope.$storage.token = token;
            // $rootScope.token = token;
            console.log($scope.$storage.token);
            webService.resetData();
            $location.path('/dashboard');
    	})
    	.error(function(data, status, headers, config) {
			alert('Invalid login');           
		})


      }
    

  }]);


  angular.module('yapp')
  .controller('SignupCtrl',['$scope', '$location', 'webService', function($scope, $location, webService) {
  	// $scope.email = 'ekan_umuerri@yahoo.co.uk';
  	// $scope.password = '00000000';
    $scope.register = function() {
    	var data = { name: $scope.fullname, email: $scope.email, password: $scope.password, password_confirmation: $scope.confirm_password };
    	console.log(data);
    	webService.post('auth', data)
    	.success(function(data, status, headers, config){
    		var header = headers();
    		var token = {
    			"Access-Token": header["access-token"],
	            "Client": header["client"],
	            "Expiry": header["expiry"],
	            "Token-Type": header["token-type"],
	            "Uid": header["uid"]
    		};
    		$location.path('/dashboard');
    	})
    	.error(function(data, status, headers, config) {
             alert('Invalid login');
             console.log(data);           
          })
    }
  }]);