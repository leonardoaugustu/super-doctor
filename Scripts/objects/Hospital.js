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
    var Hospital = /** @class */ (function (_super) {
        __extends(Hospital, _super);
        // CONSTRUCTOR
        function Hospital() {
            var _this = _super.call(this, config.Game.HOSPITAL_ATLAS, "hospital") || this;
            _this.scaleX = 0.8;
            _this.scaleY = 0.8;
            _this.Start();
            return _this;
        }
        Object.defineProperty(Hospital.prototype, "musicSound", {
            // PUBLIC PROPERTIES
            get: function () {
                return this._musicSound;
            },
            enumerable: true,
            configurable: true
        });
        // PRIVATE METHODS
        Hospital.prototype._checkBounds = function () {
            var bounds = this.getTransformedBounds();
            if (bounds.x <= -(bounds.width / 2)) {
                this.Reset();
            }
        };
        Hospital.prototype._move = function () {
            this.position = objects.Vector2.add(this.position, this.velocity);
        };
        // PUBLIC METHODS
        Hospital.prototype.Start = function () {
            this.type = enums.GameObjectType.HOSPITAL;
            this._horizontalSpeed = -5; // -5 px per frame
            this.velocity = new objects.Vector2(this._horizontalSpeed, 0);
            this._musicSound = createjs.Sound.play("music");
            this._musicSound.loop = -1; // loop forever
            this._musicSound.volume = 0.2; // 10% volume
            this.Reset();
        };
        Hospital.prototype.Update = function () {
            this._move();
            this._checkBounds();
        };
        Hospital.prototype.Reset = function () {
            this.position = new objects.Vector2(0, 0);
        };
        return Hospital;
    }(objects.GameObject));
    objects.Hospital = Hospital;
})(objects || (objects = {}));
//# sourceMappingURL=Hospital.js.map