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
  $routeProvider.when('/',              {templateUrl: 'activity.html', controller:'ActivityController', reloadOnSearch: false});  
  $routeProvider.when('/detail/:id',        {templateUrl: 'activity_detail.html',controller:'detailController', reloadOnSearch: false});   
});

app.controller('detailController', function($rootScope, $scope,$http,$routeParams){
    document.removeEventListener('touchmove',preTouchmove,false);

    for(var i=0;i<$rootScope.activitys.length;i++){
      if($rootScope.activitys[i].id==$routeParams.id){
        $scope.activity = $rootScope.activitys[i];
      }
    }

  $scope.deliberatelyTrustDangerousSnippet = function() {
	return $sce.trustAsHtml($scope.snippet);  
  };  
  
  $scope.back = function(){
    	window.history.go(-1);
    };

});

app.controller('ActivityController', function($rootScope, $scope,$http){
    $("#loading").show();
	$http.get('http://app.studyingam.com/f/edu/activity').
	  success(function(data, status, headers, config) {
          $rootScope.activitys = data;
            $("#loading").hide();
            setTimeout(function () {
                myScroll.refresh();
            }, 10);
	    
  }).
  error(function(data, status, headers, config) {
            $("#loading").hide();
            swal("网络异常,请重试(network error,please retry)");
  });
  
  $scope.back = function(){
    	window.history.go(-1);
    };

    document.addEventListener('touchmove', preTouchmove, false);
    var myScroll;
    $scope.$on('$viewContentLoaded', function() {
         myScroll = new IScroll('#wrapper', { mouseWheel: true, click: true });
    });

});

function preTouchmove(e){
    e.preventDefault();
}
