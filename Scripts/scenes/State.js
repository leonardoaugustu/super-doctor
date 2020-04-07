"use strict";
var scenes;
(function (scenes) {
    var State;
    (function (State) {
        State[State["NO_SCENE"] = -1] = "NO_SCENE";
        State[State["START"] = 0] = "START";
        State[State["HELP"] = 1] = "HELP";
        State[State["PLAY"] = 2] = "PLAY";
        State[State["END"] = 3] = "END";
        State[State["NUM_OF_SCENES"] = 4] = "NUM_OF_SCENES";
    })(State = scenes.State || (scenes.State = {}));
})(scenes || (scenes = {}));
//# sourceMappingURL=State.js.map