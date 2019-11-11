class Game {
    constructor(canvasId) {
        this.canvas = canvasId;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.ctx = this.canvas.getContext('2d');
        this.player = "Player one";
        this.score = 400;
        this.lives = 3;
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
        this.levelScreen();
    }
    startScreen() {
        this.ctx.fillStyle = 'white';
        this.drawAsteroidHeading();
        this.drawIntroText();
        const buttonImage = './assets/images/SpaceShooterRedux/PNG/UI/buttonBlue.png';
        this.loadImage(buttonImage, this.drawButton);
        const asteroidImage = './assets/images/SpaceShooterRedux/PNG/Meteors/meteorBrown_big' + this.randomNumber(1, 4) + '.png';
        this.loadImage(asteroidImage, this.writeAsteroidImageToStartScreen);
    }
    drawAsteroidHeading() {
        const fontSize = this.canvas.width / 20;
        this.ctx.font = fontSize + 'px Roboto';
        const text = this.ctx.measureText('Asteroids');
        this.ctx.fillText('Asteroids', this.canvas.width / 2 - text.width / 2, 200);
    }
    drawIntroText() {
        const fontSize = this.canvas.width / 30;
        this.ctx.font = fontSize + 'px Roboto';
        const text = this.ctx.measureText('Press start to play');
        this.ctx.fillText('Press start to play', this.canvas.width / 2 - text.width / 2, this.canvas.height / 2);
    }
    drawButton(img) {
        let x = this.canvas.width / 2 - img.width / 2;
        let y = 700;
        this.ctx.drawImage(img, x, y);
        this.ctx.fillStyle = 'black';
        this.ctx.font = '20px Roboto';
        const text = this.ctx.measureText('Play');
        x += img.width / 2 - text.width / 2;
        y += img.height / 3 * 2;
        this.ctx.fillText('Play', x, y);
    }
    writeAsteroidImageToStartScreen(img) {
        this.ctx.translate(-img.width / 2, -img.height / 2);
        this.ctx.drawImage(img, this.canvas.width / 2, 600);
        this.ctx.translate(img.width / 2, img.height / 2);
    }
    levelScreen() {
        this.ctx.fillStyle = 'white';
        this.drawAsteroids();
        const lifeImage = './assets/images/SpaceShooterRedux/PNG/UI/playerLife1_blue.png';
        this.loadImage(lifeImage, this.drawLifeImages);
        this.drawCurrentScore();
        this.drawRandomAsteroid();
        const shipImage = './assets/images/SpaceShooterRedux/PNG/playerShip1_blue.png';
        this.loadImage(shipImage, this.drawPlayerShip);
    }
    drawAsteroids() {
        for (let i = 0; i < 20; i++) {
            this.drawRandomAsteroid();
        }
    }
    writeAsteroidImageToLevelScreen(img) {
        this.ctx.save();
        const x = this.randomNumber(img.width / 2, this.canvas.width);
        const y = this.randomNumber(img.height / 2, this.canvas.height);
        this.ctx.translate(x + 0.5 * img.width, y + 0.5 * img.height);
        const degrees = this.randomNumber(0, 360);
        this.ctx.rotate((Math.PI / 180) * degrees);
        this.ctx.translate(-(x + 0.5 * img.width), -(y + 0.5 * img.height));
        this.ctx.drawImage(img, x, y);
        this.ctx.restore();
    }
    drawPlayerShip(img) {
        this.ctx.translate(-img.width / 2, -img.height / 2);
        this.ctx.drawImage(img, this.canvas.width / 2, this.canvas.height / 2);
        this.ctx.translate(img.width / 2, img.height / 2);
    }
    drawLifeImages(img) {
        for (let i = 1; i <= this.lives; i++) {
            this.ctx.drawImage(img, img.width * i + 10 * i, 10);
        }
    }
    drawCurrentScore() {
        const x = 50;
        const y = this.canvas.height - 50;
        this.ctx.font = '40px Roboto';
        this.ctx.fillText(`Score: ${this.score}`, x, y);
    }
    drawRandomAsteroid() {
        let colour = '';
        let size = '';
        let amount;
        if (this.randomNumber(1, 2) === 1) {
            colour = 'Brown';
        }
        else {
            colour = 'Grey';
        }
        switch (this.randomNumber(1, 4)) {
            case 1:
                size = 'tiny';
                amount = 2;
                break;
            case 2:
                size = 'small';
                amount = 2;
                break;
            case 3:
                size = 'med';
                amount = 2;
                break;
            case 4:
                size = 'big';
                amount = 4;
                break;
            default:
                size = 'big';
                amount = 4;
                break;
        }
        const asteroidImage = `./assets/images/SpaceShooterRedux/PNG/Meteors/meteor${colour}_${size}${amount}.png`;
        this.loadImage(asteroidImage, this.writeAsteroidImageToLevelScreen);
    }
    titleScreen() {
        this.ctx.fillStyle = 'white';
    }
    loadImage(source, callback) {
        let imageElement = new Image();
        imageElement.addEventListener("load", () => {
            callback.apply(this, [imageElement]);
        });
        imageElement.src = source;
    }
    randomNumber(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }
}
let init = function () {
    const Asteroids = new Game(document.getElementById('canvas'));
};
window.addEventListener('load', init);
//# sourceMappingURL=app.js.map