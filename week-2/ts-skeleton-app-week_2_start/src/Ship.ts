/// <reference path="GameObject.ts" />

class Ship extends GameObject { 
    private keyboardListener: KeyboardListener;
    public bullets: Bullet[];

    constructor(
        xPos: number,
        yPos: number,
        xVel: number,
        yVel: number,
        rotation: number,
        keyboardListener: KeyboardListener
    ) {
        super(xPos, yPos, xVel, yVel, rotation);

        this.loadImage(this.randomShip());

        this.bullets = [];
        this.keyboardListener = keyboardListener;
    }

    public move(canvas: HTMLCanvasElement) {
        if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_RIGHT)) {
            this.rotation += this.degreesToRadian(3);
        }
        if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_LEFT)) {
            this.rotation -= this.degreesToRadian(3);
        }
        if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_UP)) {
            this.xPos += Math.sin(this.rotation) * this.xVel;
            this.yPos -= Math.cos(this.rotation) * this.yVel;
        }
        if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_DOWN)) {
            this.xPos -= Math.sin(this.rotation) * this.xVel;
            this.yPos += Math.cos(this.rotation) * this.yVel;
        }
        if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE)) {
            this.shoot();
        }
    }

    private shoot() {
        this.bullets.push(new Bullet(this.xPos, this.yPos, this.xVel * 1.5, this.yVel * 1.5, this.rotation, this));
    }

    private degreesToRadian(num: number): number {
        return Math.PI / 180 * num;
    }

    private randomShip() {
        const string = './assets/images/SpaceShooterRedux/PNG/';
        const type = Game.randomNumber(1, 4);
        const colours: string[] = ['blue', 'green', 'red', 'orange'];
        if (type === 4) { colours[3] = 'yellow'; }
        const colour = colours[Game.randomNumber(0, 3)];
        
        if (type < 4) {
            return string + `playerShip${type}_${colour}.png`
        } else {
            return string + `ufo${colour}.png`
        }
    }
}