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

    private t: DOMHighResTimeStamp;
    private startTime: DOMHighResTimeStamp;
    private averageFpsList: DOMHighResTimeStamp[];
    private averageAsteroids: number[];

    //private asteroid: Asteroid;
    private asteroids: Asteroid[];

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

        this.t = performance.now();
        this.startTime = this.t;
        this.averageFpsList = [];
        this.averageAsteroids = [];

        this.asteroids = [];

        this.highscores = [
            {
                playerName: 'Loek',
                score: 40000
            },
            {
                playerName: 'Daan',
                score: 34000
            },
            {
                playerName: 'Rimmert',
                score: 200
            }
        ]

        // All screens: uncomment to activate
        // this.startScreen();
        this.levelScreen();
        // this.titleScreen();
    }

    /**
     * Draws text to the canvas according to the given parameters
     * @param text String that needs to be shown on the canvas
     * @param x starting X coordinate of the text
     * @param y starting Y coordinate of the text
     * @param fontSize font size of the text in pixels
     * @param alignment where to start drawing the text (left, center, etc.), standard is center
     * @param colour Colour of the text, standard is white
     */
    private drawTextToCanvas(
        text: string,
        x: number,
        y: number, 
        fontSize: number, 
        alignment: CanvasTextAlign = 'center',
        colour: string = 'white'
    ) {
        this.ctx.save();

        this.ctx.fillStyle = colour;
        this.ctx.font = fontSize + 'px Roboto';
        this.ctx.textAlign = alignment;
        this.ctx.fillText(text, x, y);

        this.ctx.restore();
    }

    //-------- Splash screen methods ------------------------------------
    /**
     * Method to initialize the splash screen
     */
    public startScreen() {
        //1. add 'Asteroids' text
        this.drawTextToCanvas('Asteroids', this.canvas.width / 2, 200, 200, 'center');
        //2. add 'Press to play' text
        this.drawTextToCanvas('Press start to play', this.canvas.width / 2, 500, 60, 'center');
        //3. add button with 'start' text
        const buttonImage: string = './assets/images/SpaceShooterRedux/PNG/UI/buttonBlue.png';
        const drawButtonImage = this.loadImage(buttonImage);



        //4. add Asteroid image
        const asteroidImage: string = './assets/images/SpaceShooterRedux/PNG/Meteors/meteorBrown_big' + Game.randomNumber(1, 4) + '.png';
        // this.loadImage(asteroidImage, this.writeAsteroidImageToStartScreen);

        const asteroid = new Asteroid(this.canvas.width / 2, this.canvas.height / 2, 0, 0, 90, 0);
        asteroid.loadImage(asteroidImage);
        
    }

    /**
     * Draws the button element
     * @param img Image given by the loadImage function
     */
    private drawButton(img: HTMLImageElement) {
        let x: number = this.canvas.width / 2 - img.width / 2;
        let y: number = 700;

        this.ctx.drawImage(img, x, y);

        x += img.width / 2;
        y += img.height / 3 * 2;

        this.drawTextToCanvas('Play', x, y, 20, 'center', 'black');
    }

    /**
     * Draws one asteroid to the starting screen
     * @param img Image given by the loadImage function
     */
    private writeAsteroidImageToStartScreen(img: HTMLImageElement) {
        this.ctx.translate(-img.width / 2, -img.height / 2);
        this.ctx.drawImage(img, this.canvas.width / 2, 600);
        this.ctx.translate(img.width / 2, img.height / 2); 
    }

    //-------- level screen methods -------------------------------------
    /**
     * Method to initialize the level screen
     */
    public levelScreen() {
        //this.createAsteroids(Game.randomNumber(2, 5));
        //this.createAsteroids(300);
        this.loop();
    }

    private drawFPS(): number {
        const t = performance.now();
        const fps = Number((1000 / (t - this.t)).toFixed(0));

        if(this.averageFpsList.length > 59) {
            this.averageFpsList.pop();
        }
        this.averageFpsList.unshift(fps);

        const averageFPS = (this.averageFpsList.reduce((a, b) => a + b) / this.averageFpsList.length).toFixed(0);

        this.drawTextToCanvas(String(averageFPS), 300, 200, 25);

        this.t = t;

        // console.log(fps, averageFPS);

        return Number(averageFPS);
    }

    /**
     * Draws a given amount of asteroids
     * @param num Number of asteroids to draw
     */
    private createAsteroids(num: number) {
        for (let i = 0; i < num; i++) {
            const x: number = Game.randomNumber(0, this.canvas.width);
            const y: number = Game.randomNumber(0, this.canvas.height);

            const vX: number = Game.randomNumber(1, 3);
            const vY: number = Game.randomNumber(1, 3);
            
            const r: number = Game.randomNumber(0, 359);
            const rV: number = Game.randomNumber(1, 5) / 200;

            const asteroid = new Asteroid(x, y, vX, vY, r, rV);
            this.asteroids.push(asteroid);
        }
    }

    // public loop() {
    public loop = () => {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.createAsteroids(1);

        this.asteroids.forEach(asteroid => {
            asteroid.draw(this.ctx);
            asteroid.move(this.canvas);
        });

        //1. load life images
        // const lifeImage: string = './assets/images/SpaceShooterRedux/PNG/UI/playerLife1_blue.png';
        // this.loadImage(lifeImage, this.drawLifeImages);
        //2. draw current score
        this.drawCurrentScore();
        //4. draw player spaceship
        // const shipImage: string = './assets/images/SpaceShooterRedux/PNG/playerShip1_blue.png';
        // this.loadImage(shipImage, this.drawPlayerShip);

        if (!(this.drawFPS() > 50 || performance.now() - this.startTime < 1000)) {
            this.averageAsteroids.push(this.asteroids.length);

            console.log('Lost performance at ' + this.asteroids.length + ' asteroids, average: ' +
                (this.averageAsteroids.reduce((a, b) => a + b) / this.averageAsteroids.length).toFixed(0));
            
            this.asteroids = [];
            this.startTime = performance.now();
        }
        requestAnimationFrame(this.loop);
    }

    /**
     * Draws the player ship to the canvas
     * @param img Image given by the loadImage function
     */
    private drawPlayerShip() {
        const source = './assets/images/SpaceShooterRedux/PNG/playerShip1_blue.png';
        const img = this.loadImage(source);

        console.log(img.width);

        this.ctx.save();

        //this.ctx.translate(-img.width / 2, -img.height / 2);
        this.ctx.drawImage(img, this.canvas.width / 2, this.canvas.height / 2);
        //this.ctx.translate(img.width / 2, img.height / 2);

        this.ctx.restore();
    }

    /**
     * 
     * @param img Image given by the loadImage function
     */
    private drawLifeImages(img: HTMLImageElement) {
        for (let i = 1; i <= this.lives; i++) {
            this.ctx.drawImage(img, img.width * i + 10 * i, 10);
        }
    }

    private drawCurrentScore() {
        const x: number = 50;
        const y: number = this.canvas.height - 50;

        this.drawTextToCanvas(`Score: ${this.score}`, x, y, 40, 'left');
    }




    //-------- Title screen methods -------------------------------------

    /**
    * Method to initialize the title screen
    */
    public titleScreen() {
        //1. draw your score
        this.drawTextToCanvas(`Score: ${this.score}`, this.canvas.width / 2, 300, 100, 'center');
        //2. draw all highscores
        this.drawHighscores();
    }

    drawHighscores() {
        let longestLine: number = 0;
        let lines: string[] = [];

        const fontSize = 60;
        this.ctx.font = fontSize + 'px Roboto';

        for (let i = 0; i < this.highscores.length; i++) {
            const player: Player = this.highscores[i];
            const string: string = `${i + 1}: ${player.playerName}, score: ${player.score}`;
            const textWidth: number = this.ctx.measureText(string).width;

            lines.push(string);

            if (textWidth > longestLine) {
                longestLine = textWidth;
            }
        }
        
        lines.forEach((line, i) => {
            this.drawTextToCanvas(line, this.canvas.width / 2 - longestLine / 2, this.canvas.height / 3 + 100 + i * fontSize * 1.5, fontSize, 'left');
            console.log(line, longestLine);
        });

    }

    //-------Generic canvas methods ----------------------------------

    /**
     * Loads an image file into the DOM and writes it to the canvas. After the
     * image is loaded and ready to be drawn to the canvas, the specified
     * callback method will be invoked. the method will be called with the
     * loaded imageElement as a parameter.
     *
     * The callback method MUST be a method of this class with a header like:
     *
     *   private yourMethodNameHere(img: HTMLImageElement)
     *
     * In the body of that callback you can draw the image to the canvas
     * context like:
     *
     *   this.ctx.drawImage(img, someX, someY);
     *
     * This is the simplest way to draw images, because the browser must and
     * shall wait until the image is completely loaded into memory.
     *
     * @param {string} source - the name of the image file
     * @param {Function} callback - method that is invoked after the image is loaded
     */
    // private loadImage(source: string, callback: Function) {
    //     let imageElement = new Image();

    //     // We must wait until the image file is loaded into the element
    //     // We add an event listener
    //     // We'll be using an arrow function for this, just because we must.
    //     imageElement.addEventListener("load", () => {
    //         callback.apply(this, [imageElement]);
    //     });

    //     // Now, set the src to start loading the image
    //     imageElement.src = source;
    // }
    private loadImage(source: string): HTMLImageElement {
        let imageElement = new Image();
        // Now, set the src to start loading the image
        imageElement.src = source;
        return imageElement;
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