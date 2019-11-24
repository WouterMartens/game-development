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
        imgUrl: string,
        keyboardListener: KeyboardListener
    ) {
        super(xPos, yPos, xVel, yVel, rotation);

        this.loadImage(imgUrl);

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
}