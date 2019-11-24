class GameText {
    private ctx: CanvasRenderingContext2D;
    private text: string;
    private x: number;
    private y: number;
    private size: number;
    private alignment: CanvasTextAlign;
    private colour: string;

    constructor(
        ctx: CanvasRenderingContext2D,
        text: string,
        x: number,
        y: number,
        size: number,
        alignment: CanvasTextAlign = 'center',
        colour: string = 'white'
    ) {
        this.ctx = ctx;
        this.text = text;
        this.x = x;
        this.y = y; 
        this.size = size;
        this.alignment = alignment;
        this.colour = colour;
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
    public draw(): void {
        this.ctx.save();

        this.ctx.fillStyle = this.colour;
        this.ctx.font = this.size + 'px Roboto';
        this.ctx.textAlign = this.alignment;
        this.ctx.fillText(this.text, this.x, this.y);

        this.ctx.restore();
    }
}