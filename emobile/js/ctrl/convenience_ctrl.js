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

// 
// You can configure ngRoute as always, but to take advantage of SharedState location
// feature (i.e. close sidebar on backbutton) you should setup 'reloadOnSearch: false' 
// in order to avoid unwanted routing.
// 
app.config(function($routeProvider) {
  $routeProvider.when('/',              {templateUrl: 'convenience.html', controller:'ConvenienceController', reloadOnSearch: false});  
  $routeProvider.when('/detail/:id',        {templateUrl: 'convenience_detail.html',controller:'detailController', reloadOnSearch: false});   
});

app.controller('detailController', function($rootScope, $scope,$http,$routeParams){

	for(var i=0;i<$rootScope.conveniences.length;i++){
      if($rootScope.conveniences[i].id == $routeParams.id){
        $scope.convenience = $rootScope.conveniences[i];
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

app.controller('ConvenienceController', function($rootScope, $scope,$http){
    $("#loading").show();

	$http.get('http://app.studyingam.com/f/edu/convenience').
	  success(function(data, status, headers, config) {
          $rootScope.conveniences = data;
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
