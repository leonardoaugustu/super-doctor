"use strict";
var managers;
(function (managers) {
    var Keyboard = /** @class */ (function () {
        // CONSTRUCTOR
        function Keyboard() {
            // PRIVATE INSTANCE MEMBERS
            // PUBLIC PROPERTIES
            this.MoveLeft = false;
            this.MoveRight = false;
            this.Fire = false;
            this.Jump = false;
            document.addEventListener("keydown", this._onkeyDown.bind(this), false);
            document.addEventListener("keyup", this._onKeyUp.bind(this), false);
        }
        // PRIVATE METHODS
        Keyboard.prototype._onkeyDown = function (event) {
            switch (event.keyCode) {
                case enums.Keys.UP_ARROW:
                    if (event.repeat)
                        return;
                    this.Jump = true;
                    break;
                case enums.Keys.LEFT_ARROW:
                    this.MoveLeft = true;
                    break;
                case enums.Keys.RIGHT_ARROW:
                    this.MoveRight = true;
                    break;
                case enums.Keys.SPACE:
                    this.Fire = true;
                    break;
            }
        };
        Keyboard.prototype._onKeyUp = function (event) {
            switch (event.keyCode) {
                case enums.Keys.UP_ARROW:
                    this.Jump = false;
                    break;
                case enums.Keys.LEFT_ARROW:
                    this.MoveLeft = false;
                    break;
                case enums.Keys.RIGHT_ARROW:
                    this.MoveRight = false;
                    break;
                case enums.Keys.SPACE:
                    this.Fire = false;
                    break;
            }
        };
        return Keyboard;
    }());
    managers.Keyboard = Keyboard;
})(managers || (managers = {}));
//# sourceMappingURL=Keyboard.js.map