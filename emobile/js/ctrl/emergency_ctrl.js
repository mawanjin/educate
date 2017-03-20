// 
// Here is how to define your module 
// has dependent on mobile-angular-ui
// 
var app = angular.module('emobile', [
  'ngRoute',
  'mobile-angular-ui',
  'mobile-angular-ui.gestures'
]);

app.filter('trustHtml', function ($sce) {

        return function (input) {
            return $sce.trustAsHtml(input);
        }

    });

app.config(function($routeProvider) {
  $routeProvider.when('/',              {templateUrl: 'emergency.html', controller:'emergencyController', reloadOnSearch: false});  
  $routeProvider.when('/detail/:id',        {templateUrl: 'emergency_detail.html',controller:'detailController', reloadOnSearch: false});   
});

app.controller('detailController', function($rootScope, $scope,$http,$routeParams){

    for(var i=0;i<$rootScope.emergencys.length;i++){
        if($rootScope.emergencys[i].id == $routeParams.id){
            $scope.emergency = $rootScope.emergencys[i];
            break;
        }
    }

  $scope.deliberatelyTrustDangerousSnippet = function() {  
	return $sce.trustAsHtml($scope.snippet);  
  };  
  
  $scope.back = function(){
    	window.history.go(-1);
    };

});

app.controller('emergencyController', function($rootScope, $scope,$http){
    $("#loading").show();

	$http.get('http://app.studyingam.com/f/edu/emergency').
	  success(function(data, status, headers, config) {

            $rootScope.emergencys = data;
            $("#loading").hide();

	    
  }).
  error(function(data, status, headers, config) {
            $("#loading").hide();
            swal("网络异常,请重试(network error,please retry)")
  });
  
  $scope.back = function(){
    	window.history.go(-1);
    };
  
});
