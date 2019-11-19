interface Player {
    playerName: string,
    score: number
}

class Game {
    // Global attributes for canvas
    // Readonly attributes are read-only. They can only be initialized in the constructor
    private readonly canvas: HTMLCanvasElement; 
    private readonly ctx: CanvasRenderingContext2D;

    // Some global player attributes
    private readonly player: string;
    private readonly score: number;
    private readonly lives: number;
    private readonly highscores: Array<Player>;

    private startScreen: StartScreen;
    private gameScreen: GameScreen;
    private titleScreen: TitleScreen;
    private currentScreen: StartScreen | GameScreen | TitleScreen | string;

    private keyboardListener: KeyboardListener;

    public constructor(canvasId: HTMLCanvasElement) {
        // Construct all of the canvas
        this.canvas = canvasId;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        // Set the context of the canvas
        this.ctx = this.canvas.getContext('2d');

        this.player = "Player one";
        this.score = 400;
        this.lives = 3;
        
        this.keyboardListener = new KeyboardListener();


        // All screens: uncomment to activate
        this.startScreen = new StartScreen(this.canvas, this.ctx);
        this.currentScreen = this.startScreen;

        // this.gameScreen = new GameScreen(this.canvas, this.ctx);

        // this.titleScreen = new TitleScreen(this.canvas, this.ctx);
    }

    /**
    * Renders a random number between min and max
    * @param {number} min - minimal time
    * @param {number} max - maximal time
    */
    static randomNumber(min: number, max: number): number {
        return Math.round(Math.random() * (max - min) + min);
    }
}

//this will get an HTML element. I cast this element in de appropriate type using <>
let init = function () {
    const Asteroids = new Game(<HTMLCanvasElement>document.getElementById('canvas'));
};

// Add EventListener to load the game whenever the browser is ready
window.addEventListener('load', init);