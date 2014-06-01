'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', []).factory('GameGeneratorMovement', function()
  	{	
  		return{
    		Get : function(Movements) {
    		var nextMovement = Movements[Math.floor(Math.random()*Movements.length)];
    		return nextMovement;
    	}
 	}
  });
