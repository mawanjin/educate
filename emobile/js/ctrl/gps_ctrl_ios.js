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

app.config(function ($routeProvider, $httpProvider) {
    $routeProvider.when('/', {templateUrl: 'gps.html', controller: 'gpsController', reloadOnSearch: false});
    $routeProvider.when('/login', {templateUrl: 'login.html', controller: 'loginController', reloadOnSearch: false});

    $httpProvider.defaults.transformRequest = function (data) {
        if (data === undefined) {
            return data;
        }
        return $.param(data);
    }
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
});

app.controller('gpsController', function ($rootScope, $scope, $http, $location) {

    //定位当前位置
    if (localStorage.getItem("login") == 'true') {
        $scope.user = JSON.parse(localStorage.getItem('user'));

        $("#loading").show();
        $http.get('http://app.studyingam.com/f/edu/gps?uid=' + $scope.user.id).
            success(function (data, status, headers, config) {
                $scope.gpses = data;
                if($scope.gpses.length>0){
                    $scope.gpsNow = data[0].location;
                }
                $("#loading").hide();
            }).
            error(function (data, status, headers, config) {
                $("#loading").hide();
            });

        //$http.get('http://47.90.52.122:8021/f/edu/gps?uid='+$scope.user.id).
        //    success(function (data, status, headers, config) {
        //        alert(data.length);
        //        $scope.gpses = data;
        //        $scope.gpsNow = data[0].location;
        //
        //    }).
        //    error(function (data, status, headers, config) {
        //        alert("获取失败");
        //    });

    } else {
        $location.path("/login");
    }

    $scope.back = function () {
        window.history.go(-1);
    };


    $scope.relocateGps = function () {

        $("#relocateContainer").html('定位中...');
        $scope.gpsNow = android.getLocation();

        //var url = 'http://47.90.52.122:8021/f/edu/gps/locate?uid='+$scope.user.id+"&address="+encodeURIComponent($scope.gpsNow);
        var postData = {uid: $scope.user.id, address: $scope.gpsNow};
        var config = {};
        $http.post('http://app.studyingam.com/f/edu/gps/locate', postData, config
        ).success(function (data, status, headers, config) {
                //成功之后做一些事情
                $scope.gpsNow = data;
                $("#relocateContainer").html('重新定位');
                swal('定位成功');
            }).error(function (data, status, headers, config) {
                $("#relocateContainer").html('重新定位');
                swal('定位失败');
            });


        //$http.get(url).
        //    success(function (data, status, headers, config) {
        //        $scope.gpsNow = data;
        //        $("#relocateContainer").html('重新定位');
        //        alert('定位成功');
        //    }).
        //    error(function (data, status, headers, config) {
        //        $("#relocateContainer").html('重新定位');
        //        alert('定位失败');
        //    });
    };

});

app.controller('loginController', function ($rootScope, $scope, $http) {
    Cookies.json = true;
    $scope.login = function () {

        if ($scope.loginName == undefined || $scope.loginName == "") {
            alert("请输入用户名");
            return
        }

        if ($scope.password == undefined || $scope.password == "") {
            alert("请输入密码");
            return
        }

        $http.get('http://app.studyingam.com/f/edu/account/login?loginName=' + $scope.loginName + '&password=' + $scope.password).
            success(function (data, status, headers, config) {
                $scope.login_rs = data;
                if ($scope.login_rs.rs == true) {
                    //存储用户信息
                    Cookies.set('login', true, {path: '/'});
                    //$cookieStore.put("login",true);
                    //$cookieStore.put("user",$scope.login_rs.euser);
                    Cookies.set('guardian', $scope.login_rs.guardian, {path: '/'});
                    Cookies.set('user', $scope.login_rs.euser, {path: '/'});
                    window.history.back();

                } else {
                    alert("用户名或密码错误");
                    Cookies.put("login", false);
                }

            }).
            error(function (data, status, headers, config) {
                alert("登录失败")
            });
    };


});

function updateCMD(data) {
    var userId = JSON.parse(localStorage.getItem('user')).id;
    $.post("http://adminapp.online-openday.com/f/edu/gps/locate",
        {
            uid: userId,
            address: data
        },
        function (data, status) {

        });

    $("#relocateContainer").html('重新定位');
    $("#cmd").html(data);

};
