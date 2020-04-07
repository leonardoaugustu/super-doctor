module objects
{
    export class Hospital extends GameObject
    {
        // PRIVATE INSTANCE MEMBERS
        private _horizontalSpeed?:number;
        private _musicSound : createjs.AbstractSoundInstance;

        // PUBLIC PROPERTIES
        get musicSound():createjs.AbstractSoundInstance
        {
            return this._musicSound;
        }

        // CONSTRUCTOR
        constructor()
        {
            super(config.Game.HOSPITAL_ATLAS, "hospital");

            this.scaleX = 0.8;
            this.scaleY = 0.8;

            this.Start();
        }

        // PRIVATE METHODS

        protected _checkBounds(): void 
        {
            let bounds = this.getTransformedBounds();

            if(bounds.x <= -(bounds.width / 2) )
            {
                this.Reset();
            }
        }       
        
        private _move():void
        {
            this.position = Vector2.add(this.position, this.velocity);
        }
        
        // PUBLIC METHODS
        public Start(): void
        {
            this.type = enums.GameObjectType.HOSPITAL;
            this._horizontalSpeed = -5; // -5 px per frame
            this.velocity = new Vector2(this._horizontalSpeed, 0);
            this._musicSound = createjs.Sound.play("music");
            this._musicSound.loop = -1; // loop forever
            this._musicSound.volume = 0.2; // 10% volume

            this.Reset();
        }
        
        public Update(): void 
        {
            this._move();
            this._checkBounds();
        }
        
        public Reset(): void 
        {
            this.position = new Vector2(0, 0);
        }

        
    }
}