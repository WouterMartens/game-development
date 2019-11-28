interface Player {
    lives: number;
    score: number;
}

class Game {
    private canvas: Canvas;
    private boat: Boat;
    private sharks: Shark[];
    private player: Player;

    private startTime: DOMHighResTimeStamp;

    public constructor() {
        this.canvas = new Canvas(<HTMLCanvasElement>document.getElementById('canvas'));
        this.boat = new Boat(50, this.canvas.getHeight() / 2 - 70, './assets/images/boat.png', this.canvas);
        this.sharks = [];

        this.player = {
            lives: 3,
            score: 0
        }

        this.startTime = performance.now();

        this.loop();
    }

    /**
     * Creates a new shark
     */
    private createShark() {
        const x: number = this.canvas.getWidth();
        const y: number = this.canvas.randomNumber(0, this.canvas.getHeight() - 182);
        const source: string = './assets/images/shark.png';
        const speed: number = this.canvas.randomNumber(2, 5);

        const shark: Shark = new Shark(x, y, source, this.canvas, speed);

        this.sharks.push(shark);
    }

    /**
     * Moves the objects
     */
    public move(): void {
        this.boat.move();

        for (let i = this.sharks.length - 1; i >= 0; i--) {
            const shark = this.sharks[i];
            if (shark.isOffScreen()) {
                this.sharks.splice(i, 1);
            } else {
                shark.moveRightToLeft();
            }

            if (this.boat.isColliding(shark)) {
                if (!this.boat.isHit) {
                    this.boat.isHit = true;
                    this.player.lives--;
                }
            } else {
                this.boat.isHit = false;
            }
        }
    }

    /**
     * Draws the objects
     */
    public draw(): void {
        this.canvas.writeLives(this.player.lives);
        this.canvas.writeScore(this.player.score);

        this.sharks.forEach(shark => {
            shark.draw();
        });   
        this.boat.draw();   
    }

    public getScore() {
        const delta = (performance.now() - this.startTime) / 1000;
        return Number(delta.toFixed(0));
    }

    /**
     * Main game loop
     */
    public loop = (): void => {
        this.canvas.clear(); 
        
        this.player.score = this.getScore();

        if (this.sharks.length === 0) {
            this.createShark();
        }

        this.move();
        this.draw();

        if (this.player.lives !== 0) {
            requestAnimationFrame(this.loop);
        } else {
            this.canvas.writeGameOver();
        }
    }
}

// When the window is loaded -> call the init function
window.addEventListener('load', init);

/**
 * Initializes the game
 */
function init(): void {
    const SharkAttack = new Game();
}