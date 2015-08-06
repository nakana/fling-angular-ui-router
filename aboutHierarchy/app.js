angular.module('app', ['ngMaterial', 'ui.router'])
    .config(function($stateProvider, $urlRouterProvider, $locationProvider){
	$locationProvider.html5Mode({
	    enabled: true,
	    requireBase: false
	});
	$stateProvider
	.state('state1', {
	    url: '/aboutHierarchy/state1',
	    template: '<h1>State1</h1><div ui-view></div>',
	})
	.state('state1.a', {
	    url: '/?id',
	    template: 'UUID',
	})
	.state('state2', {
	    url: '/aboutHierarchy/state2',
	    template: '<h1>State2</h1>',
	})
	;
})
.controller('AppCtrl', function($scope, $mdSidenav,$state){
    $scope.viewModel = {
	aaa : false,
	bbb : false,
	ccc : true,
    };
    $scope.debug = function(){
    };
    $scope.toggleSidenav = function(menuId) {
	$mdSidenav(menuId).toggle();
    };

    $scope.$watch('viewModel', function(newValue, oldValue, scope){
	console.log('VIEW MODEL CHANGE!!');
	console.log(uuid.v4());
	console.log(newValue);
	console.log(oldValue);
	$state.go('state1.a', {id:uuid.v4()}); //OK
//	$state.go('state1({id:29})'); //NG
//	$state.go('state1');
    }, false);
    
});
