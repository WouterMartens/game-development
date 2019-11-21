/**
 * @author Wouter Martens
 */
class Ball {
    private x: number;
    private y: number;
    private direction: number;
    private xVel: number;
    private yVel: number;
    private radius: number;
    private colour: string;

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
     * Handles the movement of the ball across the canvas ( and bouncing against the wall)
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

    /**
     * Draws the ball outline on the given x and y coordinates and with the given colour
     * @param ctx Context to draw with
     */
    public draw(ctx: CanvasRenderingContext2D) {
        ctx.save();

        ctx.beginPath();

        ctx.strokeStyle = this.colour;
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.stroke();

        ctx.restore();
    }
}