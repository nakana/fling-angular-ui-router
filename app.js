angular.module('StarterApp', ['ngMaterial', 'ui.router'])
    .config(function($stateProvider, $urlRouterProvider, $locationProvider){
	$locationProvider.html5Mode({
	    enabled: true,
	    requireBase: false
	});
//	$urlRouterProvider.otherwise('/otherwise');
//    $urlRouterProvider.when('/state1', '/state2');
//    $urlRouterProvider.when('/state2', '/state2');
	$urlRouterProvider.when('/profile', '/profile.html');

	$stateProvider.state('state1', {
	    url: '/state1',
	    template: '<h1>State1</h1>',
	    onEnter: function(){
		console.log('ENTER!!');
	    },
	    onExit: function(){
		console.log('EXIT!!');
	    }
	}).state('state0hoge', {
	    url: '/state0?hoge',
	    template: '<h1>State0 HOGE {{hoge}}</h1>',
	    controller: function($scope, $stateParams){
		$scope.hoge = $stateParams.hoge;
	    },
	    onEnter: function(){
		console.log('STATE0 HOGE ENTER!!');
	    },
	    onExit: function(){
		console.log('STATE0 HOGE EXIT!!');
	    }
	}).state('state2', {
	    url: '/state2',
	    template: '<h1>State2</h1>',
	}).state('state3', {
	    url: '/s3/:id',
	    template: '<h1>State3{{id}}</h1>',
	    onEnter: function(){
		console.log('S3 ENTER!!');
		console.log(uuid.v4());
	    },
	    onExit: function(){
		console.log('S3 EXIT!!');
	    }
	}).state('profile', {
	    url: '/profile.html',
	    onEnter: function(){
		console.log('PROFILE!!');
		window.location.href = 'http://localhost:3000/profile.html';
	    }
	})
	;
})
.controller('AppCtrl', ['$scope', '$mdSidenav', function($scope, $mdSidenav){
    $scope.viewModel = {
	aaa : false,
	bbb : false,
	ccc : true,
    };
    sessionStorage.clear();
    sessionStorage.setItem('viewModel', JSON.stringify([$scope.viewModel]));
    $scope.save = function(){
    	var data = JSON.parse(sessionStorage.getItem('viewModel'));
    	data.push($scope.viewModel);
    	sessionStorage.setItem('viewModel', JSON.stringify(data));

    	// TODO TEST
    	saveViewModel(uuid.v4(), $scope.viewModel);
    };
    $scope.debug = function(){
	//	console.log($scope.viewModel);
	var data = JSON.parse(sessionStorage.getItem('viewModel'));
	console.log(data);

    };
    $scope.reset = function(){
	$scope.viewModel = {
	    aaa : false,
	    bbb : false,
	    ccc : false,
	};
    };
    $scope.toggleSidenav = function(menuId) {
	$mdSidenav(menuId).toggle();
    };

    $scope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
	console.log('@@@@@@@@@');
	console.log(event);
	console.log(toState);
	console.log(toParams);
	console.log(fromState);
	console.log(fromParams);

    });
    $scope.$watch('viewModel', function(newValue, oldValue, scope){
	console.log('CHANGE!!!!!');
	console.log(newValue);
	console.log(oldValue);
	console.log(scope);
	console.log('CHANGE!!!!!');
    }, true);

}]);
