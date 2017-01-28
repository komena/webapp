'use strict';

/**
 * @ngdoc function
 * @name yapp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of yapp
 */
var recipient_id;
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
	    	Stripe.card.createToken({
			  number: '4242424242424242',
			  cvc: '123',
			  exp_month: '02',
			  exp_year: '25'
			}, function(status, response){
				if (response.error) { // Problem!

				    // Show the errors on the form
				    // $form.find('.payment-errors').text(response.error.message);
				    // $form.find('button').prop('disabled', false); // Re-enable submission

				  } else { // Token was created!

				    // Get the token ID:
				    var token = response.id;

				    console.log(token);
				    var data = {
				    	stripe_token: token,
				    	recipient_id: recipient_id,
				    	amount: ($scope.amount * 100)
				    }
				    var url = 'stripe/charge_card';
				    webService.post(url, data).success(function(data, status, headers, config){
				    	console.log(data);
				    	webService.post('payments', postData)
				    	.success(function(data, status, headers, config){
				      //   $scope.payments = data.data;
				    		// var header = headers();
				    		// console.log(header);
				    	 // 	console.log(header['access-token']);
				    	 alert('Payment was successful');
				    	 })
				    	 .error(function(data, status, headers, config) {
				         console.log(data);          
				          });
				    });
				    console.log(response);

				    // Insert the token into the form so it gets submitted to the server:
				    //$form.append($('<input type="hidden" name="stripeToken" />').val(token));

				    // Submit the form:
				    //$form.get(0).submit();

				  }
			});
	    	/*
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
	    	 */
	    }

	    $scope.selectContact = function(contact){
	    	$scope.selectedContact = contact;
	    	recipient_id = contact.id;
	    }
    }
    ]);

function stripeResponseHandler(status, response) {
  // Grab the form:
  
  //var $form = $('#payment-form');

  if (response.error) { // Problem!

    // Show the errors on the form
    // $form.find('.payment-errors').text(response.error.message);
    // $form.find('button').prop('disabled', false); // Re-enable submission

  } else { // Token was created!

    // Get the token ID:
    var token = response.id;

    console.log(token);
    var data = {
    	stripe_token: token,
    	recipient_id: recipient_id,
    	amount: '500'
    }
    var url = 'stripe/charge_card';
    webService.post(url, data).then(function(d){
    	console.log(d.data);
    });
    console.log(response);

    // Insert the token into the form so it gets submitted to the server:
    //$form.append($('<input type="hidden" name="stripeToken" />').val(token));

    // Submit the form:
    //$form.get(0).submit();

  }
}