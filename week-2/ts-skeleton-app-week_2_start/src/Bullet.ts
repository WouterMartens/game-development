/// <reference path="GameObject.ts" />

class Bullet extends GameObject {
    private width: number;
    private height: number;
    private radius: number;
    private ship: Ship;
    public isOffScreen: boolean;

    constructor(xPos: number, yPos: number, xVel: number, yVel: number, rotation: number, ship: Ship) {
        super(xPos, yPos, xVel, yVel, rotation);

        this.xPos = xPos;
        this.yPos = yPos;
        this.rotation = rotation;
        this.xVel = xVel;
        this.yVel = yVel;
        this.width = 3;
        this.height = 10;

        this.isOffScreen = false;
        this.ship = ship;
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
        // Checks if the bullet is off the screen
        if ((this.xPos >= canvas.width + this.height) ||
            (this.xPos <= 0 - this.height)) {
            this.isOffScreen = true;
        }

        // Checks if the bullet is off the screen
        if ((this.yPos >= canvas.height + this.height) ||
            (this.yPos <= 0 - this.height)) {
                this.isOffScreen = true;
        }

        // Calculates the amount to translate the x and y value respectively
        this.xPos += Math.sin(this.rotation) * this.xVel;
        this.yPos -= Math.cos(this.rotation) * this.yVel;
    }

    /**
     * Draws the ball outline on the given x and y coordinates and with the given colour
     * @param ctx Context to draw with
     */
    public draw(ctx: CanvasRenderingContext2D) {
        ctx.save();

        ctx.translate(this.xPos + 0.5 * this.ship.img.width, this.yPos + 0.5 * this.ship.img.height);
        ctx.rotate(this.rotation);
        ctx.translate(-(this.xPos + 0.5 * this.ship.img.width), -(this.yPos + 0.5 * this.ship.img.height));

        ctx.fillStyle = 'white';
        ctx.fillRect(this.xPos + this.ship.img.width / 2 - this.width / 2, this.yPos, this.width, this.height);

        ctx.restore();
    }

    public debug(ctx: CanvasRenderingContext2D) {
        const x = this.xPos + this.width + 10;
        let y = this.yPos + this.height + 10;
        const size = 10;
        this.drawTextToCanvas(`${x.toFixed(0)}, ${y.toFixed(0)}`, x, y, ctx, size);
        y += size + 2;
        this.drawTextToCanvas(`${this.xVel}, ${this.yVel}`, x, y, ctx, size);
        y += size + 2;
        this.drawTextToCanvas(`${this.rotation.toFixed(0)}, ${this.rotationVel.toFixed(3)}`, x, y, ctx, size)   
    }
}