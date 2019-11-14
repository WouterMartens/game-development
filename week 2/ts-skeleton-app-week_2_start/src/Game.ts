interface Player {
    playerName: string,
    score: number
}

interface Asteroid {
    x: number,
    y: number,
    xVelocity: number,
    yVelocity: number
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

        this.asteroids = [
            {
                x: this.canvas.width / 2,
                y: this.canvas.height / 2,
                xVelocity: 5,
                yVelocity: 5
            },
            {
                x: 5,
                y: 5,
                xVelocity: 3,
                yVelocity: 3
            },
            {
                x: this.canvas.width - 150,
                y: this.canvas.height - 150,
                xVelocity: 1,
                yVelocity: 1
            },
        ]

        // All screens: uncomment to activate
        // this.startScreen();
        // this.levelScreen();
        // this.titleScreen();

        this.loop();
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

    /**
     * Draws the heading text of the game
     */
    private drawAsteroidHeading() {
        this.drawTextToCanvas('Asteroids', this.canvas.width / 2, 200, 200, 'center');
    }

    /**
     * Draws the intro text of the game
     */
    private drawIntroText() {
        this.drawTextToCanvas('Press start to play', this.canvas.width / 2, 500, 60, 'center');
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
        // this.ctx.fillStyle = 'white';

        // this.drawAsteroids(20);
        // //1. load life images
        // const lifeImage: string = './assets/images/SpaceShooterRedux/PNG/UI/playerLife1_blue.png';
        // this.loadImage(lifeImage, this.drawLifeImages);
        // //2. draw current score
        // this.drawCurrentScore();
        // //3. draw random asteroids
        // this.drawRandomAsteroid();
        // //4. draw player spaceship
        // const shipImage: string = './assets/images/SpaceShooterRedux/PNG/playerShip1_blue.png';
        // this.loadImage(shipImage, this.drawPlayerShip);

        this.loop();
    }

    /**
     * Draws a given amount of asteroids
     * @param num Number of asteroids to draw
     */
    private drawAsteroids(num: number) {
        for (let i = 0; i < num; i++) {
            this.drawRandomAsteroid();
        }
    }

    // public loop() {
    public loop = () => {
        requestAnimationFrame(this.loop);

        const asteroidImage: string = `./assets/images/SpaceShooterRedux/PNG/Meteors/meteorBrown_big1.png`;
        this.loadImage(asteroidImage, this.drawMovingImageToLevelScreen);

        this.drawCurrentScore();

        const lifeImage: string = './assets/images/SpaceShooterRedux/PNG/UI/playerLife1_blue.png';
        this.loadImage(lifeImage, this.drawLifeImages);

        const shipImage: string = './assets/images/SpaceShooterRedux/PNG/playerShip1_blue.png';
        this.loadImage(shipImage, this.drawPlayerShip);
    }

    private drawMovingImageToLevelScreen(img: HTMLImageElement) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.asteroids.forEach((asteroid, index) => {
            console.log(asteroid, index);

            if (asteroid.x >= this.canvas.width - img.width || asteroid.x <= 0) {
                asteroid.xVelocity *= -1;
            }

            if (asteroid.y >= this.canvas.height - img.height || asteroid.y <= 0) {
                asteroid.yVelocity *= -1;
            }

            asteroid.x += asteroid.xVelocity;
            asteroid.y += asteroid.yVelocity;

            this.ctx.drawImage(img, asteroid.x, asteroid.y);
        });
        // this.drawAsteroids(100);
    }

    /**
     * Draws one asteroid to the screen on a random location
     * @param img Image given by the loadImage function
     */
    private writeAsteroidImageToLevelScreen(img: HTMLImageElement) {
        this.ctx.save();

        const x = this.randomNumber(img.width, this.canvas.width - img.width);
        const y = this.randomNumber(img.height, this.canvas.height - img.width);

        this.ctx.translate(x + 0.5 * img.width, y + 0.5 * img.height);
        const degrees = this.randomNumber(0, 360);
        this.ctx.rotate((Math.PI / 180) * degrees);
        this.ctx.translate(-(x + 0.5 * img.width), -(y + 0.5 * img.height));

        this.ctx.drawImage(img, x, y);

        this.ctx.restore();
    }

    /**
     * Draws the player ship to the canvas
     * @param img Image given by the loadImage function
     */
    private drawPlayerShip(img: HTMLImageElement) {
        this.ctx.translate(-img.width / 2, -img.height / 2);
        this.ctx.drawImage(img, this.canvas.width / 2, this.canvas.height / 2);
        this.ctx.translate(img.width / 2, img.height / 2);
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

    private drawRandomAsteroid() {
        let colour: string = '';
        let size: string = '';
        let amount: number = 2;

        if (this.randomNumber(1, 2) === 1) {
            colour = 'Brown';
        } else {
            colour = 'Grey';
        }

        switch(this.randomNumber(1, 4)) {
            case 1:
                size = 'tiny';
                break;
            case 2:
                size = 'small';
                break;
            case 3:
                size = 'med';
                break;
            case 4:
                size = 'big';
                amount = 4;
                break;
        }

        let number: number = this.randomNumber(1, amount);

        const asteroidImage: string = `./assets/images/SpaceShooterRedux/PNG/Meteors/meteor${colour}_${size}${number}.png`;
        this.loadImage(asteroidImage, this.writeAsteroidImageToLevelScreen);
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