angular
.module('app', ['ui.router'])
.config(function($stateProvider) {
  function Sleep( T ){ 
    var d1 = new Date().getTime(); 
    var d2 = new Date().getTime(); 
    while( d2 < d1 + 1000 * T ){    //T秒待つ 
      d2 = new Date().getTime(); 
    } 
    return; 
  }     
  $stateProvider
  .state('login', {
    url : '/login',
    templateUrl : '/aboutEventCall/login.html',
    onExit : function(){
      console.log('onExit!');
      console.log('onExitで20秒待ちます!');
      Sleep(20);
      console.log('onExitで20秒待ちました!');
//      setTimeout(function(){
//	console.log('20秒後のonExit');
//      }, 20000);
      
    },
  }).state('top', {
    url : '/top',
    onEnter : function(){
      console.log('onEnter');
      console.log('onEnterで10秒待ちます!');
      Sleep(10);
      console.log('onEneterで10秒待ちました!');
      // setTimeout(function(){
      // 	console.log('10秒後のonEnter');
      // }, 10000);
    },
    resolve : {
      data : function($q){
	console.log('resolve start!!');
	var deffered = $q.defer();
	console.log('resolveの中で4秒かかる処理を開始します');
	setTimeout(function(){
	  console.log('resolveの中で4秒かかる処理を終了します');
	  deffered.resolve('hello');
	}, 4000);
	console.log('resolve end!!');
	return deffered.promise;
      }
    },
    controller: function(data){
      console.log('controll!');
      console.log(data);
    },
    templateUrl : '/aboutEventCall/top.html',
  })
  ;
})
.controller('AppCtrl', function($scope, $state){
  $scope.goLogin = function(){
    $state.go('login');
  };
})
.controller('LoginCtrl', function($scope, $state){
  $scope.doLogin = function(){
    $state.go('top');
  };
})
;
	  
