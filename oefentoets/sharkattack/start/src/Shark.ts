/// <reference path="GameItem.ts"/>

class Shark extends GameItem {
    private speed: number;

    public constructor(x: number, y: number, imgSource: string, canvas: Canvas, speed: number) {
        super(x, y, imgSource, canvas);
        this.speed = speed;
    }

    /**
     * Moves the shark from the right to the left of the screen with the given speed
     */
    public moveRightToLeft() {
        this.xPos -= this.speed;
    }

    public isOffScreen(): boolean {
        if (this.xPos + this.img.width < 0) {
            return true;
        }
        return false;
    }
}