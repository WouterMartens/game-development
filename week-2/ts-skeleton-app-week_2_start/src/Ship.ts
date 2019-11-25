/// <reference path="GameObject.ts" />

interface Thrust {
    x: number;
    y: number;
}

class Ship extends GameObject {
    private keyboardListener: KeyboardListener;
    public bullets: Bullet[];

    private lastShot: DOMHighResTimeStamp;
    private rpm: number;

    private thrusting: boolean;
    private thrust: Thrust;
    private friction: number;
    private rot: number;
    private fps: number;

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

        this.rpm = 600;
        this.lastShot = null;

        this.thrusting = false;
        this.thrust = {
            x: 0,
            y: 0
        }
        this.friction = 0.7;
        this.fps = 60;
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
        // if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_DOWN)) {
        //     this.xPos -= Math.sin(this.rotation) * this.xVel;
        //     this.yPos += Math.cos(this.rotation) * this.yVel;
        // }
        if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE)) {
            this.shoot();
        }
    }

    private shoot() {
        const t = performance.now();
        if (t - this.lastShot >= 1000 / (this.rpm / 60)) {
            this.bullets.push(new Bullet(this.xPos, this.yPos, this.xVel * 3, this.yVel * 3, this.rotation, this));
            this.lastShot = performance.now();
        }
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