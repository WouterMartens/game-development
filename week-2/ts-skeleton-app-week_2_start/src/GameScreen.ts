class GameScreen {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;

    private textIsDrawn: boolean;

    private score: number;
    private lives: number;

    private t: DOMHighResTimeStamp;
    private startTime: DOMHighResTimeStamp;
    private averageFpsList: DOMHighResTimeStamp[];
    private averageAsteroids: number[];

    private asteroids: Asteroid[];
    private ship: Ship;

    private lifeImage: HTMLImageElement;

    private TEST: boolean;

    constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
        this.canvas = canvas;
        this.ctx = ctx;

        this.TEST = false;

        this.score = 400;
        this.lives = 3;

        this.t = performance.now();
        this.startTime = this.t;
        this.averageFpsList = [];
        this.averageAsteroids = [];

        this.asteroids = [];
        this.createAsteroids(Game.randomNumber(3, 7));

        this.ship = new Ship(
            './assets/images/SpaceShooterRedux/PNG/playerShip1_blue.png',
            this.canvas.width / 2,
            this.canvas.height / 2,
            5,
            5,
            new KeyboardListener()
        );

        this.lifeImage = this.loadImage('./assets/images/SpaceShooterRedux/PNG/UI/playerLife1_blue.png');

        // this.loop();
    }

    public loadImage(source: string): HTMLImageElement {
        const img: HTMLImageElement = new Image();
        img.src = source;
        return img;
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

    private drawCurrentScore() {
        const x: number = 50;
        const y: number = this.canvas.height - 50;

        this.drawTextToCanvas(`Score: ${this.score}`, x, y, 40, 'left');
    }

    private drawFPS(): number {
        const t = performance.now();
        const fps = Number((1000 / (t - this.t)).toFixed(0));

        if (this.averageFpsList.length > 59) {
            this.averageFpsList.pop();
        }
        this.averageFpsList.unshift(fps);

        const averageFPS = (this.averageFpsList.reduce((a, b) => a + b) / this.averageFpsList.length).toFixed(0);

        this.drawTextToCanvas(String(averageFPS), 300, 200, 25);

        this.t = t;

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

    private drawLifeImages() {
        for (let i = 1; i <= this.lives; i++) {
            this.ctx.drawImage(this.lifeImage, this.lifeImage.width * i + 10 * i, 10);
        }
    }

    //public loop = () => {
    public draw = () => {
        if (this.TEST) {
            this.createAsteroids(1);
        }

        this.asteroids.forEach(asteroid => {
            asteroid.move(this.canvas);
            asteroid.draw(this.ctx);
        });

        this.ship.move(this.canvas);
        this.ship.draw(this.ctx);

        this.drawCurrentScore();
        this.drawLifeImages();

        if (this.TEST) {
            if (!(this.drawFPS() > 50 || performance.now() - this.startTime < 1000)) {
                this.averageAsteroids.push(this.asteroids.length);

                console.log('Lost performance at ' + this.asteroids.length + ' asteroids, average: ' +
                    (this.averageAsteroids.reduce((a, b) => a + b) / this.averageAsteroids.length).toFixed(0));

                this.asteroids = [];
                this.startTime = performance.now();
            }
        }
    }
}