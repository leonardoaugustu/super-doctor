module scenes
{
    export class End extends objects.Scene
    {
        // PRIVATE INSTANCE MEMBERS
        private _gameOverLabel: objects.Label;
        private _restartButton: objects.Button;
        private _hospital: objects.Hospital;

        private _scoreBoard: managers.ScoreBoard;

        // PUBLIC PROPERTIES

        // CONSTRUCTOR
        constructor()
        {
            super();

            this.Start();
        }

        // PRIVATE METHODS

        // PUBLIC METHODS

        // Initializing and Instantiating
        public Start(): void 
        {
            this._gameOverLabel = new objects.Label("Game Over", "80px", "Consolas", "#000080", 512, 180, true);
             this._restartButton = new objects.Button("restart-button", 512, 430, true);
            
             this._hospital = new objects.Hospital();
             this._hospital.musicSound.volume=0.05;
             this._hospital.alpha = 0.6;
             this._hospital.velocity = new objects.Vector2(-0.5, 0);
 
             this._scoreBoard  = new managers.ScoreBoard();
             this._scoreBoard.HighScore = config.Game.HIGH_SCORE;
             this.Main();
        }        
        
        public Update(): void 
        {
            this._hospital.Update();
        }
        
        public Main(): void 
        {
            this.addChild(this._hospital);
            this.addChild(this._gameOverLabel);
            this.addChild(this._restartButton);

            this._restartButton.on("click", ()=> {
                config.Game.LIVES = 15;
                config.Game.SCORE = 0;
                config.Game.SCENE = scenes.State.PLAY;
            });

            this.addChild(this._scoreBoard.highScoreLabel);

        }

        public Clean(): void{
            this._hospital.musicSound.stop(); 
            this.removeAllChildren();
        }

        
    }
}