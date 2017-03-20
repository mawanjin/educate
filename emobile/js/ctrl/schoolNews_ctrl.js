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
  $routeProvider.when('/',              {templateUrl: 'schoolNews.html', controller:'schoolNewsController', reloadOnSearch: false});
  $routeProvider.when('/detail/:id',        {templateUrl: 'schoolNews_detail.html',controller:'detailController', reloadOnSearch: false});
  $routeProvider.when('/login',        {templateUrl: 'login.html',controller:'schoolNewsController', reloadOnSearch: false});
});

app.controller('detailController', function($rootScope, $scope,$http,$routeParams){

    for(var i=0;i<$rootScope.schoolNewses.length;i++){
        if($rootScope.schoolNewses[i].id == $routeParams.id){
            $scope.schoolNews = $rootScope.schoolNewses[i];
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

app.controller('schoolNewsController', function($rootScope, $scope,$http,$location){
  //Cookies.json = true;

  if(localStorage.getItem('login') == 'true'){
    $scope.user = JSON.parse(localStorage.getItem('user'));
      if($scope.user.school==null||$scope.user.school==undefined){
          return;
      }else{
          $scope.schoolName = $scope.user.school.name;
      }


  }else{
    $location.path("/login")
  }

    if($scope.user.school==null||$scope.user.school==undefined){

    }else{
        $("#loading").show();
        $http.get('http://app.studyingam.com/f/edu/schoolNews?schoolId='+$scope.user.school.id).
            success(function(data, status, headers, config) {
                $("#loading").hide();
                for(var i=0;i<data.length;i++){
                    if(data[i].img == ''){
                        data[i].img = "imgs/myschool_default_icon.png";
                    }
                }
                $rootScope.schoolNewses = data;

            }).
            error(function(data, status, headers, config) {
                $("#loading").hide();
            });
    }


  
  $scope.back = function(){
      $("#loading").hide();
    	window.history.go(-1);
    };

  $scope.login = function(){

    if($scope.loginName==undefined || $scope.loginName==""){
      alert("请输入用户名");
      return
    }

    if($scope.password==undefined || $scope.password==""){
      alert("请输入密码");
      return
    }

    $http.get('http://app.studyingam.com/f/edu/account/login?loginName='+$scope.loginName+'&password='+$scope.password).
        success(function(data, status, headers, config) {
          $scope.login_rs = data;
          if($scope.login_rs.rs==true){
            //存储用户信息
            Cookies.json = true;
            Cookies.set('login', true, { path: '/'});
            Cookies.set('user', $scope.login_rs.euser, { path: '/'});
            Cookies.set('guardian', $scope.login_rs.guardian, { path: '/'});
            window.history.back();

          }else{
            alert("用户名或密码错误");
            Cookies.put("login",false);
          }

        }).
        error(function(data, status, headers, config) {
          alert("登录失败")
        });
  };
  
});
