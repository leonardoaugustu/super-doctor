module objects
{
    export class Virus extends GameObject
    {
        // PRIVATE INSTANCE MEMBERS
        private _verticalSpeed?:number;
        private _horizontalSpeed?:number;

        // PUBLIC PROPERTIES

        // CONSTRUCTOR
        constructor()
        {
            let virusID = Math.floor(util.Mathf.RandomRange(1, 8));
            super(config.Game.TEXTURE_ATLAS, "virus-" + virusID, new Vector2(), false);

            this.Start();
        }

        // PRIVATE METHODS

        protected _checkBounds(): void 
        {
            if(this.y >= config.Game.SCREEN_HEIGHT + this.height)
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
            this.type = enums.GameObjectType.VIRUS;
            this.Reset();
        }
        
        public Update(): void 
        {
            this._move();
            this._checkBounds();
        }
        
        public Reset(): void 
        {
            // this._verticalSpeed = util.Mathf.RandomRange(5, 10);
            // this._horizontalSpeed = util.Mathf.RandomRange(-2, 2);

            this._verticalSpeed = util.Mathf.RandomRange(1, 2);
            this._horizontalSpeed = util.Mathf.RandomRange(-2, -2);
            this.velocity = new Vector2(this._horizontalSpeed, this._verticalSpeed);
            let randomY = util.Mathf.RandomRange(-this.height * 3, -this.height);
            this.position = new Vector2(config.Game.SCREEN_WIDTH, randomY);
        }

        
    }
}