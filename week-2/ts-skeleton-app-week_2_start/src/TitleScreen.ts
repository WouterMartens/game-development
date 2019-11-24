/// <reference path="GameScreen.ts" />

// interface Player {
//     playerName: string,
//     score: number
// }

class TitleScreen extends GameScreen {
    private readonly player: string;
    private readonly score: number;
    private readonly lives: number;
    private readonly highscores: Array<Player>;
    private readonly scoreText: GameText;

    constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
        super(canvas, ctx);

        this.score = 0;

        this.highscores = [
            new Player('Loek', 40000),
            new Player('Daan', 34000),
            new Player('Rimmert', 200)
        ];
    }

    drawHighscores() {
        let longestLine: number = 0;
        let lines: string[] = [];

        const fontSize = 60;
        this.ctx.font = fontSize + 'px Roboto';

        for (let i = 0; i < this.highscores.length; i++) {
            const player: Player = this.highscores[i];
            const string: string = `${i + 1}: ${player.name}, score: ${Math.max(...player.scores)}`;
            const textWidth: number = this.ctx.measureText(string).width;

            lines.push(string);

            if (textWidth > longestLine) {
                longestLine = textWidth;
            }
        }

        lines.forEach((line, i) => {
            this.drawTextToCanvas(
                line,
                this.canvas.width / 2 - longestLine / 2,
                this.canvas.height / 3 + 100 + i * fontSize * 1.5,
                fontSize,
                'left'
            );
        });

    }

    public draw = () => {
        this.drawTextToCanvas(`Score: ${this.score}`, this.canvas.width / 2, 300, 100, 'center');
        this.drawHighscores();
    }
}