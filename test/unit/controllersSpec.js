'use strict';

/* jasmine specs for controllers go here */

describe('controllers', function(){
  beforeEach(module('myApp.controllers'));
 
   var scope, ctrl;

  beforeEach(module('myApp.controllers'));

    beforeEach(inject(function($controller) {
      scope = {};

      ctrl = $controller('SimonController', {$scope:scope,'GameGeneratorMovement':GameGeneratorMovementMock  });
    }));

  var GameGeneratorMovementMock = {
    Get: function(movements)
    {
      return "blue";
    }
  };

  it('Al iniciar el juego  este se debe inicializar', function($controller) {
     
     scope.StartGame();

     expect(scope.GameFinished).toBe(false);
     expect(scope.Movements.length).toBe(4);
     expect(scope.UserMovements.length).toBe(0);
     expect(scope.GameMovements.length).toBe(1);
     expect(scope.Level).toBe(800);
     expect(scope.Round).toBe(1);
  });
  



  it('Add user Movement', function($controller) {

      scope.StartGame();
      scope.AnimationInProgress = false;
      scope.AddUserMovement("red");
      expect(scope.movement).toBe("red");
      expect(scope.UserMovements.length).toBe(1);
      expect(scope.UserMovements[0]).toBe("red");
  });

   
  it('Al añadir un nuevo movimiento, se comprueba que es valido', function($controller) {
     

     scope.GameMovements.push("green");
     scope.GameMovements.push("red");

     scope.UserMovements.push("green");
    
     scope.ValidMovements(scope.GameMovements,scope.UserMovements);

     expect(scope.GameFinished).toBe(false)
     expect(scope.UserMovements.length).toBe(1)
   });

  it('Al añadir un nuevo movimiento erroneo, GameFinished == true', function($controller) {
     
     scope.GameMovements.push("green");
     scope.GameMovements.push("red");

     scope.UserMovements.push("yellow");
     
    
     scope.ValidMovements(scope.GameMovements,scope.UserMovements);
     expect(scope.GameFinished).toBe(true)
   });

   it('Al finalizar la secuencia, se añade un nuevo elemento en GameMovements', function($controller) {
     
     scope.GameMovements.push("green");
     scope.GameMovements.push("red");

     scope.UserMovements.push("green");
     scope.UserMovements.push("red");
    
     scope.ValidMovements(scope.GameMovements,scope.UserMovements);
     expect(scope.GameMovements.length).toBe(3)
     expect(scope.UserMovements.length).toBe(0)
   });


  it('Al finalizar la secuencia, se añade se incrementa la dificultad', function($controller) {
    


     scope.GameMovements.push("green");
     scope.GameMovements.push("red");

     scope.UserMovements.push("green");
     scope.UserMovements.push("red");
    
     scope.ValidMovements(scope.GameMovements,scope.UserMovements);
   

     expect(scope.UserMovements.length).toBe(0)
     expect(scope.Round).toBe(1)
     
   });


   it('Al finalizar el juego no se puede añadir nuevos moviemientos', function($controller) {
      
     
     scope.GameFinished = true;
     scope.AddUserMovement("red")
     expect(scope.UserMovements.length).toBe(0);
   
     
   });


 
});
