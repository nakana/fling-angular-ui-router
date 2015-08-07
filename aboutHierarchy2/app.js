angular.module('app', ['ngMaterial', 'ui.router'])
    .config(function($stateProvider, $urlRouterProvider, $locationProvider){
	$locationProvider.html5Mode({
	    enabled: true,
	    requireBase: false
	});
	$stateProvider
	    .state('prod', {
		url: '/aboutHierarchy2/prod',
		views: {
		    'left-menu': {
			templateUrl: 'prod-menu.html',
		    },
		    '': {
			template: "<h1>PROD</h1>",
		    },
		}
	    })
	    .state('prod.nus', {
		url: '/nus',
		views: {
		    'ana-menu@': {
			templateUrl: 'nus-menu.html',
		    },
		    '@': {
			template: "<h1>NUS</h1>",
		    },
		}
	    })
	    .state('prod.doc', {
		url: '/doc',
		views: {
		    'ana-menu@': {
			templateUrl: 'doc-menu.html',
		    },
		    '@': {
			template: "<h1>DOC</h1>",
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
