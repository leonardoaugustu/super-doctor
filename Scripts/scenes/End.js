"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var scenes;
(function (scenes) {
    var End = /** @class */ (function (_super) {
        __extends(End, _super);
        // PUBLIC PROPERTIES
        // CONSTRUCTOR
        function End() {
            var _this = _super.call(this) || this;
            _this.Start();
            return _this;
        }
        // PRIVATE METHODS
        // PUBLIC METHODS
        // Initializing and Instantiating
        End.prototype.Start = function () {
            this._gameOverLabel = new objects.Label("Game Over", "80px", "Consolas", "#000080", 512, 180, true);
            this._restartButton = new objects.Button("restart-button", 512, 430, true);
            this._hospital = new objects.Hospital();
            this._hospital.musicSound.volume = 0.05;
            this._hospital.alpha = 0.6;
            this._hospital.velocity = new objects.Vector2(-0.5, 0);
            this._scoreBoard = new managers.ScoreBoard();
            this._scoreBoard.HighScore = config.Game.HIGH_SCORE;
            this.Main();
        };
        End.prototype.Update = function () {
            this._hospital.Update();
        };
        End.prototype.Main = function () {
            this.addChild(this._hospital);
            this.addChild(this._gameOverLabel);
            this.addChild(this._restartButton);
            this._restartButton.on("click", function () {
                config.Game.LIVES = 15;
                config.Game.SCORE = 0;
                config.Game.SCENE = scenes.State.PLAY;
            });
            this.addChild(this._scoreBoard.highScoreLabel);
        };
        End.prototype.Clean = function () {
            this._hospital.musicSound.stop();
            this.removeAllChildren();
        };
        return End;
    }(objects.Scene));
    scenes.End = End;
})(scenes || (scenes = {}));
//# sourceMappingURL=End.js.map