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
    var Play = /** @class */ (function (_super) {
        __extends(Play, _super);
        // PUBLIC PROPERTIES
        // CONSTRUCTOR
        function Play() {
            var _this = _super.call(this) || this;
            _this.Start();
            return _this;
        }
        // PRIVATE METHODS
        // PUBLIC METHODS
        //initialize and instatiate
        Play.prototype.Start = function () {
            this._hospital = new objects.Hospital();
            this._doctor = new objects.Doctor();
            this._viruses = new Array();
            for (var index = 0; index < config.Game.VIRUS_NUM; index++) {
                this._viruses.push(new objects.Virus());
            }
            this._scoreBoard = new managers.ScoreBoard();
            config.Game.SCORE_BOARD = this._scoreBoard;
            this._bulletManager = new managers.Bullet();
            config.Game.BULLET_MANAGER = this._bulletManager;
            this._keyboardManager = new managers.Keyboard();
            config.Game.KEYBOARD_MANAGER = this._keyboardManager;
            this.Main();
        };
        Play.prototype.Update = function () {
            var _this = this;
            this._hospital.Update();
            this._doctor.Update();
            this._bulletManager.Update();
            this._viruses.forEach(function (virus) {
                virus.Update();
                managers.Collision.squaredRadiusCheck(_this._doctor, virus);
                _this._bulletManager.bulletPool.filter(function (b) { return b.isActive; }).forEach(function (bullet) {
                    managers.Collision.AABBCheck(virus, bullet);
                });
            });
        };
        Play.prototype.Main = function () {
            this.addChild(this._hospital);
            this.addChild(this._doctor);
            this._bulletManager.AddBulletsToScene(this);
            for (var _i = 0, _a = this._viruses; _i < _a.length; _i++) {
                var virus = _a[_i];
                this.addChild(virus);
            }
            this.addChild(this._scoreBoard.LivesLabel);
            this.addChild(this._scoreBoard.ScoreLabel);
        };
        Play.prototype.Clean = function () {
            this._hospital.stop();
            this._hospital.musicSound.stop();
            this.removeAllChildren();
        };
        return Play;
    }(objects.Scene));
    scenes.Play = Play;
})(scenes || (scenes = {}));
//# sourceMappingURL=Play.js.map