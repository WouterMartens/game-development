class TitleScreen {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;

    private score: number;
    private highscores: any[];

    constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
        this.canvas = canvas;
        this.ctx = ctx;

        this.score = 0;
        this.highscores = [
            {
                playerName: 'Loek',
                score: 40000
            },
            {
                playerName: 'Daan',
                score: 34000
            },
            {
                playerName: 'Rimmert',
                score: 200
            }
        ];

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

    public titleScreen() {
        //1. draw your score
        this.drawTextToCanvas(`Score: ${this.score}`, this.canvas.width / 2, 300, 100, 'center');
        //2. draw all highscores
        this.drawHighscores();
    }

    drawHighscores() {
        let longestLine: number = 0;
        let lines: string[] = [];

        const fontSize = 60;
        this.ctx.font = fontSize + 'px Roboto';

        for (let i = 0; i < this.highscores.length; i++) {
            const player: Player = this.highscores[i];
            const string: string = `${i + 1}: ${player.playerName}, score: ${player.score}`;
            const textWidth: number = this.ctx.measureText(string).width;

            lines.push(string);

            if (textWidth > longestLine) {
                longestLine = textWidth;
            }
        }

        lines.forEach((line, i) => {
            this.drawTextToCanvas(line, this.canvas.width / 2 - longestLine / 2, this.canvas.height / 3 + 100 + i * fontSize * 1.5, fontSize, 'left');
            console.log(line, longestLine);
        });

    }

}