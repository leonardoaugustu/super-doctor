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
    var Virus = /** @class */ (function (_super) {
        __extends(Virus, _super);
        // PUBLIC PROPERTIES
        // CONSTRUCTOR
        function Virus() {
            var _this = this;
            var virusID = Math.floor(util.Mathf.RandomRange(1, 8));
            _this = _super.call(this, config.Game.TEXTURE_ATLAS, "virus-" + virusID, new objects.Vector2(), false) || this;
            _this.Start();
            return _this;
        }
        // PRIVATE METHODS
        Virus.prototype._checkBounds = function () {
            if (this.y >= config.Game.SCREEN_HEIGHT + this.height) {
                this.Reset();
            }
        };
        Virus.prototype._move = function () {
            this.position = objects.Vector2.add(this.position, this.velocity);
        };
        // PUBLIC METHODS
        Virus.prototype.Start = function () {
            this.type = enums.GameObjectType.VIRUS;
            this.Reset();
        };
        Virus.prototype.Update = function () {
            this._move();
            this._checkBounds();
        };
        Virus.prototype.Reset = function () {
            // this._verticalSpeed = util.Mathf.RandomRange(5, 10);
            // this._horizontalSpeed = util.Mathf.RandomRange(-2, 2);
            this._verticalSpeed = util.Mathf.RandomRange(1, 2);
            this._horizontalSpeed = util.Mathf.RandomRange(-2, -2);
            this.velocity = new objects.Vector2(this._horizontalSpeed, this._verticalSpeed);
            var randomY = util.Mathf.RandomRange(-this.height * 3, -this.height);
            this.position = new objects.Vector2(config.Game.SCREEN_WIDTH, randomY);
        };
        return Virus;
    }(objects.GameObject));
    objects.Virus = Virus;
})(objects || (objects = {}));
//# sourceMappingURL=Virus.js.map