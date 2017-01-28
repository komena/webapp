'use strict';

/**
 * @ngdoc overview
 * @name yapp
 * @description
 * # yapp
 *
 * Main module of the application.
 */
angular
  .module('yapp', [
    'ui.router',
    'ngAnimate',
    'ngStorage',
    'angularPayments'
  ])
  
  .config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.when('/dashboard', '/dashboard/overview');
    

    $stateProvider
      .state('base', {
        abstract: true,
        url: '',
        templateUrl: 'views/base.html'
      })
      .state('general', {
          url: '/general',
          parent: 'base',
          templateUrl: 'views/general.html'
        })
        .state('login', {
          url: '/login',
          parent: 'base',
          templateUrl: 'views/login.html',
          controller: 'LoginCtrl'
        })
        .state('signup', {
          url: '/signup',
          parent: 'base',
          templateUrl: 'views/signup.html',
          controller: 'SignupCtrl'
        })
          .state('addBank', {
          url: '/addBank',
          parent: 'base',
          templateUrl: 'views/addBank.html',
          controller: 'addBankCtrl'
        })
        .state('dashboard', {
          url: '/dashboard',
          parent: 'base',
          templateUrl: 'views/dashboard.html',
          controller: 'DashboardCtrl'
        })
        .state('contacts', {
          url: '/contacts',
          parent: 'general',
          templateUrl: 'views/contacts/all-contacts.html',
          controller: 'ContactsCtrl'
        })
        .state('add_contacts', {
          url: '/add_contacts',
          parent: 'general',
          templateUrl: 'views/contacts/add-contacts.html',
          controller: 'AddContactCtrl'
        })
          .state('overview', {
            url: '/overview',
            parent: 'dashboard',
            templateUrl: 'views/dashboard/overview.html'
          })
          .state('settings', {
            url: '/settings',
            parent: 'base',
            templateUrl: 'views/dashboard/settings.html'

          })
          .state('new_payments', {
            url: '/new_payments',
            parent: 'general',
            templateUrl: 'views/payments/new_payments.html',
            controller: 'new_paymentsCtrl'
          })
          .state('reports', {
            url: '/reports',
            parent: 'general',
            templateUrl: 'views/dashboard/reports.html'
          });
          $urlRouterProvider.otherwise('/login');
         

  });
angular.module('yapp').factory('httpInterceptor', function httpInterceptor ($q, $window, $location) {
  return function (promise) {

      var success = function (response) {
          return response;
      };

      var error = function (response) {
          if (response.status === 401) {
            console.log('Invalid login details');
              // $location.url('/login');
          }

          return $q.reject(response);
      };

      return promise.then(success, error);
  };
});

angular.module('yapp').config(function($httpProvider) {
    $httpProvider.interceptors.push('httpInterceptor');
});

angular.module('yapp').config(function($windowProvider) {
    $windowProvider.$get().Stripe.setPublishableKey('pk_test_QdTeRzHzR2JDHKMxuXK1zKdn');
});