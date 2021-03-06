angular.module('app', ['ngMaterial', 'ui.router'])
    .config(function($stateProvider, $urlRouterProvider, $locationProvider){
	$locationProvider.html5Mode({
	    enabled: true,
	    requireBase: false
	});
	$stateProvider
	    .state('prod', {
		url: '/aboutHierarchy2/analysis/prod',
		views: {
		    'left-menu': {
			templateUrl: '/aboutHierarchy2/views/analysis/prod-menu.html',
		    },
		    '': {
			template: "<h1>PROD</h1>",
		    },
		}
	    })
	    .state('prod.doc', {
		url: '/doc',
		views: {
		    'ana-menu@': {
			templateUrl: '/aboutHierarchy2/views/analysis/prod/doc-menu.html',
		    },
		    '@': {
			template: "<h1>DOC</h1>",
		    },
		}
	    })
	    .state('prod.nus', {
		url: '/nus',
		views: {
		    'ana-menu@': {
			templateUrl: '/aboutHierarchy2//views/analysis/prod/nus-menu.html',
		    },
		    '@': {
			template: "<h1>NUS</h1>",
		    },
		}
	    })
	    .state('prod.rad', {
		url: '/rad',
		views: {
		    'ana-menu@': {
			templateUrl: '/aboutHierarchy2/views/analysis/prod/rad-menu.html',
		    },
		    '@': {
			template: "<h1>RAD</h1>",
		    },
		}
	    })
	    .state('prod.rad.deep', {
		url: '/deep',
		views: {
		    'ana-menu@': {
			templateUrl: '/aboutHierarchy2/views/analysis/prod/deep-menu.html',
		    },
		    '@': {
			template: "<h1>DEEP</h1>",
		    },
		}
	    })
	    .state('qual', {
		url: '/aboutHierarchy2/qual',
		template: '<h1>Qual</h1><div ui-view></div>',
	    })
	;
    })
    .controller('AppCtrl', function($scope, $mdSidenav,$state){
	$scope.viewModel = {
	    aaa : false,
	    bbb : false,
	    ccc : true,
	};
	$scope.prod = function(){
	    $state.go('prod');
	};
	$scope.qual = function(){
	    $state.go('qual');
	};
	$scope.debug = function(){
	};
	$scope.toggleSidenav = function(menuId) {
	    $mdSidenav(menuId).toggle();
	};
    });
