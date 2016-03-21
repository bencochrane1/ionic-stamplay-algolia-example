angular.module('starter.controllers', [])

.controller('SearchController', ["TaskService", "$ionicLoading", "$rootScope", "$state", "SearchService", function(TaskService,  $ionicLoading, $rootScope, $state, SearchService) {
  var vm = this;

  vm.showCancel = false;

  var search = instantsearch({
    appId: 'Y3KUQGJC1Z',
    apiKey: '37bde7e896afa5b1ad075b1d96a1ca30',
    indexName: 'instant-search'
  });

  search.addWidget(
    instantsearch.widgets.searchBox({
      container: '#q',
      placeholder: 'Search a product'
    })
  );

  search.addWidget(
    instantsearch.widgets.stats({
      container: '#stats'
    })
  );

  search.on('render', function() {
    $('.product-picture img').addClass('transparent');
    $('.product-picture img').one('load', function() {
        $(this).removeClass('transparent');
    }).each(function() {
        if(this.complete) $(this).load();
    });
  });

  var hitTemplate =
    '<ion-item class="hit item-remove-animate item-avatar" type="item-text-wrap">' +
      '<img src="{{ image }}">' +
      '<p>{{{ _highlightResult.name.value }}}</p>' +
      '<p>{{{ _highlightResult.type.value }}}</p>' +
      '<p>${{ price }}</p>' +
      '<i class="icon ion-chevron-right icon-accessory"></i>' +
    '</ion-item>';

    // <ion-item class="item-remove-animate item-avatar item-icon-right" type="item-text-wrap">
    //   <img ng-src="http://www.fillmurray.com/200/300">
    //   <h2>Fill Murray</h2>
    //   <i class="icon ion-chevron-right icon-accessory"></i>
    // </ion-item>

  // var hitTemplate =
  //   '<article class="hit">' +
  //       '<div class="product-picture-wrapper">' +
  //         '<div class="product-picture"><img src="{{image}}" /></div>' +
  //       '</div>' +
  //       '<div class="product-desc-wrapper">' +
  //         '<div class="product-name">{{{_highlightResult.name.value}}}</div>' +
  //         '<div class="product-type">{{{_highlightResult.type.value}}}</div>' +
  //         '<div class="product-price">${{price}}</div>' +
  //         '<div class="product-rating">{{#stars}}<span class="ais-star-rating--star{{^.}}__empty{{/.}}"></span>{{/stars}}</div>' +
  //       '</div>' +
  //   '</article>';

  var noResultsTemplate =
    '<div class="text-center">No results found matching <strong>{{query}}</strong>.</div>';

  var menuTemplate =
    '<a href="javascript:void(0);" class="facet-item {{#isRefined}}active{{/isRefined}}"><span class="facet-name"><i class="fa fa-angle-right"></i> {{name}}</span class="facet-name"></a>';

    var menuTemplate =
      '<a>show some stuff</a>';

  var facetTemplateCheckbox =
    '<a href="javascript:void(0);" class="facet-item">' +
      '<input type="checkbox" class="{{cssClasses.checkbox}}" value="{{name}}" {{#isRefined}}checked{{/isRefined}} />{{name}}' +
      '<span class="facet-count">({{count}})</span>' +
    '</a>';

  var facetTemplateColors =
    '<a href="javascript:void(0);" data-facet-value="{{name}}" class="facet-color {{#isRefined}}checked{{/isRefined}}"></a>';

  search.addWidget(
    instantsearch.widgets.hits({
      container: '#hits',
      hitsPerPage: 16,
      templates: {
        empty: noResultsTemplate,
        item: hitTemplate
      },
      transformData: function(hit) {
        hit.stars = [];
        for (var i = 1; i <= 5; ++i) {
          hit.stars.push(i <= hit.rating);
        }
        return hit;
      }
    })
  );

  search.addWidget(
    instantsearch.widgets.pagination({
      container: '#pagination',
      cssClasses: {
        active: 'active'
      },
      labels: {
        previous: '<i class="fa fa-angle-left fa-2x"></i> Previous page',
        next: 'Next page <i class="fa fa-angle-right fa-2x"></i>'
      },
      showFirstLast: false
    })
  );

  // search.addWidget(
  //   instantsearch.widgets.hierarchicalMenu({
  //     container: '#categories',
  //     attributes: ['category', 'sub_category', 'sub_sub_category'],
  //     sortBy: ['name:asc'],
  //     templates: {
  //       item: menuTemplate
  //     }
  //   })
  // );

  // search.addWidget(
  //   instantsearch.widgets.refinementList({
  //     container: '#materials',
  //     attributeName: 'materials',
  //     operator: 'or',
  //     limit: 10,
  //     templates: {
  //       item: facetTemplateCheckbox,
  //       header: '<div class="facet-title">Materials</div class="facet-title">'
  //     }
  //   })
  // );

  // search.addWidget(
  //   instantsearch.widgets.refinementList({
  //     container: '#colors',
  //     attributeName: 'colors',
  //     operator: 'or',
  //     limit: 10,
  //     templates: {
  //       item: facetTemplateColors,
  //       header: '<div class="facet-title">Colors</div class="facet-title">'
  //     }
  //   })
  // );

  // search.addWidget(
  //   instantsearch.widgets.starRating({
  //     container: '#rating',
  //     attributeName: 'rating',
  //     templates: {
  //       header: '<div class="facet-title">Ratings</div class="facet-title">'
  //     }
  //   })
  // );

  // search.addWidget(
  //   instantsearch.widgets.priceRanges({
  //     container: '#prices',
  //     attributeName: 'price',
  //     cssClasses: {
  //       list: 'nav nav-list',
  //       count: 'badge pull-right',
  //       active: 'active'
  //     },
  //     templates: {
  //       header: '<div class="facet-title">Prices</div class="facet-title">'
  //     }
  //   })
  // );

  // search.addWidget(
  //   instantsearch.widgets.sortBySelector({
  //     container: '#sort-by-selector',
  //     indices: [
  //       {name: 'ikea', label: 'Featured'},
  //       {name: 'ikea_price_asc', label: 'Price asc.'},
  //       {name: 'ikea_price_desc', label: 'Price desc.'}
  //     ],
  //     label:'sort by'
  //   })
  // );

  // search.addWidget(
  //   instantsearch.widgets.clearAll({
  //     container: '#clear-all',
  //     templates: {
  //       link: '<i class="fa fa-eraser"></i> Clear all filters'
  //     },
  //     cssClasses: {
  //       root: 'btn btn-block btn-default'
  //     },
  //     autoHideContainer: true
  //   })
  // );

  search.start();

  SearchService.getInitialCategories()
  .then(function(res) {
    console.log(res);
  })
  .catch(function(err) {
    console.log(err);
  });

}])

