/// <reference path="GameItem.ts"/>

class Boat extends GameItem {
    private keyboardListener: KeyBoardListener;

    public constructor(x: number, y: number, imgSource: string, canvas: Canvas) {
        super(x, y, imgSource, canvas);
        this.keyboardListener = new KeyBoardListener();
    }

    /**
     * Moves the object
     */
    public move(): void {
        if (this.keyboardListener.getUpPressed()) {
            this.yPos--;
        }
        if (this.keyboardListener.getDownPressed()) {
            this.yPos++;
        }
        if (this.keyboardListener.getRightPressed()) {
            this.xPos++;
        }
    }

    /**
     * Checks if the boat is colliding with a given object
     * @param shark Object to check a collision on
     */
    public isColliding(shark: Shark): boolean {
        return false;
    }
}