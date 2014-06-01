'use strict';

/* Directives */


angular.module('myApp.directives', [])
.directive('sound', function($compile) {
 
 function link(scope, element, attrs) {
      scope.$watch(attrs.sound, function(value) {
    if(value != ""){
        element.empty();
          element.append("<audio autoplay><source src='sounds/" + value + ".ogg' type='audio/ogg' /><source src='sounds/" + value + ".mp3' type='audio/mp3' /></audio>")  
        }
      });
    }
  return {
      link: link
    };
});