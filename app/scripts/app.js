'use strict';

/**
 * @ngdoc overview
 * @name aowpAcademyCapstoneApp
 * @description
 * # aowpAcademyCapstoneApp
 *
 * Main module of the application.
 */
angular
  .module('aowpAcademyCapstoneApp', ['ui.router', 'ui.bootstrap'])
  .config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider
      .otherwise('/home');

    $stateProvider
      .state('home', {
        url: '/home',
        views: {
          '': {templateUrl: 'views/foodie-journal-wrapper.html'},
          'header@home': {
            templateUrl: 'views/header.html',
            controller: 'NavBarCtrl',
            controllerAs: 'home'
          },
          'main@home': {
            templateUrl: 'views/main.html',
            controller: 'HomeCtrl',
            controllerAs: 'home'
          }
        }
      })

      .state('journey', {
        url: '/journey',
        templateUrl: 'views/journey.html',
        views: {
          '': {templateUrl: 'views/foodie-journal-wrapper.html'},
          'header@journey': {
            templateUrl: 'views/navbar.html',
            controller: 'NavBarCtrl',
            controllerAs: 'navbar'
          },
          'main@journey': {
            templateUrl: 'views/journey.html',
            controller: 'JourneyCtrl',
            controllerAs: 'home'
          }
        }
      })

      .state('journeyOverview', {
        url: '/journeyOverview',
        controller: 'JourneyOverviewCtrl',
        controllerAs: 'journeyOverview',
        views: {
          '': {templateUrl: 'views/foodie-journal-wrapper.html'},
          'header@journeyOverview': {
            templateUrl: 'views/navbar.html',
            controller: 'NavBarCtrl',
            controllerAs: 'navbar'
          },
          'main@journeyOverview': {
            templateUrl: 'views/journey-overview.html',
            controller: 'JourneyOverviewCtrl',
            controllerAs: 'journeyOverview'
          }
        }
      })

      .state('journeyOverview.american', {
        templateUrl: 'views/journey-american.html',
        controller: function ($scope) {
          $scope.items = ['item 1', 'item 2', 'item 3'];
        }
      })

      .state('journeyOverview.italian', {
        templateUrl: 'views/journey-italian.html',
        controller: function ($scope) {
          $scope.items = ['item 1', 'item 2', 'item 3'];
        }
      })

      .state('journeyOverview.mexican', {
        templateUrl: 'views/journey-mexican.html',
        controller: function ($scope) {
          $scope.items = ['item 1', 'item 2', 'item 3'];
        }
      })

      .state('journeyOverview.japanese', {
        templateUrl: 'views/journey-japanese.html',
        controller: function ($scope) {
          $scope.items = ['item 1', 'item 2', 'item 3'];
        }
      })

      .state('journeyOverview.korean', {
        templateUrl: 'views/journey-korean.html',
        controller: function ($scope) {
          $scope.items = ['item 1', 'item 2', 'item 3'];
        }
      })

  })

  .controller('NavBarCtrl', function ($scope) {
    $scope.loginClick = function () {
      $('.login-window').fadeToggle().toggleClass('hide');
    }
    $scope.userNameClick = function () {
      $('.dropdown-menu').fadeToggle().toggleClass('hide');
    }
  })
  .controller('HomeCtrl', function ($scope) {

  })
  .controller('JourneyCtrl', function ($scope) {

  })
  .controller('JourneyOverviewCtrl', function ($scope, $http) {
    var url = "http://localhost:8000/search?location=New+York&term=restaurants&limit=10&category_filter=italian";
    $scope.result1;
    $http.jsonp(url)
      .success(function (response) {
        $scope.result1 = JSON.stringify(response.data);
      });
  });


