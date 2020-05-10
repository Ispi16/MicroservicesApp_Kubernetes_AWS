var app = angular.module('programming', []);
var socket = io.connect({transports:['polling']});

var bg1 = document.getElementById('background-stats-1');
var bg2 = document.getElementById('background-stats-2');

app.controller('statsCtrl', function($scope){
  $scope.aPercent = 12.5;
  $scope.bPercent = 12.5;
  $scope.cPercent = 12.5;
  $scope.dPercent = 12.5;
  $scope.ePercent = 12.5;
  $scope.fPercent = 12.5;
  $scope.gPercent = 12.5;
  $scope.hPercent = 12.5;

  var updateScores = function(){
    socket.on('scores', function (json) {
       data = JSON.parse(json);
       var a = parseInt(data.a || 0);
       var b = parseInt(data.b || 0);
       var c = parseInt(data.c || 0);
       var d = parseInt(data.d || 0);
       var e = parseInt(data.e || 0);
       var f = parseInt(data.f || 0);
       var g = parseInt(data.g || 0);
       var h = parseInt(data.h || 0);

       var percentages = getPercentages(a, b, c, d, e, f, g, h);

       bg1.style.width = percentages.a + "%";
       bg2.style.width = percentages.b + "%";
       bg1.style.width = percentages.c + "%";
       bg2.style.width = percentages.d + "%";
       bg1.style.width = percentages.e + "%";
       bg2.style.width = percentages.f + "%";
       bg1.style.width = percentages.g + "%";
       bg2.style.width = percentages.h + "%";

       $scope.$apply(function () {
         $scope.aPercent = percentages.a;
         $scope.bPercent = percentages.b;
         $scope.cPercent = percentages.c;
         $scope.dPercent = percentages.d;
         $scope.ePercent = percentages.e;
         $scope.fPercent = percentages.f;
         $scope.gPercent = percentages.g;
         $scope.hPercent = percentages.h;
         $scope.total = a + b + c + d + e + f + g + h;
       });
    });
  };

  var init = function(){
    document.body.style.opacity=1;
    updateScores();
  };
  socket.on('message',function(data){
    init();
  });
});

function getPercentages(a, b, c, d, e, f, g, h) {
  var result = {};

  if (a + b + c + d + e + f + g + h > 0) {
    result.a = Math.round(a / (a + b + c + d + e + f + g + h) * 100);
    result.b = Math.round(b / (a + b + c + d + e + f + g + h) * 100);
    result.c = Math.round(c / (a + b + c + d + e + f + g + h) * 100);
    result.d = Math.round(d / (a + b + c + d + e + f + g + h) * 100);
    result.e = Math.round(e / (a + b + c + d + e + f + g + h) * 100);
    result.f = Math.round(f / (a + b + c + d + e + f + g + h) * 100);
    result.g = Math.round(g / (a + b + c + d + e + f + g + h) * 100);
    result.h = 100 - result.a - result.b - result.c - result.d - result.e - result.f - result.g;
  } else {
    result.a = result.b = result.c = result.d = result.e = result.f = result.g = result.h = 12.5;
  }

  return result;
}