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

    //-------- Splash screen methods ------------------------------------
    /**
     * Method to initialize the splash screen
     */
    public startScreen() {
        this.ctx.fillStyle = 'white';

        //1. add 'Asteroids' text
        this.drawAsteroidHeading();
        //2. add 'Press to play' text
        this.drawIntroText();
        //3. add button with 'start' text
        const buttonImage: string = './assets/images/SpaceShooterRedux/PNG/UI/buttonBlue.png';
        this.loadImage(buttonImage, this.drawButton);
        //4. add Asteroid image
        const asteroidImage: string = './assets/images/SpaceShooterRedux/PNG/Meteors/meteorBrown_big' + this.randomNumber(1, 4) + '.png';
        this.loadImage(asteroidImage, this.writeAsteroidImageToStartScreen);
    }

    private drawAsteroidHeading() {
        const fontSize = this.canvas.width / 20;
        this.ctx.font = fontSize + 'px Roboto';
        const text = this.ctx.measureText('Asteroids');
        this.ctx.fillText('Asteroids', this.canvas.width / 2 - text.width / 2, 200);
    }

    private drawIntroText() {
        const fontSize = this.canvas.width / 30;
        this.ctx.font = fontSize + 'px Roboto';
        const text = this.ctx.measureText('Press start to play');
        this.ctx.fillText('Press start to play', this.canvas.width / 2 - text.width / 2, this.canvas.height / 2);
    }

    private drawButton(img: HTMLImageElement) {
        let x: number = this.canvas.width / 2 - img.width / 2;
        let y: number = 700;

        this.ctx.drawImage(img, x, y);

        this.ctx.fillStyle = 'black';
        this.ctx.font = '20px Roboto';
        const text = this.ctx.measureText('Play');

        x += img.width / 2 - text.width / 2;
        y += img.height / 3 * 2;

        this.ctx.fillText('Play', x, y);
    }

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
        this.ctx.fillStyle = 'white';

        this.drawAsteroids();
        //1. load life images
        const lifeImage: string = './assets/images/SpaceShooterRedux/PNG/UI/playerLife1_blue.png';
        this.loadImage(lifeImage, this.drawLifeImages);
        //2. draw current score
        this.drawCurrentScore();
        //3. draw random asteroids
        this.drawRandomAsteroid();
        //4. draw player spaceship
        const shipImage: string = './assets/images/SpaceShooterRedux/PNG/playerShip1_blue.png';
        this.loadImage(shipImage, this.drawPlayerShip);
    }

    private drawAsteroids() {
        for (let i = 0; i < 20; i++) {
            this.drawRandomAsteroid();
        }
    }

    private writeAsteroidImageToLevelScreen(img: HTMLImageElement) {
        this.ctx.save();

        const x = this.randomNumber(img.width / 2, this.canvas.width);
        const y = this.randomNumber(img.height / 2, this.canvas.height);


        //this.ctx.translate(-img.width / 2, -img.height / 2);
        //console.log(randomX, randomY, this.canvas.width, this.canvas.height);
        this.ctx.translate(x + 0.5 * img.width, y + 0.5 * img.height);
        const degrees = this.randomNumber(0, 360);
        this.ctx.rotate((Math.PI / 180) * degrees);
        this.ctx.translate(-(x + 0.5 * img.width), -(y + 0.5 * img.height));

        this.ctx.drawImage(img, x, y);
        // this.ctx.translate(img.width / 2, img.height / 2);

        this.ctx.restore();
    }

    private drawPlayerShip(img: HTMLImageElement) {
        this.ctx.translate(-img.width / 2, -img.height / 2);
        this.ctx.drawImage(img, this.canvas.width / 2, this.canvas.height / 2);
        this.ctx.translate(img.width / 2, img.height / 2);
    }

    private drawLifeImages(img: HTMLImageElement) {
        for (let i = 1; i <= this.lives; i++) {
            this.ctx.drawImage(img, img.width * i + 10 * i, 10);
        }
    }

    private drawCurrentScore() {
        const x: number = 50;
        const y: number = this.canvas.height - 50;

        this.ctx.font = '40px Roboto';
        this.ctx.fillText(`Score: ${this.score}`, x, y);
    }

    private drawRandomAsteroid() {
        let colour: string = '';
        let size: string = '';
        let amount: number;

        if (this.randomNumber(1, 2) === 1) {
            colour = 'Brown';
        } else {
            colour = 'Grey';
        }

        switch(this.randomNumber(1, 4)) {
            case 1:
                size = 'tiny';
                amount = 2;
                break;
            case 2:
                size = 'small';
                amount = 2;
                break;
            case 3:
                size = 'med';
                amount = 2;
                break;
            case 4:
                size = 'big';
                amount = 4;
                break;
            default:
                size = 'big';
                amount = 4;
                break;
        }

        const asteroidImage: string = `./assets/images/SpaceShooterRedux/PNG/Meteors/meteor${colour}_${size}${amount}.png`;
        this.loadImage(asteroidImage, this.writeAsteroidImageToLevelScreen);
    }


    //-------- Title screen methods -------------------------------------

    /**
    * Method to initialize the title screen
    */
    public titleScreen() {
        this.ctx.fillStyle = 'white';
        //1. draw your score
        //2. draw all highscores
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
    private loadImage(source: string, callback: Function) {
        let imageElement = new Image();

        // We must wait until the image file is loaded into the element
        // We add an event listener
        // We'll be using an arrow function for this, just because we must.
        imageElement.addEventListener("load", () => {
            callback.apply(this, [imageElement]);
        });

        // Now, set the src to start loading the image
        imageElement.src = source;
    }

    /**
    * Renders a random number between min and max
    * @param {number} min - minimal time
    * @param {number} max - maximal time
    */
    public randomNumber(min: number, max: number): number {
        return Math.round(Math.random() * (max - min) + min);
    }
}

//this will get an HTML element. I cast this element in de appropriate type using <>
let init = function () {
    const Asteroids = new Game(<HTMLCanvasElement>document.getElementById('canvas'));
};

// Add EventListener to load the game whenever the browser is ready
window.addEventListener('load', init);
