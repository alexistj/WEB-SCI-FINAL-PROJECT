var app = angular.module("myApp", []);

app.directive('verticalNavbar', function () {
    return {
      restrict: "E",
      replace: true,
      templateUrl: '/verticalNavbar.html',
      css: '/assets/css/verticalNavbar.css'
    }
});
app.component('verticalNavbarCollapse', {
  templateUrl: '/verticalNavbarCollapse.html',
});
