class Game {
    // Global attributes for canvas
    // Readonly attributes are read-only. They can only be initialized in the constructor
    private readonly canvas: HTMLCanvasElement; 
    private readonly ctx: CanvasRenderingContext2D;
    private currentScreen: StartScreen | GameScreen | TitleScreen;
    private keyboardListener: KeyboardListener;
    private t: DOMHighResTimeStamp;

    public constructor(canvasId: HTMLCanvasElement) {
        // Construct all of the canvas
        this.canvas = canvasId;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        // Set the context of the canvas
        this.ctx = this.canvas.getContext('2d');
        
        this.t = 0;

        this.keyboardListener = new KeyboardListener();
        this.currentScreen = new StartScreen(this.canvas, this.ctx);
        this.loop();
    }

    private switchScreen() {
        const t = performance.now();

        if (t - this.t > 1000) {
            if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_S) && this.currentScreen instanceof StartScreen) {
                this.currentScreen = new GameScreen(this.canvas, this.ctx);
                this.t = t;
            } else if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_ESC) && this.currentScreen instanceof GameScreen) {
                this.currentScreen = new TitleScreen(this.canvas, this.ctx);
                this.t = t;
            } else if ((this.keyboardListener.isKeyDown(KeyboardListener.KEY_S) || this.keyboardListener.isKeyDown(KeyboardListener.KEY_ESC)) &&
                        this.currentScreen instanceof TitleScreen) {
                this.currentScreen = new StartScreen(this.canvas, this.ctx);
                this.t = t;
            }
            
        }
    }

    public loop = () => {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.switchScreen();
        this.currentScreen.draw();

        requestAnimationFrame(this.loop);
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