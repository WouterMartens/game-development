class StartScreen {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;

    private button: HTMLImageElement;
    private asteroid: HTMLImageElement;

    constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
        this.canvas = canvas;
        this.ctx = ctx;

        this.button = this.loadImage('./assets/images/SpaceShooterRedux/PNG/UI/buttonBlue.png');
        this.asteroid = this.loadImage('./assets/images/SpaceShooterRedux/PNG/Meteors/meteorBrown_big1.png');

        this.draw();
    }

    public loadImage(source: string): HTMLImageElement {
        const img: HTMLImageElement = new Image();
        img.src = source;
        return img;
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
    private drawTextToCanvas(
        text: string,
        x: number,
        y: number,
        fontSize: number,
        alignment: CanvasTextAlign = 'center',
        colour: string = 'white'
    ) {
        this.ctx.save();

        this.ctx.fillStyle = colour;
        this.ctx.font = fontSize + 'px Roboto';
        this.ctx.textAlign = alignment;
        this.ctx.fillText(text, x, y);

        this.ctx.restore();
    }

    /**
     * Draws the button element
     */
    private drawButton(img: HTMLImageElement) {
        this.ctx.save();

        let x: number = this.canvas.width / 2 - img.width / 2;
        let y: number = 525;

        this.ctx.drawImage(img, x, y);

        x += img.width / 2;
        y += img.height / 3 * 2;

        this.drawTextToCanvas('Play', x, y, 20, 'center', 'black');

        this.ctx.restore();
    }

    draw = () => {
        //1. add 'Asteroids' text
        this.drawTextToCanvas('Asteroids', this.canvas.width / 2, 200, 200, 'center');
        //2. add 'Press to play' text
        this.drawTextToCanvas('Press start to play', this.canvas.width / 2, 350, 60, 'center');
        //3. add button with 'start' text
        this.drawButton(this.button);
        //4. add Asteroid image
        this.ctx.drawImage(this.asteroid, this.canvas.width / 2 - this.asteroid.width / 2, 400);
        
        window.requestAnimationFrame(this.draw);
    }
}