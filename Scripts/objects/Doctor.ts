module objects
{
    export class Doctor extends GameObject
    {
        // PRIVATE INSTANCE MEMBERS
        private _verticalPosition:number;
        private _jumpSound : createjs.AbstractSoundInstance;
        private _fireSound : createjs.AbstractSoundInstance;
        private _bulletSpawn: objects.Vector2;
        private _horizontalSpeed: number;
        private _verticalSpeed: number;
        private _isJumping: boolean;
        private _isGoingUp: boolean;
        private _isReactingToHit: boolean;
        
        // PUBLIC PROPERTIES

        // CONSTRUCTOR
        constructor()
        {
            super(config.Game.TEXTURE_ATLAS, "doctor-run", 0, 0, false);

            this.Start();
        }

        // PRIVATE METHODS
        protected _checkBounds(): void 
        {
            // left boundary
            if(this.position.x <= 0)
            {
                this.position = new Vector2(0, this.position.y);
            }

            // right boundary
            if(this.position.x >= config.Game.SCREEN_WIDTH - this.width)
            {
                this.position = new Vector2(config.Game.SCREEN_WIDTH - this.width, this.position.y);
            }

            // up and down boundary
            if (this._isJumping)
            {
                if(this.position.y <= 0)
                {
                    this.position = new Vector2(this.position.x, 0);
                    this._isGoingUp = false;
                }
                else if (this.position.y > this.height)
                {
                    this._isJumping = false;
                    this.gotoAndPlay("doctor-run");
                }
            }
        }        

        private _move(): void
        {
            if((config.Game.KEYBOARD_MANAGER.MoveLeft || config.Game.KEYBOARD_MANAGER.MoveRight))
            {
                let newPositionX = 
                    (config.Game.KEYBOARD_MANAGER.MoveRight) ? this.position.x + this._horizontalSpeed 
                                                             : this.position.x - this._horizontalSpeed;

                this.position = new Vector2(newPositionX, this.position.y);
            }

            if(config.Game.KEYBOARD_MANAGER.Jump && !this._isJumping)
            {
                config.Game.KEYBOARD_MANAGER.Jump = false;
                this.gotoAndPlay("doctor-jump");
                this._isJumping = true;
                this._isGoingUp = true;
                this._jumpSound = createjs.Sound.play("jump");
                this._jumpSound.volume = 0.2; // 20% volume
            }

            if (this._isJumping)
            {
                let newPositionY = 
                    (this._isGoingUp) ? this.position.y - this._verticalSpeed 
                                      : this.position.y + this._verticalSpeed;

                this.position = new Vector2(this.position.x, util.Mathf.Lerp(this.position.y, newPositionY, 0.75));
            }

            this._bulletSpawn = new Vector2(this.position.x + this.width+40, this.position.y + this.halfHeight-47);
        }
        
        // PUBLIC METHODS
        public Start(): void 
        {
            this.type = enums.GameObjectType.DOCTOR;
            this._verticalPosition = this.height; // locked to the bottom of the screen
            this._horizontalSpeed = 10;
            this._verticalSpeed = 20;
            this.position = new objects.Vector2(0, this._verticalPosition);
        }

        public Update(): void 
        {
            this._move();
            this._checkBounds();

            // fire bullets every 10 frames
            if(createjs.Ticker.getTicks() % 10 == 0)
            {
                if(config.Game.KEYBOARD_MANAGER.Fire)
                {
                    this.FireBullets();
                    this._fireSound = createjs.Sound.play("bullet");
                    this._fireSound.volume = 0.2; // 20% volume
                        }
            }

            //console.log("reacting to hit: " + this._isReactingToHit);

            if (this.isColliding && !this._isReactingToHit)
            {
                this._isReactingToHit = true;
                console.log("start reacting to hit: ");
            }

            if (this._isReactingToHit)
            {
                this.alpha *= 0.97;

                this.filters = [
                    new createjs.ColorFilter(0,0,0,0.8, 255,0,0,0)
                ];
                this.cache(0,0, this.width, this.height);

                console.log("alpha: " + this.alpha);
            }

            if (this.alpha < 0.5) 
            {
                this.alpha = 1.0;
                this._isReactingToHit = false;
                this.isColliding = false;
                this.filters = [];
                this.uncache();
                console.log("stop reacting");
            }
            
        }

        public Reset(): void 
        {

        }

        public FireBullets(): void
        {
            let bullet = config.Game.BULLET_MANAGER.GetBullet();
            bullet.position = this._bulletSpawn;
        }

        
    }

}
