/// <reference path="GameItem.ts"/>

class Shark extends GameItem {
    private speed: number;
    private size: number;
    public hitBoat: boolean;
    public boundingBox: any;

    public constructor(x: number, y: number, imgSource: string, canvas: Canvas, speed: number) {
        super(x, y, imgSource, canvas);
        this.speed = speed;
        this.size = canvas.randomNumber(5, 10) / 10;
        this.hitBoat = false;
        this.boundingBox = {
            x1: 0,
            y1: 40 * this.size,
            x2: this.img.width * this.size,
            y2: 50 * this.size
        }
    }

    public draw() {
        this.canvas.writeImageFromFileToCanvas(
            this.imgSource,
            this.xPos,
            this.yPos,
            this.size
        );
    }

    /**
     * Moves the shark from the right to the left of the screen with the given speed
     */
    public moveRightToLeft() {
        // console.log(this.img.width, this.img.height, this.width, this.height);
        this.xPos -= this.speed;
    }

    public isOffScreen(): boolean {
        if (this.xPos + this.img.width < 0) {
            return true;
        }
        return false;
    }

    public getSize(): number {
        return this.size;
    }
}