.controller('AccountController', ["AccountService", "$state", "$rootScope", "$ionicLoading", "$ionicPopup", function(AccountService, $state, $rootScope, $ionicLoading, $ionicPopup) {

  var errorHandler = function(options) {
    var errorAlert = $ionicPopup.alert({
      title: options.title,
      okType : 'button-assertive',
      okText : "Try Again"
    });
  }

  var vm = this;

  vm.login = function() {
    $ionicLoading.show();
    Stamplay.User.login(vm.user)
    .then(function(user) {
      $rootScope.user = user;
      $state.go("tasks");
    }, function(error) {
      $ionicLoading.hide();
      errorHandler({
        title : "<h4 class='center-align'>Incorrect Username or Password</h4>"
      })
    })
  }

  vm.signup = function() {
    $ionicLoading.show();
    Stamplay.User.signup(vm.user)
    .then(function(user) {
      $rootScope.user = user;
      $state.go("tasks");
    }, function(error) {
      errorHandler({
        title : "<h4 class='center-align'>A Valid Email and Password is Required</h4>"
      })
      $ionicLoading.hide();
    })
  }

  vm.logout = function() {
    $ionicLoading.show();
    var jwt = window.location.origin + "-jwt";
    window.localStorage.removeItem(jwt);
    AccountService.currentUser()
    .then(function(user) {
      $rootScope.user = user;
      $ionicLoading.hide();
    }, function(error) {
      console.error(error);
      $ionicLoading.hide();
    })
  }
}])

.controller('HomeController', ["TaskService", "$ionicLoading", "$rootScope", "$state", function(TaskService,  $ionicLoading, $rootScope, $state) {
  var vm = this;

  var findIndex = function(id) {
    return vm.tasks.map(function(task) {
      return task._id;
    }).indexOf(id);
  }

  // Display loading indicator
  // $ionicLoading.show();

  vm.setActive = function(id) {
    vm.active = id;
  }

  function removeActive() {

  }

  // Fetch Tasks
  vm.fetch = function() {
    if(!$rootScope.user) {
      // Get all tasks for guests.
      TaskService.getGuestTasks()
      .then(
        function(response) {
          var tasks = response.data;
          vm.tasks = [];
          tasks.forEach(function(item, idx, array) {
            item.dt_create = new Date(item.dt_create).getTime();
            vm.tasks.push(array[idx]);
          });
          $ionicLoading.hide();
        }, function(error) {
          $ionicLoading.hide();
        })
      } else {
        // Get only the user signed in tasks.
        TaskService.getUsersTasks()
        .then(
          function(response) {
            var tasks = response.data;
            vm.tasks = [];
            tasks.forEach(function(item, idx, array) {
              item.dt_create = new Date(item.dt_create).getTime();
              vm.tasks.push(array[idx]);
            });
            $ionicLoading.hide();
          }, function(error) {
            $ionicLoading.hide();
          })
        }
      }



      // Mark Complete a task.
      vm.deleteTask = function(id) {
        $ionicLoading.show();
        vm.tasks.splice(findIndex(id), 1);
        TaskService.deleteTask(id)
        .then(function() {
          $ionicLoading.hide();
        }, function(error) {
          $ionicLoading.hide();
        })
      }

      vm.setStatus = function(task) {
        task.complete = task.complete ? !task.complete : true;
        TaskService.patchTask(task)
        .then(function(task) {
        }, function(error) {
        })
      }


    }])

.controller('TaskController', ["TaskService", "$ionicLoading", "$rootScope", "$state", "$stateParams", function(TaskService,  $ionicLoading, $rootScope, $state, $stateParams) {
  var vm = this;

  if($stateParams.id) {
    $ionicLoading.show();
    TaskService.getTask($stateParams.id)
      .then(function(task) {
        $ionicLoading.hide();
        vm.task = task.data[0];
      }, function(err) {
        $ionicLoading.hide();
        console.error(err);
      })
  }

  // Add a task.
  vm.add = function() {
    $ionicLoading.show();
    TaskService.addNew(vm.task)
    .then(function(task) {
      $ionicLoading.hide();
      $state.go("tasks", {}, { reload: true });
    }, function(error) {
      $ionicLoading.hide();
    })
  }

  vm.save = function() {
    $ionicLoading.show();
    TaskService.updateTask(vm.task)
    .then(function(task) {
      $ionicLoading.hide();
      $state.go("tasks", {}, { reload: true });
    }, function(error) {
      $ionicLoading.hide();
    })
  }





}])
