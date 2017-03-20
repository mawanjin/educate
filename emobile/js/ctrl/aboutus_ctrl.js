// 
// Here is how to define your module 
// has dependent on mobile-angular-ui
// 
var app = angular.module('emobile', [
    'ngRoute'
    //'mobile-angular-ui',
    //'mobile-angular-ui.gestures'
]);

app.filter('trustHtml', function ($sce) {
    return function (input) {
        return $sce.trustAsHtml(input);
    }
});

app.config(function ($routeProvider,$httpProvider) {
    $routeProvider.when('/', {templateUrl: 'aboutus.html', controller: 'mainController', reloadOnSearch: false})

    .when('/setting_intro', {templateUrl: 'setting_intro.html', controller: 'introController', reloadOnSearch: false})

        .when('/setting_service11', {templateUrl: 'setting_service1s.html', controller: 'serviceController', reloadOnSearch: false})
        //.when('/setting_service11', {templateUrl: 'setting_service1s.html', controller: 'mainController', reloadOnSearch: false})
        .when('/setting_manager', {templateUrl: 'setting_manager.html', controller: 'mainController', reloadOnSearch: false})

        .when('/setting_guard', {templateUrl: 'setting_guard.html', controller: 'mainController', reloadOnSearch: false})
        .otherwise({
            redirectTo: '/'
        });

    $httpProvider.defaults.transformRequest = function(data){
        if (data === undefined) {
            return data;
        }
        return $.param(data);
    }
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
});

app.controller('mainController', function ($rootScope, $scope) {

    $scope.back = function () {
        window.history.go(-1);
    };

});

app.controller('introController', function ($rootScope, $scope) {

    $scope.back = function () {
        window.history.go(-1);
    };

});

app.controller('serviceController', function ($rootScope, $scope) {

    $scope.back = function () {
        window.history.go(-1);
    };

});



