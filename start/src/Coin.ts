/// <reference path="GameEntity.ts"/>

class Coin extends GameEntity {
    private score: number;

    constructor(xPos: number, yPos: number) {
        super('./assets/img/coin.png', xPos, yPos);
        this.score = 3;
    }

    /**
     * Gets the score that this coin should give
     * @return amount this coin should add to the player's score
     */
    getScore(): number {
        return this.score;
    }
}