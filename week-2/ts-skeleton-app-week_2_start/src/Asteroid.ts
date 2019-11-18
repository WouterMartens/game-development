class Asteroid {
    private _x: number;
    private _y: number;
    private _velocityX: number;
    private _velocityY: number;
    private _rotation: number;
    private _rotationVelocity: number;
    public img: HTMLImageElement;
    private source: string;

    constructor(x: number, y: number, velocityX: number, velocityY: number, rotation: number, rotationVelocity: number) {
        this._x = x;
        this._y = y;

        this._velocityX = velocityX;
        this._velocityY = velocityY;

        this._rotation = Math.PI / 180 * rotation;
        this._rotationVelocity = rotationVelocity;
        console.log(rotationVelocity);

        this.img = new Image();
        this.source = this.getRandomAsteroid();
        this.loadImage(this.source);
    }

    get x(): number {
        return this._x;
    }

    set x(value: number) {
        this._x = value;
    }

    get y(): number {
        return this._y;
    }

    set y(value: number) {
        this._y = value;
    }

    get velocityX(): number {
        return this._velocityX;
    }

    set velocityX(value: number) {
        this._velocityX = value;
    }

    get velocityY(): number {
        return this._velocityY;
    }

    set velocityY(value: number) {
        this._velocityY = value;
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
        // ctx.translate(-this.img.width / 2, -this.img.height / 2);
        // ctx.drawImage(this.img, this.x, this.y);
        // ctx.translate(this.img.width / 2, this.img.height / 2);

        ctx.save();

        ctx.translate(this.x + 0.5 * this.img.width, this.y + 0.5 * this.img.height);
        ctx.rotate(this.rotation);
        ctx.translate(-(this.x + 0.5 * this.img.width), -(this.y + 0.5 * this.img.height));

        ctx.drawImage(this.img, this.x, this.y);

        ctx.restore();

        this.rotation += this.rotationVelocity;
    }

    public move(canvas: HTMLCanvasElement) {
        if (this.x >= canvas.width - this.img.width || this.x <= 0) {
            this.velocityX *= -1;
        }

        if (this.y >= canvas.height - this.img.height || this.y <= 0) {
            this.velocityY *= -1;
        }

        this.x += this.velocityX;
        this.y += this.velocityY;
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