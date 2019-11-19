class Asteroid {
    private _xPos: number;
    private _yPos: number;
    private _xVel: number;
    private _yVel: number;
    private _rotation: number;
    private _rotationVelocity: number;
    public img: HTMLImageElement;

    constructor(xPos: number, yPos: number, xVel: number, yVel: number, rotation: number, rotationVelocity: number) {
        this._xPos = xPos;
        this._yPos = yPos;

        this._xVel = xVel;
        this._yVel = yVel;

        const negativeX = Math.random() < 0.5 ? true : false;
        const negativeY = Math.random() < 0.5 ? true : false;

        if (negativeX) { this.xVel *= -1; }
        if (negativeY) { this.yVel *= -1; }

        this._rotation = Math.PI / 180 * rotation;
        this._rotationVelocity = rotationVelocity;

        const direction = Math.random() < 0.5 ? true : false;

        if (direction) { this.rotationVelocity *= -1; }

        this.img = new Image();
        this.loadImage(this.getRandomAsteroid());
    }

    get xPos(): number {
        return this._xPos;
    }

    set xPos(value: number) {
        this._xPos = value;
    }

    get yPos(): number {
        return this._yPos;
    }

    set yPos(value: number) {
        this._yPos = value;
    }

    get xVel(): number {
        return this._xVel;
    }

    set xVel(value: number) {
        this._xVel = value;
    }

    get yVel(): number {
        return this._yVel;
    }

    set yVel(value: number) {
        this._yVel = value;
    }

    get rotation(): number {
        return this._rotation;
    }

    set rotation(value: number) {
        this._rotation = value;
    }

    get rotationVelocity(): number {
        return this._rotationVelocity;
    }

    set rotationVelocity(value: number) {
        this._rotationVelocity = value;
    }

    public loadImage(source: string) {
        this.img.src = source;
    }

    public draw(ctx: CanvasRenderingContext2D) {
        if (this.img.naturalWidth > 0) {
            ctx.save();

            ctx.translate(this.xPos + 0.5 * this.img.width, this.yPos + 0.5 * this.img.height);
            ctx.rotate(this.rotation);
            ctx.translate(-(this.xPos + 0.5 * this.img.width), -(this.yPos + 0.5 * this.img.height));

            ctx.drawImage(this.img, this.xPos, this.yPos);

            ctx.restore();

            this.rotation += this.rotationVelocity;
        }
    }

    public move(canvas: HTMLCanvasElement) {
        if ((this.xPos >= canvas.width - this.img.width && this.xVel > 0 ) ||
            (this.xPos <= 0 && this.xVel < 0)) {
            this.xVel *= -1;
        }

        if ((this.yPos >= canvas.height - this.img.height && this.yVel > 0) || 
            (this.yPos <= 0 && this.yVel < 0)) {
            this.yVel *= -1;
        }

        this.xPos += this.xVel;
        this.yPos += this.yVel;
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

    public collided(xMin: number, yMin: number, xMax: number, yMax: number) {
    }
}