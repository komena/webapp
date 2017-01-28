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
  	//$scope.email = 'ekan_umuerri@yahoo.co.uk';
  	//$scope.password = '00000000';
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
  .controller('SignupCtrl',['$scope', '$location', 'webService', '$localStorage', function($scope, $location, webService, localStorage) {
  	// $scope.email = 'ekan_umuerri@yahoo.co.uk';
  	// $scope.password = '00000000';
  	$scope.$storage = localStorage;
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
    		$scope.$storage.token = token;
    		var postData = {
	    		uid: $scope.$storage.token.Uid,
	    		fullname: $scope.fullname,
	    		email: $scope.email
	    	};
	    	webService.post('stripe/customer', postData)
	    	.success(function(data, status, headers, config){
	    		console.log("Success", data);
	    		$scope.$storage.token.customer_id = data.id;
	    		$location.path('/addBank');
	    	})
	    	.error(function(data, status, headers, config) {
             console.log("Error::", status);           
	          });
    	})
    	.error(function(data, status, headers, config) {
             alert('Invalid login');
             console.log(data);           
          })
    }
  }]);

   angular.module('yapp')
  .controller('addBankCtrl',['$scope', '$stateParams', '$location', 'webService', '$localStorage', function($scope, $stateParams, $location, webService, localStorage) {
  	// $scope.email = 'ekan_umuerri@yahoo.co.uk';
  	// $scope.password = '00000000';
    // Stripe Response Handler
    $scope.$storage = localStorage;
    console.log($scope.$storage.token.Uid);
    var customer_id = $scope.$storage.token.customer_id;
    console.log(customer_id);
	$scope.stripeCallback = function (code, result) {
	    if (result.error) {
	        window.alert('it failed! error: ' + result.error.message);
	    } else {
	    	var postData = {
	    		source: result.id,
	    		customer_id: customer_id
	    	};
	    	webService.post('stripe/customer/sources', postData)
	    	.success(function(data, status, headers, config){
	    		$location.path('/dashboard');
	    	})
	    	.error(function(data, status, headers, config) {
             console.log("Error::", status);           
	          });
	        console.log('success! token: ' + result.id);
	    }
	};
  }]);