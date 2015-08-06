angular.module('StarterApp', ['ngMaterial', 'ui.router'])
    .config(function($stateProvider, $urlRouterProvider, $locationProvider){
	$locationProvider.html5Mode({
	    enabled: true,
	    requireBase: false
	});
//	$urlRouterProvider.when('/', '/ml');

	$stateProvider
	.state('resolve1', {
	    url: '/aboutCntl/resolve1',
	    resolve: { str: function() { return 'resolved!'; } },
	    controller: function($scope, str){ $scope.wao = str; },
	    template: '<h2>RESOLVE</h2>{{wao}}',
	})
	.state('resolve2', {
	    url: '/aboutCntl/resolve2',
	    resolve: { str: function($q) {
		var deferred = $q.defer();
		var span = 5;
		setTimeout(function(){
		    deferred.resolve('TIME PASSED(' + span + '秒経過しました...)');
		}, span * 1000);
		return deferred.promise;
	    }},
	    controller: function($scope, str){ $scope.wao = str; },
	    template: '<h2>RESOLVE</h2>{{wao}}',

	})
	.state('parent1', {
	    url: '/aboutCntl/parent1',
	    templateUrl: '/aboutCntl/parent.html',
	    controller: 'TargetCtrl',
	})
	;
})
    .controller('AppCtrl', function($scope, $mdSidenav, $state){
    sessionStorage.clear();
    sessionStorage.setItem('viewModel', JSON.stringify([$scope.viewModel]));
    $scope.debug = function(){
    };
    $scope.toggleSidenav = function(menuId) {
	$mdSidenav(menuId).toggle();
    };
    $scope.go = function(){
	$state.go('resolve1');
    }
})
.controller('TargetCtrl', function($scope){
    $scope.hoge = 'Hello';
})

;
