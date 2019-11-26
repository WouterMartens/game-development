/// <reference path="GameScreen.ts" />

class LevelScreen extends GameScreen {
    private t: DOMHighResTimeStamp;
    private startTime: DOMHighResTimeStamp;
    private averageFpsList: DOMHighResTimeStamp[];
    private averageAsteroids: number[];

    private staticAsteroid: Asteroid;
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
        this.staticAsteroid = new Asteroid(500, 500, 0, 0, 0);
        this.asteroids.push(this.staticAsteroid);

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

    public move() {
        this.asteroids.forEach(asteroid => {
            asteroid.move(this.canvas);
        });

        this.players.forEach(player => {
            player.ship.move(this.canvas);

            for (let i = player.ship.bullets.length - 1; i >= 0; i--) {
                const bullet = player.ship.bullets[i];
                bullet.move(this.canvas);
                if (bullet.isOffScreen) {
                    player.ship.bullets.splice(i, 1);
                }
            }
        });
    }

    // public collide() {
    //     // Checks collisions for each player and their fired bullets
    //     this.players.forEach(player => {
    //         const x = player.ship.xPos;
    //         const y = player.ship.yPos;
    //         const r = player.ship.radius;

    //         // Loops all asteroids
    //         for (let i = 0; i < this.asteroids.length; i++) {
    //             const asteroid = this.asteroids[i];
    //             const aX = asteroid.xPos;
    //             const aY = asteroid.yPos;
    //             const aR = asteroid.radius;

    //             // Checks if a bullet hit this asteroid
    //             for (let i = player.ship.bullets.length - 1; i >= 0; i--) {
    //                 const bullet = player.ship.bullets[i];
    //                 if(bullet.hit(aX, aY, aR)) {
    //                     player.ship.bullets.splice(i, 1);
    //                     asteroid.state = 'hit';
    //                 }
    //             }

    //             if (player.ship.isHit(x, y, r, aX, aY, aR, this.ctx)) {
    //                 break;
    //             }
    //         }
    //     });
    // }

    public collide() {
        // Checks collisions for each player and their fired bullets
        this.players.forEach(player => {
            // Loops all asteroids
            for (let i = 0; i < this.asteroids.length; i++) {
                const asteroid = this.asteroids[i];

                // Checks if a bullet hit this asteroid
                for (let i = player.ship.bullets.length - 1; i >= 0; i--) {
                    const bullet = player.ship.bullets[i];
                    if (bullet.hit(asteroid)) {
                        player.ship.bullets.splice(i, 1);
                        asteroid.state = 'hit';
                    }
                }

                if (player.ship.isColliding(asteroid, this.ctx)) {
                    player.ship.respawn();
                    player.lives--;
                    break;
                }
            }
        });
    }

    public draw() {
        if (this.DEBUG) { this.drawFPS(); }

        this.asteroids.forEach(asteroid => {
            asteroid.draw(this.ctx);
            if (this.DEBUG) { asteroid.debug(this.ctx); }
        });

        this.players.forEach(player => {
            player.ship.draw(this.ctx);
            player.ship.bullets.forEach(bullet => {
                bullet.draw(this.ctx);
            });
            if (this.DEBUG) { player.ship.debug(this.ctx); }
        });

        this.drawCurrentScore();
        this.drawLifeImages();

        // if (this.PERFORMANCE_TEST) {
        //     this.createAsteroids(1);
        //     this.drawTest();
        // }
    }

    // private drawTest(): void {
    //     if (!(this.drawFPS() > 50 || performance.now() - this.startTime < 1000)) {
    //         this.averageAsteroids.push(this.asteroids.length);

    //         console.log('Lost performance at ' + this.asteroids.length + ' asteroids, average: ' +
    //             (this.averageAsteroids.reduce((a, b) => a + b) / this.averageAsteroids.length).toFixed(0));

    //         this.asteroids = [];
    //         this.startTime = performance.now();
    //     }
    // }
}