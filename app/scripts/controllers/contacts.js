angular.module('yapp')
  .controller('ContactsCtrl',['$scope', '$location', 'webService', function($scope, $location, webService) {
      
      $scope.contacts = [];
    	webService.get('contacts')
    	.success(function(data, status, headers, config){
        $scope.contacts = data.data;
    	})
    	.error(function(data, status, headers, config) {
        console.log(data);
       console.log('Invalid credential');           
          })
  }]);



  angular.module('yapp')
  .controller('AddContactCtrl',['$scope', '$location', 'webService', function($scope, $location, webService) {
       $scope.members = [];
      webService.get('members')
      .success(function(data, status, headers, config){
        console.log(data);
        $scope.members = data.data;
        var header = headers();
        console.log(data);
      })
      .error(function(data, status, headers, config) {
        console.log(data);
       console.log('Invalid credential');           
          })
      $scope.members = [];
      $scope.addContact = function (member) {
        var postData = {
          contact: {
              contact_id: member.id
            }
          }
        webService.post('contacts', postData)
        .success(function(data, status, headers, config){
          alert(member.name + " was added successfully");
        })
        .error(function(data, status, headers, config) {
          alert("Sorry, contact has already been added");       
            });
      }
    }
    ]);
 