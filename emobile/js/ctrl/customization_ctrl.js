// 
// Here is how to define your module 
// has dependent on mobile-angular-ui
// 
var app = angular.module('emobile', [
  'ngRoute',
  'mobile-angular-ui',
  'mobile-angular-ui.gestures'
]);


app.config(function($routeProvider) {
  $routeProvider.when('/', {templateUrl: 'customization.html', controller:'customizationController', reloadOnSearch: false});
    $routeProvider.when('/msg1',        {templateUrl: 'customization_msg.html',controller:'msgController', reloadOnSearch: false});
});

app.controller('customizationController', function($rootScope, $scope,$http,$routeParams,$location){

    $("#loading").show();
	$http.get('http://app.studyingam.com/f/edu/customization').
	  success(function(data, status, headers, config) {
            $("#loading").hide();
            $scope.customizations = data;
  }).
  error(function(data, status, headers, config) {
            $("#loading").hide();
  });

  $scope.back = function(){
      $("#loading").hide();
    	window.history.go(-1);
    };
});

app.controller('msgController', function($rootScope, $scope,$http){
    $scope.postMsg = function(){

        $scope.user = JSON.parse(localStorage.getItem('user'));

        if($scope.title==undefined||$scope.title.trim()==''){
            swal("标题不能为空");
            return;
        }

        if($scope.content==undefined||$scope.content.trim()==''){
            swal("内容不能为空");
            return;
        }

        $("#loading").show();
        $http.get('http://app.studyingam.com/f/edu/question/save?euser.id='+$scope.user.id+'&msg='+$scope.content+'&title='+$scope.title).
            success(function(data, status, headers, config) {
                $("#loading").hide();
                if(data==true){
                    swal("提交成功");
                    window.history.back();
                }else{
                    swal("提交失败");
                }
            }).
            error(function(data, status, headers, config) {
                $("#loading").hide();
                swal("网络异常");
            });
    };

  $scope.back = function(){
    	window.history.go(-1);
    };

});



