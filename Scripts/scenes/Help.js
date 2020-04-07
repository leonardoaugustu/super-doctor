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
    var Help = /** @class */ (function (_super) {
        __extends(Help, _super);
        // PUBLIC PROPERTIES
        // CONSTRUCTOR
        function Help() {
            var _this = _super.call(this) || this;
            _this.Start();
            return _this;
        }
        // PRIVATE METHODS
        // PUBLIC METHODS
        Help.prototype.Start = function () {
            this._welcomeLabel = new objects.Label("Game Instructions", "30px", "Consolas", "#000080", 512, 30, true);
            this._startButton = new objects.Button("play-button", 512, 550, true);
            this._instructions = new createjs.Bitmap(config.Game.ASSETS.getResult("help"));
            this._instructions.x = 200;
            this._instructions.y = 80;
            this.Main();
        };
        Help.prototype.Update = function () {
        };
        Help.prototype.Main = function () {
            this.addChild(this._instructions);
            this.addChild(this._welcomeLabel);
            this.addChild(this._startButton);
            this._startButton.on("click", function () {
                config.Game.SCENE = scenes.State.START;
            });
        };
        Help.prototype.Clean = function () {
            this.removeAllChildren();
        };
        return Help;
    }(objects.Scene));
    scenes.Help = Help;
})(scenes || (scenes = {}));
//# sourceMappingURL=Help.js.map