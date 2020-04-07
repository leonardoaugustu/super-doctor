module config
{
    export class Game
    {
        public static SCREEN_WIDTH:number = 1024;
        public static SCREEN_HEIGHT:number = 624;
        public static SCENE: scenes.State;
        public static ASSETS: createjs.LoadQueue;
        public static FPS: number = 60; // 60 Frames per second
        public static VIRUS_NUM: number = 4;
        public static LIVES: number = 15;
        public static SCORE: number = 0;
        public static HIGH_SCORE: number = 0;
        public static SCORE_BOARD: managers.ScoreBoard;
        public static BULLET_MANAGER: managers.Bullet;
        public static KEYBOARD_MANAGER: managers.Keyboard;
        public static TEXTURE_ATLAS: createjs.SpriteSheet;
        public static HOSPITAL_ATLAS: createjs.SpriteSheet;
    }
}