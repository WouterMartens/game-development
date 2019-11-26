/// <reference path="GameObject.ts" />

interface Point {
    x: number;
    y: number;
}

class Bullet extends GameObject {
    private width: number;
    private height: number;
    // private radius: number;
    private ship: Ship;
    public point: Point;
    public isOffScreen: boolean;

    constructor(xPos: number, yPos: number, xVel: number, yVel: number, rotation: number, ship: Ship) {
        super(xPos, yPos, xVel, yVel, rotation);

        this.xPos = xPos;
        this.yPos = yPos;
        this.rotation = rotation;
        this.xVel = xVel;
        this.yVel = yVel;
        this.width = 3;
        this.height = 30;

        this.point = {
            x: xPos,
            y: yPos
        }

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

        ctx.translate(this.xPos, this.yPos);
        ctx.rotate(this.rotation);
        ctx.translate(-(this.xPos), -(this.yPos));

        this.point.x = this.xPos - this.width / 2;
        this.point.y = this.yPos - this.ship.img.height / 2;

        ctx.fillStyle = 'white';
        ctx.fillRect(this.xPos - this.width / 2, this.yPos - this.ship.img.height / 2, this.width, this.height);

        // debug
        // ctx.fillStyle = 'red';
        // ctx.fillRect(this.xPos - 2, this.yPos - this.ship.img.height / 2, 4, 4);

        ctx.restore();
    }

    public hit(gameObject: GameObject): boolean {
        const cx: number = gameObject.xPos;
        const cy: number = gameObject.yPos;
        const radius: number = gameObject.radius;
        const distX: number = this.xPos - cx;
        const distY: number = this.yPos - cy;
        const distance: number = Math.sqrt((distX*distX) + (distY*distY));

        if (distance <= radius) {
            return true;
        }
        return false;
    }
}