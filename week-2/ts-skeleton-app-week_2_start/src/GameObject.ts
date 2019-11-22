class GameObject {
    protected _xPos: number;
    protected _yPos: number;
    protected _xVel: number;
    protected _yVel: number;
    protected _rotation: number;
    protected _rotationVel: number;
    protected img: HTMLImageElement;

    constructor(xPos: number, yPos: number, xVel: number, yVel: number, rotation: number) {
        this._xPos = xPos;
        this._yPos = yPos;

        this._xVel = xVel;
        this._yVel = yVel;

        this._rotation = Math.PI / 180 * rotation;
        this._rotationVel = 0;
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

    get rotationVel(): number {
        return this._rotationVel;
    }

    set rotationVel(value: number) {
        this._rotationVel = value;
    }

    public draw(ctx: CanvasRenderingContext2D) {
        if (this.img.naturalWidth > 0) {
            ctx.save();

            ctx.translate(this.xPos + 0.5 * this.img.width, this.yPos + 0.5 * this.img.height);
            ctx.rotate(this.rotation);
            ctx.translate(-(this.xPos + 0.5 * this.img.width), -(this.yPos + 0.5 * this.img.height));

            ctx.drawImage(this.img, this.xPos, this.yPos);

            ctx.restore();

            this.rotation += this.rotationVel;
        }
    }
    
    public loadImage(source: string) {
        this.img = new Image();
        this.img.src = source;
    }
}