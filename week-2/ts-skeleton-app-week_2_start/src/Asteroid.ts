/// <reference path="GameObject.ts" />

class Asteroid extends GameObject {
    constructor(xPos: number, yPos: number, xVel: number, yVel: number, rotation: number, rotationVel: number = 1) {
        super(xPos, yPos, xVel, yVel, rotation);

        const negativeX = Math.random() < 0.5 ? true : false;
        const negativeY = Math.random() < 0.5 ? true : false;
        const direction = Math.random() < 0.5 ? true : false;
        if (negativeX) { this.xVel *= -1; }
        if (negativeY) { this.yVel *= -1; }
        if (direction) { this.rotationVel *= -1; }

        this.rotationVel = Math.PI / 180 * rotationVel;

        this.loadImage(this.getRandomAsteroid());

        this.state = 'flying';
    }

    public move(canvas: HTMLCanvasElement) {
        const width: number = this.img.width / 2;
        const height: number = this.img.height / 2;

        if ((this.xPos >= canvas.width - width && this.xVel > 0 ) ||
            (this.xPos <= 0 + width && this.xVel / 2 < 0)) {
            this.xVel *= -1;
        }

        if ((this.yPos >= canvas.height - height && this.yVel > 0) || 
            (this.yPos <= 0 + height && this.yVel < 0)) {
            this.yVel *= -1;
        }

        this.xPos += this.xVel;
        this.yPos += this.yVel;
        // this.xPos += Math.sin(this.rotation) * this.xVel;
        // this.yPos -= Math.cos(this.rotation) * this.yVel;
    }

    private getRandomAsteroid(): string {
        let colour: string = '';
        let size: string = '';
        let amount: number = 2;

        if (Game.randomNumber(1, 2) === 1) {
            colour = 'Brown';
        } else {
            colour = 'Grey';
        }

        switch(Game.randomNumber(1, 4)) {
            case 1:
                size = 'tiny';
                break;
            case 2:
                size = 'small';
                break;
            case 3:
                size = 'med';
                break;
            case 4:
                size = 'big';
                amount = 4;
                break;
        }

        let number: number = Game.randomNumber(1, amount);

        return `./assets/images/SpaceShooterRedux/PNG/Meteors/meteor${colour}_${size}${number}.png`;
    }
}