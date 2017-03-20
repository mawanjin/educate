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
  $routeProvider.when('/',              {templateUrl: 'suggestion.html', controller:'suggestionController', reloadOnSearch: false});
  $routeProvider.when('/msg/:type',        {templateUrl: 'suggestion_msg.html',controller:'msgController', reloadOnSearch: false});
});

app.controller('suggestionController', function($rootScope, $scope){
  $scope.back = function(){
    	window.history.go(-1);
    };
  
});

app.controller('msgController', function($rootScope, $scope,$http,$routeParams){


    $scope.back = function(){
            window.history.go(-1);
    };

    $scope.postMsg = function(){
        if($scope.title == undefined){
            swal("请输入标题");
            return;
        }else if($scope.content == undefined){
            swal("请输入内容");
            return;
        }
        $("#loading").show();
        //提交
        $http.get('http://app.studyingam.com/f/edu/suggestion/save?type='+$routeParams.type+'&title='+$scope.title+'&msg='+$scope.content).
            success(function(data, status, headers, config) {
                if(data==true){
                    $("#loading").hide();
                    window.history.go(-1);
                }else{
                    $("#loading").hide();
                }

            }).
            error(function(data, status, headers, config) {
                $("#loading").hide();
                swal('提交失败');
            });
    };

});
