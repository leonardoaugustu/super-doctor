"use strict";
var config;
(function (config) {
    var Game = /** @class */ (function () {
        function Game() {
        }
        Game.SCREEN_WIDTH = 1024;
        Game.SCREEN_HEIGHT = 624;
        Game.FPS = 60; // 60 Frames per second
        Game.VIRUS_NUM = 4;
        Game.LIVES = 15;
        Game.SCORE = 0;
        Game.HIGH_SCORE = 0;
        return Game;
    }());
    config.Game = Game;
})(config || (config = {}));
//# sourceMappingURL=game.js.map