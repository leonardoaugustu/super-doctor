module managers
{
    export class Keyboard
    {
        // PRIVATE INSTANCE MEMBERS

        // PUBLIC PROPERTIES
        public MoveLeft:boolean = false;
        public MoveRight:boolean = false;
        public Fire:boolean = false;
        public Jump:boolean = false;

        // CONSTRUCTOR
        constructor()
        {
            document.addEventListener("keydown", this._onkeyDown.bind(this), false);
            document.addEventListener("keyup", this._onKeyUp.bind(this), false);
        }

        // PRIVATE METHODS
        private _onkeyDown(event: KeyboardEvent):void
        {
            switch(event.keyCode)
            {
                case enums.Keys.UP_ARROW:
                    if (event.repeat) return;
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
        }

        private _onKeyUp(event: KeyboardEvent):void
        {
            switch(event.keyCode)
            {
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
        }

        // PUBLIC METHODS
    }
}