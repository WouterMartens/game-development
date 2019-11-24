/// <reference path="Shape.ts" />

class Circle extends Shape {
    constructor(
        x: number,
        y: number,
        direction: number,
        velocity: number,
        radius: number = 25,
        colour: string = 'black'
    ) {
        super(x, y, direction, velocity, radius, colour);
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