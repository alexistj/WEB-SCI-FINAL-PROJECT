var app = angular.module("myApp", []);

// app.directive("verticalNavbar", function() { // (1)
// return {
//   restrict: "E",         // (2)
//   replace: true,         // (3)
//   transclude: true,      // (4)
//   templateUrl: "navbar2.html"    // (5)
// }});

app.directive('verticalNavbar', function () {
    return {
      restrict: "E",
      replace: true,
      templateUrl: '/verticalNavbar.html',
      css: '/verticalNavbar.css'
    }
});
app.component('verticalNavbarCollapse', {
  templateUrl: '/verticalNavbarCollapse.html',
});
