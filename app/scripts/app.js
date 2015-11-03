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
  .directive('itemList', function () {
    return {
    restrict : 'E',
    templateUrl : 'views/task.html',
    controller: 'JourneyOverviewCtrl'
  }
  })

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
        views: {
          '': {templateUrl: 'views/foodie-journal-wrapper.html'},
          'header@journeyOverview': {
            templateUrl: 'views/navbar.html',
            controller: 'NavBarCtrl',
            controllerAs: 'navbar'
          },
          'main@journeyOverview': {
            templateUrl: 'views/journey-overview.html'
          }
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
  .controller('JourneyCtrl', function ($scope, MyYelpAPI, categoryService) {
    categoryService.setCategory($scope.category);
    $scope.fetchYelpData = function (category) {
      categoryService.setCategory(category);
      MyYelpAPI.retrieveYelp('', category, categoryService.getCount(), function (data) {
        $scope.infos = data.businesses;
      })
    }
  })
  .controller('JourneyOverviewCtrl', function ($scope, MyYelpAPI, categoryService) {
    $scope.fetchYelpData = function (category) {

      $(".food-types-widget .food-type-buttons .btn").removeClass( "btn-primary" ).addClass( "btn-default" );
      $('.food-types-widget .food-type-buttons .'+category).removeClass( "btn-default" ).addClass( "btn-primary" );

      categoryService.setCategory(category);
      MyYelpAPI.retrieveYelp('', category, categoryService.getCount(), function (data) {
        $scope.infos = data.businesses;
      })
    }

    $scope.fetchYelpData(categoryService.getCategory());
  })


  .factory("MyYelpAPI", function($http) {
    return {
      "retrieveYelp": function(name, categoryFilter, count, callback) {
        var method = 'GET';
        var url = 'http://api.yelp.com/v2/search';
        var params = {
          callback: 'angular.callbacks._'+(count),
          location: 'New+York',
          oauth_consumer_key: 'kQkIdv9NXoKRC3cv7lYbCg',
          oauth_token: 'kbLUg3MSgmxDtYczhcPVos_jXJW687_3',
          oauth_signature_method: "HMAC-SHA1",
          oauth_timestamp: new Date().getTime(),
          oauth_nonce: randomString(32, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'),
          term: 'food',
          limit: 10
        };
        var consumerSecret = 'ZBm5d2C19pRE3UbET6XlJnW1U2g';
        var tokenSecret = 'n2-QgTBPFYjk42x71nDEz-XAMvw';
        params['category_filter'] = categoryFilter;
        var signature = oauthSignature.generate(method, url, params, consumerSecret, tokenSecret, { encodeSignature: false});
        params['oauth_signature'] = signature;

        $http.jsonp(url, {params: params}).success(callback);
      }
    }
  })

.service("categoryService", function() {
    var category = "";
    var count = 0;
    var setCategory = function(newObj) {
      category = newObj;
    };

    var getCategory = function(){
      return category;
    };

    var getCount = function(){
      return count++;
    };


    return {
      setCategory: setCategory,
      getCategory: getCategory,
      getCount: getCount
    };

  })

function randomString(length, chars) {
  var result = '';
  for (var i = length; i > 0; --i)
    result += chars[Math.round(Math.random() * (chars.length - 1))];
  return result;
}



