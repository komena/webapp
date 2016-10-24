'use strict';

/**
 * @ngdoc function
 * @name yapp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of yapp
 */
angular.module('yapp')
 .controller('new_paymentsCtrl',['$scope', '$location', 'webService', function($scope, $location, webService) {

      $scope.contacts = [];
      $scope.selectedContact = {};
    	webService.get('contacts')
    	.success(function(data, status, headers, config){
        console.log(data);
        $scope.contacts = data.data;
    		var header = headers();
    		console.log(header);
    		console.log(header['access-token']);
    	})
    	.error(function(data, status, headers, config) {
        console.log(data);
       console.log('Invalid credential');           
          })
      $scope.payments = [];
	    $scope.makePayment = function () {
	    	var postData = {
	    		recipient_id: $scope.selectedContact.id,
	    		amount: $scope.amount,
	    		reason: $scope.reason
	    	}
	    	console.log(postData);
	    	 $http.post('payments', postData)
	    	.success(function(data, status, headers, config){
	       console.log(data);
	        $scope.payments = data.data;
	    		var header = headers();
	    		console.log(header);
	    	 	console.log(header['access-token']);
	    	 })
	    	 .error(function(data, status, headers, config) {
	         console.log(data);          
	          });
	    }

	    $scope.selectContact = function(contact){
	    	$scope.selectedContact = contact;
	    }
    }
    ]);
