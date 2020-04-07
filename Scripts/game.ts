//IIFE - Immediately Invoked Function Expression
//means -> self-executing anonymous function
let Game = (function(){

    // variable declarations
    let canvas:HTMLCanvasElement = document.getElementsByTagName('canvas')[0];
    let stage:createjs.Stage;
    
    let currentSceneState:scenes.State;
    let currentScene: objects.Scene;

    let assets: createjs.LoadQueue;

    let textureAtlas: createjs.SpriteSheet;
    let hospitalAtlas: createjs.SpriteSheet;

    let assetManifest = 
    [
        {id:"hospital", src:"./Assets/images/hospital.jpg"},
        {id:"atlas", src:"./Assets/sprites/atlas.png"},
        {id:"help", src:"./Assets/images/help.png"},
        {id:"music", src:"./Assets/audio/music.ogg"},
        {id:"bullet", src:"./Assets/audio/bullet.ogg"},
        {id:"hit-1", src:"./Assets/audio/hit-1.ogg"},
        {id:"hit-2", src:"./Assets/audio/hit-2.ogg"},
        {id:"damage", src:"./Assets/audio/damage.ogg"},
        {id:"jump", src:"./Assets/audio/jump.ogg"}
    ];

    let spriteData =
    {
        "images": {},
        "framerate": 20,
        "frames": [
            [1, 1, 276, 288, 0, 0, -6],
            [279, 1, 276, 243, 0, -7, -21],
            [557, 1, 272, 314, 0, -4, -3],
            [831, 1, 190, 169, 0, -17, -7],
            [279, 246, 272, 297, 0, -4, -18],
            [1, 291, 270, 304, 0, -9, -11],
            [1, 291, 270, 304, 0, -9, -11],
            [831, 172, 163, 57, 0, -5, -3],
            [831, 231, 163, 57, 0, -5, -3],
            [831, 290, 163, 57, 0, -5, -3],
            [553, 317, 270, 303, 0, -5, -12],
            [825, 349, 198, 160, 0, -9, -11],
            [825, 511, 197, 169, 0, -2, -6],
            [273, 545, 266, 304, 0, -9, -12],
            [1, 597, 264, 303, 0, -10, -12],
            [541, 622, 263, 307, 0, -13, -8],
            [267, 851, 253, 297, 0, -26, -18],
            [806, 682, 197, 165, 0, -13, -14],
            [806, 849, 196, 207, 0, -9, -1],
            [1, 902, 239, 304, 0, -37, -9],
            [522, 931, 236, 305, 0, -40, -10],
            [760, 1058, 227, 297, 0, -53, -18],
            [242, 1150, 195, 188, 0, -3, -6],
            [1, 1208, 113, 50, 0, -4, -5]
        ],

        "animations": {
            "doctor-run": { "frames": [13, 19, 20, 15, 14, 4, 16, 21, 6, 2, 10], speed: 0.23 },
            "doctor-jump": { "frames": [5] },
            "vaccine-shot": { "frames": [23] },
            "play-button": { "frames": [8] },
            "help-button": { "frames": [7] },
            "restart-button": { "frames": [9] },
            "virus-1": { "frames": [18] },
            "virus-2": { "frames": [0] },
            "virus-3": { "frames": [1] },
            "virus-4": { "frames": [11] },
            "virus-5": { "frames": [17] },
            "virus-6": { "frames": [22] },
            "virus-7": { "frames": [3] },
            "virus-8": { "frames": [12] },
        }

    };

    let hospitalData = 
    {
        "images": {},
        "frames": [
            [0, 0, 3200, 779, 0, 0, 0],
        ],
        "animations": {
            "hospital": { "frames": [0] },
        }
    }


    function Preload():void
    {
        assets = new createjs.LoadQueue(); // asset container
        config.Game.ASSETS = assets; // make a reference to the assets in the global config
        assets.installPlugin(createjs.Sound); // supports sound preloading
        assets.loadManifest(assetManifest);
        assets.on("complete", Start);
    }

    /**
     * This method initializes the CreateJS (EaselJS) Library
     * It sets the framerate to 60 FPS and sets up the main Game Loop (Update)
     */
    function Start():void
    {
        console.log(`%c Game Started!`, "color: blue; font-size: 20px; font-weight: bold;");
        stage = new createjs.Stage(canvas);
        createjs.Ticker.framerate = config.Game.FPS;
        createjs.Ticker.on('tick', Update);
        stage.enableMouseOver(20);

        spriteData.images = [assets.getResult("atlas")];
        textureAtlas = new createjs.SpriteSheet(spriteData);
        config.Game.TEXTURE_ATLAS = textureAtlas;

        hospitalData.images = [assets.getResult("hospital")];
        hospitalAtlas = new createjs.SpriteSheet(hospitalData);
        config.Game.HOSPITAL_ATLAS = hospitalAtlas;
        
        currentSceneState = scenes.State.NO_SCENE;
        config.Game.SCENE = scenes.State.START;
    }

    /**
     * This function is triggered every frame (16ms)
     * The stage is then erased and redrawn 
     */
    function Update():void
    {
        if(currentSceneState != config.Game.SCENE)
        {
            Main();
        }

        currentScene.Update();
        


        stage.update();
    }

    /**
     * This is the main function of the Game (where all the fun happens)
     *
     */
    function Main():void
    {
        console.log(`%c Scene Switched...`, "color: green; font-size: 16px;");

        // clean up
        if(currentSceneState != scenes.State.NO_SCENE)
        {
            currentScene.Clean();
            stage.removeAllChildren();
        }

        // switch to the new scene

        switch(config.Game.SCENE)
        {
            case scenes.State.START:
                console.log("switch to Start Scene");
                currentScene = new scenes.Start(); 
                break;
            case scenes.State.HELP:
                console.log("switch to Help Scene");
                currentScene = new scenes.Help(); 
                break;
            case scenes.State.PLAY:
                console.log("switch to Play Scene");
                currentScene = new scenes.Play(); 
                break;
            case scenes.State.END:
                console.log("switch to End Scene");
                currentScene = new scenes.End(); 
                break;
        }

        currentSceneState = config.Game.SCENE;
        stage.addChild(currentScene);

    }

    window.addEventListener('load', Preload);


})();