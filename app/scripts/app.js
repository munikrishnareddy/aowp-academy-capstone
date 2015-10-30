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
  .controller('JourneyOverviewCtrl', function ($scope, MyYelpAPI) {
    $scope.businesses = [];
    MyYelpAPI.retrieveYelp('', function(data) {
      $scope.businesses = data.businesses;
      console.log($scope.businesses);
    })
  })
  .factory("MyYelpAPI", function($http) {
    var count = 0;
    return {
      "retrieveYelp": function(name, callback) {
        var method = 'GET';
        var url = 'http://api.yelp.com/v2/search';
        var params = {
          callback: 'angular.callbacks._'+(count ++),
          location: 'San+Francisc',
          oauth_consumer_key: 'kQkIdv9NXoKRC3cv7lYbCg',
          oauth_token: 'kbLUg3MSgmxDtYczhcPVos_jXJW687_3',
          oauth_signature_method: "HMAC-SHA1",
          oauth_timestamp: new Date().getTime(),
          oauth_nonce: randomString(32, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'),
          term: 'food'
        };
        var consumerSecret = 'ZBm5d2C19pRE3UbET6XlJnW1U2g';
        var tokenSecret = 'n2-QgTBPFYjk42x71nDEz-XAMvw';
        var signature = oauthSignature.generate(method, url, params, consumerSecret, tokenSecret, { encodeSignature: false});
        params['oauth_signature'] = signature;
        $http.jsonp(url, {params: params}).success(callback);
      }
    }
  });

function randomString(length, chars) {
  var result = '';
  for (var i = length; i > 0; --i)
    result += chars[Math.round(Math.random() * (chars.length - 1))];
  return result;
}



