// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'algoliasearch'])

.run(function($ionicPlatform, $rootScope, AccountService) {

  AccountService.currentUser()
    .then(function(user) {
      $rootScope.user = user;
    })

  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });


})

.constant('$ionicLoadingConfig', {
  template: "<ion-spinner></ion-spinner>",
  hideOnStateChange : false
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  .state('tab.home', {
    url: '/home',
    views: {
      'tab-home': {
        templateUrl: 'templates/home.html',
        controller: 'HomeController as vm'
      }
    }
  })

  .state('tab.search', {
    url: '/search',
    views: {
      'tab-search': {
        templateUrl: 'templates/search.html',
        controller: 'SearchController as vm'
      }
    }
  })

  // setup an abstract state for the tabs directive
    // .state('home', {
    //   url: '/',
    //   templateUrl: 'templates/home.html'
    // })
    .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: "AccountController",
      controllerAs : "account"
    })
    .state('signup', {
      url: '/signup',
      templateUrl: 'templates/signup.html',
      controller: "AccountController",
      controllerAs : "account"
    })
    .state('tasks', {
      cache : false,
      url: '/tasks',
      templateUrl: 'templates/tasks.html',
      controller: "HomeController",
      controllerAs : "task"
    })
    .state('new', {
      url: '/new',
      templateUrl: 'templates/new.html',
      controller: "TaskController",
      controllerAs : "new"
    })
    .state('edit', {
      url: '/task/:id',
      templateUrl: 'templates/edit.html',
      controller: "TaskController",
      controllerAs : "edit"
    })



  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/search');

});