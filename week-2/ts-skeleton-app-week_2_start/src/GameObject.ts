class GameObject {
    protected _xPos: number;
    protected _yPos: number;
    protected _xVel: number;
    protected _yVel: number;
    protected _rotation: number;
    protected _rotationVel: number;
    public state: string;
    public img: HTMLImageElement; 
    public radius: number;

    constructor(xPos: number, yPos: number, xVel: number, yVel: number, rotation: number) {
        this._xPos = xPos;
        this._yPos = yPos;

        this._xVel = xVel;
        this._yVel = yVel;

        this._rotation = Math.PI / 180 * rotation;
        this._rotationVel = 0;

        this.state = 'spawning';
        this.radius = 0;
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

    // public isHit(c1x: number, c1y: number, c1r: number, c2x: number, c2y: number, c2r: number, ctx: CanvasRenderingContext2D): boolean {
    // public isColliding(object: GameObject): boolean {
    //     // const distX: number = c1x - c2x;
    //     const distY: number = c1y - c2y;
    //     const distance: any = Math.sqrt((distX * distX) + (distY*distY));

    //     if (distance <= c1r + c2r) {
    //         ctx.save();

    //         ctx.strokeStyle = 'red';

    //         ctx.beginPath();
    //         ctx.arc(c1x, c1y, c1r, 0, Math.PI * 2);
    //         ctx.beginPath();
    //         ctx.arc(c2x, c2y, c2r, 0, Math.PI * 2);
    //         ctx.stroke();

    //         ctx.restore();

    //         this.state = 'hit';
    //         return true;
    //     }
    //     this.state = 'flying';
    //     return false;
    // }

    public isColliding(gameObject: GameObject, ctx: CanvasRenderingContext2D): boolean {
        const c1x: number = this.xPos;
        const c1y: number = this.yPos;
        const c1r: number = this.radius;
        const c2x: number = gameObject.xPos;
        const c2y: number = gameObject.yPos;
        const c2r: number = gameObject.radius;
        
        const distX: number = c1x - c2x;
        const distY: number = c1y - c2y;
        const distance: any = Math.sqrt((distX * distX) + (distY*distY));

        if (distance <= c1r + c2r) {
            ctx.save();

            ctx.strokeStyle = 'red';

            ctx.beginPath();
            ctx.arc(c1x, c1y, c1r, 0, Math.PI * 2);
            ctx.beginPath();
            ctx.arc(c2x, c2y, c2r, 0, Math.PI * 2);
            ctx.stroke();

            ctx.restore();

            this.state = 'hit';
            return true;
        }
        
        this.state = 'flying';
        return false;
    }

    public draw(ctx: CanvasRenderingContext2D) {
        if (this.img.naturalWidth > 0) {
            if (this.radius === 0) {
                this.radius = (this.img.naturalWidth + this.img.naturalHeight) / 4;
            }

            ctx.save();

            ctx.translate(this.xPos, this.yPos);
            ctx.rotate(this.rotation);
            ctx.translate(-this.xPos, -this.yPos);

            ctx.drawImage(this.img, this.xPos - this.img.width / 2, this.yPos - this.img.height / 2);

            ctx.restore();

            this.rotation += this.rotationVel;
        }
    }

    /**
     * Draws text to the canvas according to the given parameters
     * @param text String that needs to be shown on the canvas
     * @param x starting X coordinate of the text
     * @param y starting Y coordinate of the text
     * @param fontSize font size of the text in pixels
     * @param alignment where to start drawing the text (left, center, etc.), standard is center
     * @param colour Colour of the text, standard is white
     */
    public drawTextToCanvas(
        text: string,
        x: number,
        y: number,
        ctx: CanvasRenderingContext2D,
        fontSize: number = 10, 
        alignment: CanvasTextAlign = 'left',
        colour: string = 'white'
    ): void {
        ctx.save();

        ctx.fillStyle = colour;
        ctx.font = fontSize + 'px Roboto';
        ctx.textAlign = alignment;
        ctx.fillText(text, x, y);

        ctx.restore();
    }

    public debug(ctx: CanvasRenderingContext2D) {
        const x = this.xPos + this.img.width / 2;
        let y = this.yPos + this.img.height / 2;
        const size = 10;
        const center = (this.img.naturalWidth + this.img.naturalHeight) / 4;

        ctx.save();

        // Position
        this.drawTextToCanvas(`${x.toFixed(0)}, ${y.toFixed(0)}`, x, y, ctx, size);
        y += size + 2;
        // Velocity
        this.drawTextToCanvas(`${this.xVel}, ${this.yVel}`, x, y, ctx, size);
        y += size + 2;
        // Rotation
        this.drawTextToCanvas(`${this.rotation.toFixed(0)}, ${this.rotationVel.toFixed(3)}`, x, y, ctx, size);
        y += size + 2;
        // State
        this.drawTextToCanvas(`${this.state}`, x, y, ctx, size);
        
        // Center point
        ctx.fillStyle = 'red';
        ctx.fillRect(this.xPos - 2, this.yPos - 2, 4, 4);

        // Bounding body circle
        ctx.beginPath();
        ctx.strokeStyle = 'white';
        ctx.arc(this.xPos, this.yPos, center, 0, 2 * Math.PI);
        ctx.stroke();

        ctx.restore();
    }
    
    public loadImage(source: string) {
        this.img = new Image();
        this.img.src = source;
    }
}