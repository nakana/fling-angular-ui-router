angular.module('app', ['ngMaterial', 'ui.router'])
    .config(function($stateProvider, $urlRouterProvider, $locationProvider){
	$locationProvider.html5Mode({
	    enabled: true,
	    requireBase: false
	});
	$stateProvider
	.state('state1', {
	    url: '/fire/state1?id',
	    template: '<h1>State1</h1>{{message}}',
	    resolve: {
		gijiHTTP: function($q){
		    var deferred = $q.defer();
		    setTimeout(function(){
			deferred.resolve('DBからデータを取得した');
		    }, 3000);
		    return deferred.promise;
		},
	    },
	    controller: function($scope, gijiHTTP){
		$scope.message = gijiHTTP + ';;;aaa(' + $scope.viewModel.aaa + '), bbb(' + $scope.viewModel.bbb + '), ccc(' + $scope.viewModel.ccc + ')';
	    },
	})
	.state('state2', {
	    url: '/fire/state2',
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
    $scope.message = 'aaa(' + $scope.viewModel.aaa + '), bbb(' + $scope.viewModel.bbb + '), ccc(' + $scope.viewModel.ccc + ')';
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
	if(!angular.equals(oldValue, newValue)){
	    $state.go('state1', {id:uuid.v4()});
	}
    }, true);
    
});
