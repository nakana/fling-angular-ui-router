var passFlg = false;

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
	    controller: function($scope, gijiHTTP, $stateParams){
		console.log($stateParams.id);
		var vm = loadViewModelById($stateParams.id);
		console.log(vm);
		passFlg = true;
		$scope.viewModel.aaa = vm.aaa;
		$scope.viewModel.bbb = vm.bbb;
		$scope.viewModel.ccc = vm.ccc;
		passFlg = false;
		$scope.message = gijiHTTP + ';;;aaa(' + $scope.viewModel.aaa + '), bbb(' + $scope.viewModel.bbb + '), ccc(' + $scope.viewModel.ccc + ')';
	    },
	    onEnter: function($stateParams){
		console.log('ONENTER');
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
	if(!angular.equals(oldValue, newValue) && !passFlg){
	    var uu = uuid.v4();
	    saveViewModel(uu, newValue);
	    $state.go('state1', {id:uu});
	}
    }, true);
    
});
