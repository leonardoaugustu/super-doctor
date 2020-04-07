module scenes {
    export class Help extends objects.Scene {
        // PRIVATE INSTANCE MEMBERS
        private _welcomeLabel: objects.Label;
        private _startButton: objects.Button;
        private _instructions: createjs.Bitmap;

        // PUBLIC PROPERTIES

        // CONSTRUCTOR
        constructor() {
            super();
            this.Start();
        }

        // PRIVATE METHODS

        // PUBLIC METHODS
        public Start(): void {
            this._welcomeLabel = new objects.Label("Game Instructions", "30px", "Consolas", "#000080", 512, 30, true);
            this._startButton = new objects.Button("play-button", 512, 550, true);
            this._instructions = new createjs.Bitmap(config.Game.ASSETS.getResult("help"));
            this._instructions.x = 200;
            this._instructions.y = 80;
            this.Main();
        }

        public Update(): void {
        
        }

        public Main(): void {
            this.addChild(this._instructions);
            this.addChild(this._welcomeLabel);
            this.addChild(this._startButton);

            this._startButton.on("click", () => {
                config.Game.SCENE = scenes.State.START;
            });

        }

        public Clean(): void {
            this.removeAllChildren();
        }


    }
}