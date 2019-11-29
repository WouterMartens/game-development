/**
 * @author Wouter Martens
 */
class GameObject {
    protected readonly imgUrl: string;
    protected _xPos: number;
    protected _yPos: number;
    protected _xVel: number;
    protected _yVel: number;
    protected _lifespan: number;
    protected _img: HTMLImageElement;
    protected _spawnTime: DOMHighResTimeStamp;

    /**
     * Creates an instance of the class GameObject
     * @param imgUrl Url of the locaten of the image to use for this object
     * @param x Horizontal position on the screen
     * @param y Vertical position on the screen
     * @param xVel Horizontal velocity in pixels per frame
     * @param yVel Vertical velocity in pixels per frame
     * @param lifespanInSeconds Amount of time the object should be on screen
     */
    public constructor(
        imgUrl: string,
        x: number,
        y: number,
        xVel: number,
        yVel: number,
        lifespanInSeconds: number
    ) {
        this.imgUrl = imgUrl;
        this._xPos = x;
        this._yPos = y;
        this._xVel = xVel;
        this._yVel = yVel;
        this._lifespan = lifespanInSeconds;
        this._img = this.loadImage(this.imgUrl);
        this._spawnTime = performance.now();
    }

    // Start of getters and setters
    /**
     * Gets the current value for the x position;
     * @return {number} Current x position
     */
    get xPos(): number {
        return this._xPos;
    }

    /**
     * Sets a new value for the x position
     * @param {number} value New value for the x position
     */
    set xPos(value: number) {
        this._xPos = value;
    }

    // etc.
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

    get lifespan(): number {
        return this._lifespan;
    }

    /**
     * @return The amount of time this object has been alive for
     */
    public getTimeAlive(): DOMHighResTimeStamp {
        return performance.now() - this._spawnTime;
    }

    /**
     * Returns the HTMLImageElement of this object
     */
    get image(): HTMLImageElement {
        return this._img;
    }
    // End of getters and setters

    public move(canvas: Canvas): void { }

    /**
     * Draws the image using the given rendering context
     * @param ctx Given rendering context
     */
    public draw(ctx: CanvasRenderingContext2D): void {
        ctx.drawImage(this.image, this.xPos, this.yPos);
    }

    /**
     * Method to load an image
     * @param {string} source Location of the image to load
     * @returns {HTMLImageElement} Returns an image
     */
    private loadImage(source: string): HTMLImageElement {
        const img = new Image();
        img.src = source;
        return img;
    }
}