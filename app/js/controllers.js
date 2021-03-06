'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
    .controller('SimonController', ['$scope', '$timeout', 'GameGeneratorMovement',
        function ($scope, $timeout, GameGeneratorMovement) {

            $scope.Movements = ['blue', 'green', 'yellow', 'red'];
            $scope.GameMovements = [];
            $scope.UserMovements = [];
            $scope.GameFinished = false;
            $scope.Level = 800;
            $scope.Round = 0;

            $scope.StartGame = function () {
                $scope.Round = 1;
                $scope.Level = 800;
                $scope.GameFinished = false;
                $scope.GameMovements = [];
                $scope.UserMovements = [];
                $scope.AddGameMovement();
                $scope.StartAnimation();
            }

            $scope.AddGameMovement = function () {
                var nextMovement = GameGeneratorMovement.Get($scope.Movements);
                $scope.GameMovements.push(nextMovement);
            };

            $scope.AddUserMovement = function (movement) {
                if ($scope.AnimationInProgress || $scope.GameFinished)
                    return;

                $scope.movement = movement;
                $scope.UserMovements.push(movement);

                $timeout(function () {
                    $scope.movement = "";
                    $scope.ValidMovements($scope.GameMovements, $scope.UserMovements);
                }, 150)
            }

            $scope.ValidMovements = function (gameMovements, userMovements) {
                var validMovements = true;
                for (var i = 0; i <= userMovements.length - 1; ++i) {
                    if (gameMovements[i] != userMovements[i]) {
                        $scope.GameFinished = true;
                        validMovements = false;
                        return false;
                    }
                }
                if (validMovements && gameMovements.length == userMovements.length) {
                    $scope.Round += 1;
                    $scope.AddGameMovement();
                    $scope.StartAnimation();
                    $scope.UserMovements = [];
                }
            }

            $scope.StartAnimation = function () {
                $scope.AnimationInProgress = true;
                var GameMovementsLength = $scope.GameMovements.length;
                var position = 0;
					var ticker = function () {
                    if (position == GameMovementsLength)
                        $scope.AnimationInProgress = false;
                    if (position < GameMovementsLength) {
                        $scope.movement = $scope.GameMovements[position];
                        $timeout(function () {
                            $scope.movement = "";
                            $timeout(ticker, $scope.Level)
                        }, $scope.Level)
                    } else {
                        $scope.movement = "";
                        if ($scope.Level > 200)
                            $scope.Level -= 100;
                    }
                    position++;
                };
                $timeout(ticker, $scope.Level)
            }
        }
    ])