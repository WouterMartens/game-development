/// <reference path="GameScreen.ts" />

class StartScreen extends GameScreen {
    private button: HTMLImageElement;
    private asteroid: HTMLImageElement;

    constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
        super(canvas, ctx);

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
     * Draws the button element
     */
    private drawButton(img: HTMLImageElement) {
        if (img.naturalWidth > 0) {
            this.ctx.save();

            let x: number = this.canvas.width / 2 - img.width / 2;
            let y: number = 525;

            this.ctx.drawImage(img, x, y);

            x += img.width / 2;
            y += img.height / 3 * 2;

            this.drawTextToCanvas('Play', x, y, 20, 'center', 'black');

            this.ctx.restore();
        }
    }

    //draw = () => {
    public draw = () => {
        //1. add 'Asteroids' text
        this.drawTextToCanvas('Asteroids', this.canvas.width / 2, 200, 200, 'center');
        //2. add 'Press to play' text
        this.drawTextToCanvas('Press start to play', this.canvas.width / 2, 350, 60, 'center');
        //3. add button with 'start' text
        this.drawButton(this.button);
        //4. add Asteroid image
        this.ctx.drawImage(this.asteroid, this.canvas.width / 2 - this.asteroid.width / 2, 400);
    }
}