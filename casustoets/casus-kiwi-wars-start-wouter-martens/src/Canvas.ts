/**
 * @author Wouter Martens
 */
class Canvas {
    private readonly _canvas: HTMLCanvasElement;
    private readonly _ctx: CanvasRenderingContext2D;

    /**
     * Create a canvas instance
     * @param {HTMLCanvasElement} canvas The canvas to draw on 
     */
    public constructor(canvas: HTMLCanvasElement) {
        this._canvas = canvas;
        this._canvas.width = window.innerWidth;
        this._canvas.height = window.innerHeight;
        this._ctx = this._canvas.getContext('2d');
    }

    /**
     * Clears the current canvas
     */
    public clear(): void {
        this.ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
    }

    /**
     * Get the canvas
     * @return {HTMLCanvasElement} The canvas
     */
    public get canvas(): HTMLCanvasElement {
        return this._canvas;
    }

    /**
     * Get the context
     * @return {CanvasRenderingContext2D} The context
     */
    public get ctx(): CanvasRenderingContext2D {
        return this._ctx;
    }

    /**
     * Get the width of this canvas
     * @return {number} The width of this canvas
     */
    public get width(): number {
        return this._canvas.width;
    }

    /**
     * Get the height of this canvas
     * @return {number} The height of this canvas
     */
    public get height(): number {
        return this._canvas.height;
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
        color: string = 'red',
        alignment: CanvasTextAlign = 'center'
    ): void {
        this.ctx.save();

        this.ctx.font = `${fontSize}px Arial`;
        this.ctx.fillStyle = color;
        this.ctx.textAlign = alignment;
        this.ctx.fillText(text, xCoordinate, yCoordinate);

        this.ctx.restore();
    }

    /**
     * Writes game over text to screen with a dropshadow
     */
    public writeGameOver(): void {
        const string = 'Game over';
        const size = 60;
        const x = this.width / 2;
        const y = this.height / 2;

        this.writeTextToCanvas(
            string,
            size,
            x,
            y,
        );
    }

    /**
     * Writes the given score to the canvas
     * @param {number} score Given score
     */
    public writeScore(score: number): void {
        this.writeTextToCanvas(
            `Score is: ${score}`,
            40,
            100,
            40,
        );
    }

    /**
     * Draws the given score to the gameover screen
     * @param score Given score
     */
    public writeEndScore(score: number): void {
        const string = `Uw score is: ${score}`;
        const size = 40;
        const x = this.width / 2;
        const y = this.height / 2 + 50;

        this.writeTextToCanvas(
            string,
            size,
            x,
            y,
        );
    }
}