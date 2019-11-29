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
        this.xPos -= 1;

        const width = this.canvas.getWidth() - this.img.width;
        const height = this.canvas.getHeight() - this.img.height;

        if (this.xPos < 0) {
            this.xPos = 0;
        }
        if (this.xPos > width) {
            this.xPos = width;
        }
        if (this.yPos < 0) {
            this.yPos = 0;
        }
        if (this.yPos > height) {
            this.yPos = height;
        }
    }

    /**
     * Checks if the boat is colliding with a given object
     * @param shark Object to check a collision on
     */
    public isColliding(shark: Shark): boolean {
        const ctx = this.canvas.getContext();
        ctx.save();
        ctx.strokeStyle = 'red';
        console.log(shark.getSize());
        const translateY1 = 42 * (1 + (1 - shark.getSize()));
        const translateY2 = 50 * (1 + (1 - shark.getSize()));
        ctx.strokeRect(shark.getX(), shark.getY() + translateY1, shark.getWidth() * shark.getSize(), shark.getHeight() - translateY2 - translateY1);
        ctx.restore();

        if ((this.yPos + this.img.height >  shark.getY() + translateY1) &&
            (this.yPos <  shark.getY() + shark.getHeight() - translateY2) &&
            (this.xPos + this.img.width > shark.getX()) &&
            (this.xPos <  shark.getX() + shark.getWidth())
        ) {
            return true;
        } 
        return false;
    }
}
