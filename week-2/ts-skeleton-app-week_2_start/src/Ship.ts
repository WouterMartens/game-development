class Ship {
    private _xPos: number;
    private _yPos: number;
    private _xVel: number;
    private _yVel: number;
    private _rotation: number;
    private _rotationVel: number;
    private img: HTMLImageElement;

    private keyboardListener: KeyboardListener;

    constructor(
        imgUrl: string,
        xPos: number,
        yPos: number,
        xVel: number,
        yVel: number,
        keyboardListener: KeyboardListener
    ) {
        this._xPos = xPos;
        this._yPos = yPos;
        this._xVel = xVel;
        this._yVel = yVel;
        this._rotation = 0;

        this.loadImage(imgUrl);


        this.keyboardListener = keyboardListener;
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
            //this.yPos += this.yVel;
        }
        if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE)) {
            this.shoot();
        }
    }

    private shoot() {
        console.log('pew pew');
    }

    public draw(ctx: CanvasRenderingContext2D) {
        if (this.img.naturalWidth > 0) {
            ctx.save();

            ctx.translate(this.xPos + 0.5 * this.img.width, this.yPos + 0.5 * this.img.height);
            ctx.rotate(this.rotation);
            ctx.translate(-(this.xPos + 0.5 * this.img.width), -(this.yPos + 0.5 * this.img.height));

            ctx.drawImage(this.img, this.xPos, this.yPos);

            ctx.restore();
        }
    }

    private loadImage(source: string) {
        this.img = new Image();
        this.img.src = source;
    }

    private degreesToRadian(num: number): number {
        return Math.PI / 180 * num;
    }
}