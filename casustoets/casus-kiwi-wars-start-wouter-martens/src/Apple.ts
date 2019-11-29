/// <reference path="GameObject.ts"/>

/**
 * @author Wouter Martens
 */
class Apple extends GameObject {
    /**
     * Creates an instance of the class Apple
     * @param imgUrl Url of the locaten of the image to use for this object
     * @param x Horizontal position on the screen
     * @param y Vertical position on the screen
     * @param xVel Horizontal velocity in pixels per frame
     * @param yVel Vertical velocity in pixels per frame
     * @param lifespanInSeconds Amount of time the object should be on screen
     */
    public constructor(
        imgUrl: string,
        x: number,
        y: number,
        xVel: number,
        yVel: number,
        lifespan: number
    ) {
        super(imgUrl, x, y, xVel, yVel, lifespan);
    }

    /**
     * Moves the object (polymorphisme)
     * @param canvas Canvas that the object should be moving across
     */
    public move(canvas: Canvas): void {
        if (
            this.xPos + this.image.width - 28 > canvas.width ||
            this.xPos < 0
        ) {
            this.xVel *= -1;
        }
        if (
            this.yPos + this.image.height - 28 > canvas.height ||
            this.yPos < 0
        ) {
            this.yVel *= -1;
        }
        this.xPos += this.xVel;
        this.yPos += this.yVel;
    }
}