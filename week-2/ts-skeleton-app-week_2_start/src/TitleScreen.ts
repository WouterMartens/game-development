/// <reference path="GameScreen.ts" />

interface Player {
    playerName: string,
    score: number
}

class TitleScreen extends GameScreen {
    private readonly player: string;
    private readonly score: number;
    private readonly lives: number;
    private readonly highscores: Array<Player>;

    constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
        super(canvas, ctx);

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
            // console.log(line, longestLine);
        });

    }

    public draw = () => {
        this.drawHighscores();
    }
}