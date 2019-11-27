class Game {
    private canvas: Canvas;
    private boat: Boat;
    private sharks: Shark[];

    public constructor() {
        this.canvas = new Canvas(<HTMLCanvasElement>document.getElementById('canvas'));
        this.boat = new Boat(100, 100, './assets/images/boat.png', this.canvas);
        this.sharks = [];

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
        }
    }

    /**
     * Draws the objects
     */
    public draw(): void {
        this.boat.draw(); 
        this.sharks.forEach(shark => {
            shark.draw();
        });     
    }

    /**
     * Main game loop
     */
    public loop = (): void => {
        this.canvas.clear();        

        if (this.sharks.length === 0) {
            this.createShark();
        }

        this.move();
        this.draw();

        requestAnimationFrame(this.loop);
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