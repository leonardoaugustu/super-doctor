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
    var Start = /** @class */ (function (_super) {
        __extends(Start, _super);
        // PUBLIC PROPERTIES
        // CONSTRUCTOR
        function Start() {
            var _this = _super.call(this) || this;
            _this.Start();
            return _this;
        }
        // PRIVATE METHODS
        // PUBLIC METHODS
        Start.prototype.Start = function () {
            this._welcomeLabel = new objects.Label("Super Doctor", "80px", "Consolas", "#000080", 512, 180, true);
            this._startButton = new objects.Button("play-button", 512, 390, true);
            this._helpButton = new objects.Button("help-button", 512, 460, true);
            this._hospital = new objects.Hospital();
            this._hospital.musicSound.stop();
            this._hospital.alpha = 0.6;
            this._hospital.velocity = new objects.Vector2(-0.5, 0);
            this.Main();
        };
        Start.prototype.Update = function () {
            this._hospital.Update();
        };
        Start.prototype.Main = function () {
            this.addChild(this._hospital);
            this.addChild(this._welcomeLabel);
            this.addChild(this._startButton);
            this.addChild(this._helpButton);
            this._startButton.on("click", function () {
                config.Game.SCENE = scenes.State.PLAY;
            });
            this._helpButton.on("click", function () {
                config.Game.SCENE = scenes.State.HELP;
            });
        };
        Start.prototype.Clean = function () {
            this._hospital.musicSound.stop();
            this.removeAllChildren();
        };
        return Start;
    }(objects.Scene));
    scenes.Start = Start;
})(scenes || (scenes = {}));
//# sourceMappingURL=Start.js.map