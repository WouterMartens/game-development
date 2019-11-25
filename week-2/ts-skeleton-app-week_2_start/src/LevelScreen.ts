/// <reference path="GameScreen.ts" />

class LevelScreen extends GameScreen {
    private t: DOMHighResTimeStamp;
    private startTime: DOMHighResTimeStamp;
    private averageFpsList: DOMHighResTimeStamp[];
    private averageAsteroids: number[];

    private asteroids: Asteroid[];
    private players: Player[];

    private lifeImage: HTMLImageElement;

    private PERFORMANCE_TEST: boolean;
    private DEBUG: boolean;

    constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, players: Player[]) {
        super(canvas, ctx);

        this.DEBUG = true;
        this.PERFORMANCE_TEST = false;

        this.players = players;
        if (this.players.length > 1) {
            this.players[1].ship.xPos += 300;
        }
        
        this.t = performance.now();
        this.startTime = this.t;
        this.averageFpsList = [];
        this.averageAsteroids = [];

        this.asteroids = [];
        // this.createAsteroids(Game.randomNumber(10, 20));
        this.createAsteroids(5);

        this.lifeImage = this.loadImage('./assets/images/SpaceShooterRedux/PNG/UI/playerLife1_blue.png');
    }

    public toggleDebug(): void {
        this.DEBUG = !this.DEBUG;
    }

    public loadImage(source: string): HTMLImageElement {
        const img: HTMLImageElement = new Image();
        img.src = source;
        return img;
    }

    private drawCurrentScore() {
        const x: number = 50;
        const y: number = this.canvas.height - 50;

        this.drawTextToCanvas(`Score: ${this.players[0].currentScore}`, x, y, 40, 'left');
    }

    private drawFPS(): number {
        const t = performance.now();
        const fps = Number((1000 / (t - this.t)).toFixed(0));

        if (this.averageFpsList.length > 59) {
            this.averageFpsList.pop();
        }

        this.averageFpsList.unshift(fps);
        const averageFPS = (this.averageFpsList.reduce((a, b) => a + b) / this.averageFpsList.length).toFixed(0);
        this.drawTextToCanvas(String(averageFPS), this.canvas.width - 50, 50, 25);
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

            const xVel: number = Game.randomNumber(100, 300) / 100;
            const yVel: number = Game.randomNumber(100, 300) / 100;

            const rotation: number = Game.randomNumber(0, 359);
            const rotationVelocity: number = Game.randomNumber(1, 5) / 5;

            const asteroid = new Asteroid(x, y, xVel, yVel, rotation, rotationVelocity);
            this.asteroids.push(asteroid);
        }
    }

    private drawLifeImages(): void {
        for (let i = 1; i <= this.players[0].lives; i++) {
            this.ctx.drawImage(this.lifeImage, this.lifeImage.width * i + 10 * i, 10);
        }
    }

    private move() {
        this.asteroids.forEach(asteroid => {
            asteroid.move(this.canvas);
        });

        this.players.forEach(player => {
            player.ship.move(this.canvas);
        });
    }

    private drawEverything() {
        this.asteroids.forEach(asteroid => {
            asteroid.draw(this.ctx);
        });

        this.players.forEach(player => {
            player.ship.draw(this.ctx);
        });
    }

    private collide() {
        this.players.forEach(player => {
            for (let i = 0; i < this.asteroids.length; i++) {
                const asteroid = this.asteroids[i];
                // if (player.ship.isHit()) {

                // }
            }
        });
    }

    private drawAsteroids(): void {
        this.asteroids.forEach(asteroid1 => {
            asteroid1.move(this.canvas);
            asteroid1.draw(this.ctx);

            // for (let i = 0; i < this.asteroids.length; i++) {
            //     const asteroid2 = this.asteroids[i];
            //     asteroid1.isHit(asteroid1.xPos, asteroid1.yPos, asteroid1.radius, asteroid2.xPos, asteroid2.yPos, asteroid2.radius, this.ctx);
            // }
            const ship = this.players[0].ship;
            if (ship.isHit(asteroid1.xPos, asteroid1.yPos, asteroid1.radius, ship.xPos, ship.yPos, ship.radius, this.ctx)) {
                console.log('fuk');
                ship.state = 'fuck';
            }

            if (this.DEBUG) { asteroid1.debug(this.ctx); }
        });
    }

    private drawPlayers(): void {
        this.players.forEach(player => {
            for (let i = player.ship.bullets.length - 1; i >= 0; i--) {
                const bullet = player.ship.bullets[i];
                bullet.move(this.canvas);
                bullet.draw(this.ctx);

                if (bullet.isOffScreen) {
                    player.ship.bullets.splice(i, 1);
                }
            }

            player.ship.move(this.canvas);
            player.ship.draw(this.ctx);

            if (this.DEBUG) { 
                player.ship.debug(this.ctx);
                // console.log(player.ship.bullets);
            }
        });
    }

    private drawTest(): void {
        if (!(this.drawFPS() > 50 || performance.now() - this.startTime < 1000)) {
            this.averageAsteroids.push(this.asteroids.length);

            console.log('Lost performance at ' + this.asteroids.length + ' asteroids, average: ' +
                (this.averageAsteroids.reduce((a, b) => a + b) / this.averageAsteroids.length).toFixed(0));

            this.asteroids = [];
            this.startTime = performance.now();
        }
    }

    public draw = () => {
        if (this.PERFORMANCE_TEST) {
            this.createAsteroids(1);
            this.drawTest();
        }
        if (this.DEBUG) { this.drawFPS(); }

        this.drawAsteroids();
        this.drawPlayers();

        this.drawCurrentScore();
        this.drawLifeImages();
    }
}