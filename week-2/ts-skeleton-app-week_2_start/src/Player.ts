class Player {
    public readonly name: string;
    public lives: number;
    public currentScore: number;
    public readonly scores: number[];
    public readonly ship: Ship;

    constructor(name: string, score: number) {
        this.name = name;
        this.ship = new Ship(window.innerWidth / 2, window.innerHeight / 2, 5, 5, 0, new KeyboardListener());
        this.lives = 3;
        this.currentScore = 0;
        this.scores = [score];
    }

    addFinalScore(score: number): void {
        this.scores.push(score);
    }

    die(): void {
        this.lives--;
    }

    randomColour(): string {
        let colour = '';
        Math.random() < 0.5 ? colour = 'blue' : colour =  'red';
        return colour;
    }
}