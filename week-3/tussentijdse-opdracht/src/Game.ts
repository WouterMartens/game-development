/**
 * @author Wouter Martens
 */
class Game {
    private readonly canvas: HTMLCanvasElement;
    private readonly ctx: CanvasRenderingContext2D;
    private readonly balls: Ball[]; 

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.ctx = <CanvasRenderingContext2D>this.canvas.getContext('2d');

        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        this.balls = [];
        this.createBalls(10);

        this.loop();
    }

    /**
     * Creates a given number of balls with random properties
     * @param num Amount of balls to create
     */
    private createBalls(num: number) {
        // One loop creates one ball
        for (let i = 0; i < num; i++) {
            // Sets random values for each parameter
            const x: number = this.randomNumber(200, this.canvas.width - 200);
            const y: number = this.randomNumber(200, this.canvas.height - 200);
            const direction: number = this.randomNumber(0, 359);
            const velocity: number = this.randomNumber(1, 5);
            const radius: number = this.randomNumber(10, 200);
            const colour: string = '#' + Math.floor(Math.random()*16777215).toString(16);

            // Creates a ball object
            const ball: Ball = new Ball(x, y, direction, velocity, radius, colour);

            // Pushes the ball object to the balls array (then repeats the process)
            this.balls.push(ball);
        }
    }

    /**
     * Main game loop
     * 
     * Clears the screen, moves and draws all of the created balls
     */
    private loop = () => {
        // Clears the canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Goes through the ball array and moves, then draws every ball in the array
        this.balls.forEach(ball => {
            ball.move(this.canvas);
            ball.draw(this.ctx);
        });

        // Loops
        requestAnimationFrame(this.loop);
    }

    /**
     * Renders a random number between min and max
     * @param min Minimal value
     * @param max Maximal value
     */
    private randomNumber(min: number, max: number): number {
        return Math.round(Math.random() * (max - min) + min);
    }
}

// Makes sure the init function is called when the window loads
window.addEventListener('load', init);

/**
 * Adds a canvas element to the body and starts the game
 */
function init() {
    const body: HTMLElement | null = document.getElementById('body');
    const canvas: HTMLCanvasElement = document.createElement('canvas');
    if (body) {
        body.appendChild(canvas);
        const game = new Game(canvas);
    }

}