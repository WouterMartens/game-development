/// <reference path="GameItem.ts"/>

class Boat extends GameItem {
    private keyboardListener: KeyBoardListener;
    public isHit: boolean;

    public constructor(x: number, y: number, imgSource: string, canvas: Canvas) {
        super(x, y, imgSource, canvas);
        this.keyboardListener = new KeyBoardListener();

        this.isHit = false;
    }

    /**
     * Moves the object
     */
    public move(): void {
        if (this.keyboardListener.getUpPressed()) {
            this.yPos -= 5;
        }
        if (this.keyboardListener.getDownPressed()) {
            this.yPos += 5;
        }
        if (this.keyboardListener.getRightPressed()) {
            this.xPos += 5;
        }
        this.xPos -= 0.5;

        if (this.xPos < 0) {
            this.xPos = 0;
        }
        if (this.xPos > this.canvas.getWidth() - this.img.width) {
            this.xPos = this.canvas.getWidth() - this.img.width;
        }
        if (this.yPos < 0) {
            this.yPos = 0;
        }
        if (this.yPos > this.canvas.getHeight() - this.img.height) {
            this.yPos = this.canvas.getHeight() - this.img.height;
        }
    }

    /**
     * Checks if the boat is colliding with a given object
     * @param shark Object to check a collision on
     */
    public isColliding(shark: Shark): boolean {
        // this.canvas.getContext().save();
        // this.canvas.getContext().strokeStyle = 'red';
        // this.canvas.getContext().strokeRect(shark.getX(), shark.getY() + 40, shark.getWidth(), shark.getHeight() - 90);
        // this.canvas.getContext().restore();

        if ((this.yPos + this.img.height >  shark.getY() + 40) &&
            (this.yPos <  shark.getY() + shark.getHeight() - 50) &&
            (this.xPos + this.img.width > shark.getX()) &&
            (this.xPos <  shark.getX() + shark.getWidth())
        ) {
            return true;
        } 
        return false;
    }
}
