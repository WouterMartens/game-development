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
    ) {
        let element = document.createElement("img");
        element.src = src;

        //element.addEventListener("load", () => {
            this.ctx.drawImage(element, xCoordinate, yCoordinate);
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
}