module scenes
{
    export class Play extends objects.Scene
    {
        // PRIVATE INSTANCE MEMBERS
        private _hospital?: objects.Hospital;
        private _doctor?: objects.Doctor;
        private _viruses: Array<objects.Virus>;

        private _scoreBoard: managers.ScoreBoard;
        private _bulletManager: managers.Bullet;
        private _keyboardManager: managers.Keyboard;

        // PUBLIC PROPERTIES

        // CONSTRUCTOR
        constructor()
        {
            super();

            this.Start();
        }

        // PRIVATE METHODS

        // PUBLIC METHODS

        //initialize and instatiate
        public Start(): void 
        {
            
            this._hospital = new objects.Hospital();
            this._doctor = new objects.Doctor();
            this._viruses = new Array<objects.Virus>(); 

            for (let index = 0; index < config.Game.VIRUS_NUM; index++) 
            {
                this._viruses.push(new objects.Virus());
            }
            
            this._scoreBoard = new managers.ScoreBoard();
            config.Game.SCORE_BOARD = this._scoreBoard;

            this._bulletManager = new managers.Bullet();
            config.Game.BULLET_MANAGER = this._bulletManager;

            this._keyboardManager = new managers.Keyboard();
            config.Game.KEYBOARD_MANAGER = this._keyboardManager;

             this.Main();
        }        
        
        public Update(): void {
            this._hospital.Update();
            this._doctor.Update();

            this._bulletManager.Update();

            this._viruses.forEach(virus => {
                virus.Update();
                managers.Collision.squaredRadiusCheck(this._doctor, virus);

                this._bulletManager.bulletPool.filter(b => b.isActive).forEach(bullet => {
                    managers.Collision.AABBCheck(virus, bullet);
                });
            });
        }
        
        public Main(): void 
        {
            this.addChild(this._hospital);
            this.addChild(this._doctor);

            this._bulletManager.AddBulletsToScene(this);

            for (const virus of this._viruses) {
                this.addChild(virus);
            }

            this.addChild(this._scoreBoard.LivesLabel);
            this.addChild(this._scoreBoard.ScoreLabel);
        }

        public Clean(): void
        {
            this._hospital.stop();
            this._hospital.musicSound.stop();
            this.removeAllChildren();
        }


    }

        
}