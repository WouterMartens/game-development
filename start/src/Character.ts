/// <reference path="GameEntity.ts"/>

class Character extends GameEntity {
    private xVel: number;
    private keyboardListener: KeyboardListener;
    private playerState: string;
    private score: number;

    constructor(xPos: number, yPos: number, xVel: number) {
        super('./assets/img/buzz.png', xPos, yPos);
        this.xVel = xVel;
        this.playerState = "moving";
        this.keyboardListener = new KeyboardListener();
        this.score = 0;

        console.log(xPos, yPos);
    }

    /**
     * Moves the player depending on which arrow key is pressed. Player is bound
     * to the canvas and cannot move outside of it
     */
    public move(canvas: HTMLCanvasElement) {
        // Player is automaticly moving from left to right
        if (this.playerState == "moving") {
            if (
                this.xPos + this.img.width >= canvas.width ||
                this.xPos < 0
            ) {
                this.xVel = -this.xVel;
            }
            this.xPos += this.xVel;
        }

        // Using the space bar to jump for a coin
        if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE)) {
            this.playerState = "hyperjump";
            this.yPos = 50;
        }

        // If de player wants to go down to the bottom of the screen press down arrow
        if (
            this.keyboardListener.isKeyDown(KeyboardListener.KEY_DOWN) &&
            this.playerState == "hyperjump"
        ) {
            this.playerState = "moving";
            this.yPos = canvas.height - 260;
        }
    }

        /**
     * Removes coins from the game based on box collision detection.
     *
     * NOTE: We use a filter command in this method. A filter is basically a
     * for-loop that returns a new array. It does so by comparing every element
     * of the array with a given check. In this case, that is the collision
     * detection algorithm in the if-statement.
     *
     * If we have a collision, that means the players is standing on top of an
     * coin and therefore, it needs to be removed from the array.
     * The filter command does this for us, but it's a bit paradoxical since
     * we don't do anything in the if-statement. We only return elements in the
     * else-statement.
     *
     * By not returning an coin we have collision with to the new array, and
     * returning coins we don't have a collision with, we effectively remove
     * elements from the array. Try to do this as a mental exercise with only
     * two elements in the array. You have collision with the first, but not
     * with the second element. What does the if-statement do for the
     * individual elements?
     *
     * Read for more info: https://alligator.io/js/filter-array-method/
     */
    public collision(item: Coin): boolean {
        if (
            this.getXPos() < item.getXPos() + item.getImg().width &&
            this.getXPos() + this.getImg().width > item.getXPos() &&
            this.getYPos() < item.getYPos() + item.getImg().height &&
            this.getYPos() + this.getImg().height > item.getYPos()
        ) {
            this.score += item.getScore();
            return true;
        } else {
            return false;
        }
    }

    /**
     * Returns the total score of the player
     * @return score
     */
    getTotalScore(): number {
        return this.score;
    }
}