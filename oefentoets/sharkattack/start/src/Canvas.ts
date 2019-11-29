class Canvas {
    private readonly _canvas: HTMLCanvasElement;
    private readonly ctx: CanvasRenderingContext2D;

    /**
     * Create a canvas instance
     * @param {HTMLCanvasElement} canvasId - id of the canvas element 
     */
    public constructor(canvasId: HTMLCanvasElement) {
        this._canvas = canvasId;
        this._canvas.width = window.innerWidth;
        this._canvas.height = window.innerHeight;
        this.ctx = this._canvas.getContext('2d');
    }

    /**
     * Clears the current canvas
     */
    public clear() {
        this.ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
    }

    /**
     * Creates an image element and loads the image source to that element
     * @param imgUrl Location of an image
     */
    public loadImage(imgUrl: string): HTMLImageElement {
        const img = new Image();
        img.src = imgUrl;
        return img;
    }

    /**
     * Function to write text to the canvas
     * @param {string} text
     * @param {number} fontSize 
     * @param {number} xCoordinate 
     * @param {number} yCoordinate 
     * @param {string} color 
     * @param {CanvasTextAlign} alignment 
     */
    public writeTextToCanvas(
        text: string,
        fontSize: number,
        xCoordinate: number,
        yCoordinate: number,
        color: string = "white",
        alignment: CanvasTextAlign = "center"
    ) {
        this.ctx.font = `${fontSize}px Arial`;
        this.ctx.fillStyle = color;
        this.ctx.textAlign = alignment;
        this.ctx.fillText(text, xCoordinate, yCoordinate);
    }

    public getContext() {
        return this.ctx;
    }

    /**
     * Function to write the image to the canvas
     * @param {string} src 
     * @param {number} xCoordinate 
     * @param {number} yCoordinate  
     */
    public writeImageFromFileToCanvas(
        src: string,
        xCoordinate: number,
        yCoordinate: number,
        scale: number = 1
    ) {
        let element = document.createElement("img");
        element.src = src;

        //element.addEventListener("load", () => {
        this.ctx.save();

        this.ctx.translate(xCoordinate, yCoordinate + element.height / 2);
        this.ctx.scale(scale, scale);
        this.ctx.translate(-xCoordinate, -(yCoordinate + element.height / 2));

        this.ctx.drawImage(element, xCoordinate, yCoordinate);
        this.ctx.restore();
        //});
    }

    /**
    * Renders a random number between min and max
    * @param {number} min - minimal time
    * @param {number} max - maximal time
    */
    public randomNumber(min: number, max: number): number {
        return Math.round(Math.random() * (max - min) + min);
    }

    /**
     * Returns the width of this canvas
     */
    public getWidth(): number {
        return this._canvas.width;
    }

    /**
     * Returns the height of this canvas
     */
    public getHeight(): number {
        return this._canvas.height;
    }

    /**
     * 
     * @param text 
     * @param fontSize 
     * @param xCoordinate 
     * @param yCoordinate 
     * @param color 
     * @param alignment 
     */
    public writeDropShadowText(
        text: string,
        fontSize: number,
        xCoordinate: number,
        yCoordinate: number,
        color: string = "white",
        alignment: CanvasTextAlign = "center"
    ) {
        this.writeTextToCanvas(text, fontSize, xCoordinate, yCoordinate + (fontSize / 20), 'black', alignment);
        this.writeTextToCanvas(text, fontSize, xCoordinate, yCoordinate, color, alignment);
    }

    /**
     * Writes game over text to screen with a dropshadow
     */
    public writeGameOver() {
        const string = 'Game over!';
        const size = 100;
        const x = this.getWidth() / 2;
        const y = this.getHeight() / 2;

        this.writeDropShadowText(
            string,
            size,
            x,
            y,
            'white'
        );
    }

    public writeScore(score: number) {
        this.writeDropShadowText(
            `Score: ${score}`,
            50,
            20,
            100,
            'white',
            'left'
        )
    }

        /**
     * Writes game over text to screen with a dropshadow
     */
    public writeLives(lives: number) {
        const string = 'Lives: ' + lives;
        const size = 50;
        const x = 20;
        const y = 50;

        this.writeDropShadowText(
            string,
            size,
            x,
            y,
            'white',
            'left'
        );
    }
}