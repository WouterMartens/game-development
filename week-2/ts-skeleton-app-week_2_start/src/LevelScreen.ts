/// <reference path="GameScreen.ts" />

class LevelScreen extends GameScreen {
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
        super(canvas, ctx);

        this.TEST = false;

        this.score = 400;
        this.lives = 3;

        this.t = performance.now();
        this.startTime = this.t;
        this.averageFpsList = [];
        this.averageAsteroids = [];

        this.asteroids = [];
        this.createAsteroids(Game.randomNumber(10, 20));

        this.ship = new Ship(
            this.canvas.width / 2,
            this.canvas.height / 2,
            5,
            5,
            0,
            './assets/images/SpaceShooterRedux/PNG/playerShip1_blue.png',
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

            const xVel: number = Game.randomNumber(1, 3);
            const yVel: number = Game.randomNumber(1, 3);

            const rotation: number = Game.randomNumber(0, 359);
            const rotationVelocity: number = Game.randomNumber(1, 5) / 200;

            const asteroid = new Asteroid(x, y, xVel, yVel, rotation, rotationVelocity);
            this.asteroids.push(asteroid);
        }
    }

    private drawLifeImages() {
        for (let i = 1; i <= this.lives; i++) {
            this.ctx.drawImage(this.lifeImage, this.lifeImage.width * i + 10 * i, 10);
        }
    }

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