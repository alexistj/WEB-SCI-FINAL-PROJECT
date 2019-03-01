var app = angular.module("myApp", []);

app.directive("gameContainer", function () {
  return {
    restrict: "E",
    transclude: true,
    scope: {
      title: "@"
    },
    template: "<div style='border: 3px solid #000000'>" +
              "<div class='alert-box'>{{title}}</div>" +
              "<div ng-transclude></div></div>"
  };
});

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
