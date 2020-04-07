module scenes {
    export class Start extends objects.Scene {
        // PRIVATE INSTANCE MEMBERS
        private _welcomeLabel: objects.Label;
        private _startButton: objects.Button;
        private _helpButton: objects.Button;
        private _hospital: objects.Hospital;

        // PUBLIC PROPERTIES

        // CONSTRUCTOR
        constructor() {
            super();
            this.Start();
        }

        // PRIVATE METHODS

        // PUBLIC METHODS
        public Start(): void {
            this._welcomeLabel = new objects.Label("Super Doctor", "80px", "Consolas", "#000080", 512, 180, true);
            this._startButton = new objects.Button("play-button", 512, 390, true);
            this._helpButton = new objects.Button("help-button", 512, 460, true);
            this._hospital = new objects.Hospital();
            this._hospital.musicSound.stop();
            this._hospital.alpha = 0.6;
            this._hospital.velocity = new objects.Vector2(-0.5, 0);
            this.Main();
        }

        public Update(): void {
            this._hospital.Update();
        }

        public Main(): void {
            this.addChild(this._hospital);
            this.addChild(this._welcomeLabel);
            this.addChild(this._startButton);
            this.addChild(this._helpButton);

            this._startButton.on("click", () => {
                config.Game.SCENE = scenes.State.PLAY;
            });
            this._helpButton.on("click", () => {
                config.Game.SCENE = scenes.State.HELP;
            });

        }

        public Clean(): void {
            this._hospital.musicSound.stop();
            this.removeAllChildren();
        }


    }
}