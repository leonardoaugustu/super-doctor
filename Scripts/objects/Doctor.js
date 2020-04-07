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
var objects;
(function (objects) {
    var Doctor = /** @class */ (function (_super) {
        __extends(Doctor, _super);
        // PUBLIC PROPERTIES
        // CONSTRUCTOR
        function Doctor() {
            var _this = _super.call(this, config.Game.TEXTURE_ATLAS, "doctor-run", 0, 0, false) || this;
            _this.Start();
            return _this;
        }
        // PRIVATE METHODS
        Doctor.prototype._checkBounds = function () {
            // left boundary
            if (this.position.x <= 0) {
                this.position = new objects.Vector2(0, this.position.y);
            }
            // right boundary
            if (this.position.x >= config.Game.SCREEN_WIDTH - this.width) {
                this.position = new objects.Vector2(config.Game.SCREEN_WIDTH - this.width, this.position.y);
            }
            // up and down boundary
            if (this._isJumping) {
                if (this.position.y <= 0) {
                    this.position = new objects.Vector2(this.position.x, 0);
                    this._isGoingUp = false;
                }
                else if (this.position.y > this.height) {
                    this._isJumping = false;
                    this.gotoAndPlay("doctor-run");
                }
            }
        };
        Doctor.prototype._move = function () {
            if ((config.Game.KEYBOARD_MANAGER.MoveLeft || config.Game.KEYBOARD_MANAGER.MoveRight)) {
                var newPositionX = (config.Game.KEYBOARD_MANAGER.MoveRight) ? this.position.x + this._horizontalSpeed
                    : this.position.x - this._horizontalSpeed;
                this.position = new objects.Vector2(newPositionX, this.position.y);
            }
            if (config.Game.KEYBOARD_MANAGER.Jump && !this._isJumping) {
                config.Game.KEYBOARD_MANAGER.Jump = false;
                this.gotoAndPlay("doctor-jump");
                this._isJumping = true;
                this._isGoingUp = true;
                this._jumpSound = createjs.Sound.play("jump");
                this._jumpSound.volume = 0.2; // 20% volume
            }
            if (this._isJumping) {
                var newPositionY = (this._isGoingUp) ? this.position.y - this._verticalSpeed
                    : this.position.y + this._verticalSpeed;
                this.position = new objects.Vector2(this.position.x, util.Mathf.Lerp(this.position.y, newPositionY, 0.75));
            }
            this._bulletSpawn = new objects.Vector2(this.position.x + this.width + 40, this.position.y + this.halfHeight - 47);
        };
        // PUBLIC METHODS
        Doctor.prototype.Start = function () {
            this.type = enums.GameObjectType.DOCTOR;
            this._verticalPosition = this.height; // locked to the bottom of the screen
            this._horizontalSpeed = 10;
            this._verticalSpeed = 20;
            this.position = new objects.Vector2(0, this._verticalPosition);
        };
        Doctor.prototype.Update = function () {
            this._move();
            this._checkBounds();
            // fire bullets every 10 frames
            if (createjs.Ticker.getTicks() % 10 == 0) {
                if (config.Game.KEYBOARD_MANAGER.Fire) {
                    this.FireBullets();
                    this._fireSound = createjs.Sound.play("bullet");
                    this._fireSound.volume = 0.2; // 20% volume
                }
            }
            //console.log("reacting to hit: " + this._isReactingToHit);
            if (this.isColliding && !this._isReactingToHit) {
                this._isReactingToHit = true;
                console.log("start reacting to hit: ");
            }
            if (this._isReactingToHit) {
                this.alpha *= 0.97;
                this.filters = [
                    new createjs.ColorFilter(0, 0, 0, 0.8, 255, 0, 0, 0)
                ];
                this.cache(0, 0, this.width, this.height);
                console.log("alpha: " + this.alpha);
            }
            if (this.alpha < 0.5) {
                this.alpha = 1.0;
                this._isReactingToHit = false;
                this.isColliding = false;
                this.filters = [];
                this.uncache();
                console.log("stop reacting");
            }
        };
        Doctor.prototype.Reset = function () {
        };
        Doctor.prototype.FireBullets = function () {
            var bullet = config.Game.BULLET_MANAGER.GetBullet();
            bullet.position = this._bulletSpawn;
        };
        return Doctor;
    }(objects.GameObject));
    objects.Doctor = Doctor;
})(objects || (objects = {}));
//# sourceMappingURL=Doctor.js.map