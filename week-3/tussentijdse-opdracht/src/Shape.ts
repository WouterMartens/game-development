/**
 * @author Wouter Martens
 */
class Shape {
    protected x: number;
    protected y: number;
    protected direction: number;
    protected xVel: number;
    protected yVel: number;
    protected radius: number;
    protected colour: string;

    constructor(
        x: number,
        y: number,
        direction: number,
        velocity: number,
        radius: number = 25,
        colour: string = 'black'
    ) {
        this.x = x;
        this.y = y;
        this.direction = Math.PI / 180 * direction;
        this.xVel = velocity;
        this.yVel = velocity;
        this.radius = radius;
        this.colour = colour;
    }

    /**
     * Handles the movement of the ball across the canvas (and bouncing against the wall)
     * 
     * Note to self: including the velocity check (to fix the stuck on edge bug) probably doesn't work
     * because of the way I used Math.sin/Math.cos. Velocity might never be (or is always) negative?
     * 
     * @param canvas Uses canvas to find the bounding box
     */
    public move(canvas: HTMLCanvasElement) {
        // Inverts the velocity of the x axis if the ball hits the left or right side
        if ((this.x >= canvas.width - this.radius) ||
            (this.x <= 0 + this.radius)) {
            this.xVel *= -1;
        }

        // Inverts the velocity of the y axis if the ball hits the top or bottom side
        if ((this.y >= canvas.height - this.radius) ||
            (this.y <= 0 + this.radius)) {
            this.yVel *= -1;
        }

        // Calculates the amount to translate the x and y value respectively
        this.x += Math.sin(this.direction) * this.xVel;
        this.y -= Math.cos(this.direction) * this.yVel;
    }

    public draw(ctx: CanvasRenderingContext2D): void { }
}