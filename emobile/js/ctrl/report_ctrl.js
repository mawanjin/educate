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
  $routeProvider.when('/',              {templateUrl: 'report.html', controller:'reportController', reloadOnSearch: false});
  $routeProvider.when('/list/:id',        {templateUrl: 'report_list.html',controller:'listController', reloadOnSearch: false});
  $routeProvider.when('/detail/:id',        {templateUrl: 'report_detail.html',controller:'detailController', reloadOnSearch: false});
});

app.controller('detailController', function($rootScope, $scope,$http,$routeParams){

    for(var i=0;i<$rootScope.reports.length;i++){
      if($rootScope.reports[i].id==$routeParams.id){
        $scope.report = $rootScope.reports[i];
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

app.controller('listController', function($rootScope, $scope,$http,$routeParams){

    $scope.user =   JSON.parse(localStorage.getItem('user'));
    $scope.type = $routeParams.id;

    var oGuardian = localStorage.getItem('guardian');

    //if(oGuardian == undefined||oGuardian=='undefined'){

    if($scope.user.loginName=='admin'){
        $("#img").show();
        if($routeParams.id==0){
            $("#img").attr("src","imgs/report_week.jpg");
        }else if($routeParams.id==1){
            $("#img").attr("src","imgs/month_week.jpg");
        }else if($routeParams.id==2){
            $("#img").attr("src","imgs/report_sem.jpg");
        }else if($routeParams.id==3){
            $("#img").attr("src","imgs/report_year.jpg");
        }
        return;
    }

    //$scope.guardian = JSON.parse(oGuardian);

    $("#loading").show();
	$http.get('http://app.studyingam.com/f/edu/report/list?type='+$routeParams.id+'&uid='+$scope.user.id).
	//$http.get('http://172.20.0.79:8080/edu/f/edu/report/list?type=0&uid=0491ea60d3b74ded8dee3d62fe96e2a1').
	  success(function(data, status, headers, config) {
            $("#loading").hide();
          $rootScope.reports = data;

  }).
  error(function(data, status, headers, config) {
            $("#loading").hide();
            swal("网络异常,请重试(network error,please retry)");
  });

  $scope.deliberatelyTrustDangerousSnippet = function() {
	return $sce.trustAsHtml($scope.snippet);
  };

  $scope.back = function(){
    	window.history.go(-1);
    };

});

app.controller('reportController', function($rootScope, $scope,$http){

  $scope.back = function(){
    	window.history.go(-1);
    };
  
});
