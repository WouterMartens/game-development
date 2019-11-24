/// <reference path="Shape.ts" />

class Square extends Shape {
    size: number;

    constructor(
        x: number,
        y: number,
        direction: number,
        velocity: number,
        radius: number = 25,
        colour: string = 'black'
    ) {
        super(x, y, direction, velocity, radius, colour);
        this.size = radius * 2;
    }

    /**
     * Draws the ball outline on the given x and y coordinates and with the given colour
     * @param ctx Context to draw with
     */
    public draw(ctx: CanvasRenderingContext2D) {
        ctx.save();

        ctx.beginPath();

        ctx.strokeStyle = this.colour;
        ctx.strokeRect(this.x - this.radius, this.y - this.radius, this.size, this.size);
        ctx.stroke();

        ctx.restore();
    }
}