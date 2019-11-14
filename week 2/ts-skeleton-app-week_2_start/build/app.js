class Game {
    constructor(canvasId) {
        this.loop = () => {
            requestAnimationFrame(this.loop);
            const asteroidImage = `./assets/images/SpaceShooterRedux/PNG/Meteors/meteorBrown_big1.png`;
            this.loadImage(asteroidImage, this.drawMovingImageToLevelScreen);
            this.drawCurrentScore();
            const lifeImage = './assets/images/SpaceShooterRedux/PNG/UI/playerLife1_blue.png';
            this.loadImage(lifeImage, this.drawLifeImages);
            const shipImage = './assets/images/SpaceShooterRedux/PNG/playerShip1_blue.png';
            this.loadImage(shipImage, this.drawPlayerShip);
        };
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
        this.asteroids = [
            {
                x: this.canvas.width / 2,
                y: this.canvas.height / 2,
                xVelocity: 5,
                yVelocity: 5
            },
            {
                x: 5,
                y: 5,
                xVelocity: 3,
                yVelocity: 3
            },
            {
                x: this.canvas.width - 150,
                y: this.canvas.height - 150,
                xVelocity: 1,
                yVelocity: 1
            },
        ];
        this.loop();
    }
    drawTextToCanvas(text, x, y, fontSize, alignment = 'center', colour = 'white') {
        this.ctx.save();
        this.ctx.fillStyle = colour;
        this.ctx.font = fontSize + 'px Roboto';
        this.ctx.textAlign = alignment;
        this.ctx.fillText(text, x, y);
        this.ctx.restore();
    }
    startScreen() {
        this.drawAsteroidHeading();
        this.drawIntroText();
        const buttonImage = './assets/images/SpaceShooterRedux/PNG/UI/buttonBlue.png';
        this.loadImage(buttonImage, this.drawButton);
        const asteroidImage = './assets/images/SpaceShooterRedux/PNG/Meteors/meteorBrown_big' + this.randomNumber(1, 4) + '.png';
        this.loadImage(asteroidImage, this.writeAsteroidImageToStartScreen);
    }
    drawAsteroidHeading() {
        this.drawTextToCanvas('Asteroids', this.canvas.width / 2, 200, 200, 'center');
    }
    drawIntroText() {
        this.drawTextToCanvas('Press start to play', this.canvas.width / 2, 500, 60, 'center');
    }
    drawButton(img) {
        let x = this.canvas.width / 2 - img.width / 2;
        let y = 700;
        this.ctx.drawImage(img, x, y);
        x += img.width / 2;
        y += img.height / 3 * 2;
        this.drawTextToCanvas('Play', x, y, 20, 'center', 'black');
    }
    writeAsteroidImageToStartScreen(img) {
        this.ctx.translate(-img.width / 2, -img.height / 2);
        this.ctx.drawImage(img, this.canvas.width / 2, 600);
        this.ctx.translate(img.width / 2, img.height / 2);
    }
    levelScreen() {
        this.loop();
    }
    drawAsteroids(num) {
        for (let i = 0; i < num; i++) {
            this.drawRandomAsteroid();
        }
    }
    drawMovingImageToLevelScreen(img) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.asteroids.forEach((asteroid, index) => {
            console.log(asteroid, index);
            if (asteroid.x >= this.canvas.width - img.width || asteroid.x <= 0) {
                asteroid.xVelocity *= -1;
            }
            if (asteroid.y >= this.canvas.height - img.height || asteroid.y <= 0) {
                asteroid.yVelocity *= -1;
            }
            asteroid.x += asteroid.xVelocity;
            asteroid.y += asteroid.yVelocity;
            this.ctx.drawImage(img, asteroid.x, asteroid.y);
        });
    }
    writeAsteroidImageToLevelScreen(img) {
        this.ctx.save();
        const x = this.randomNumber(img.width, this.canvas.width - img.width);
        const y = this.randomNumber(img.height, this.canvas.height - img.width);
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
        this.drawTextToCanvas(`Score: ${this.score}`, x, y, 40, 'left');
    }
    drawRandomAsteroid() {
        let colour = '';
        let size = '';
        let amount = 2;
        if (this.randomNumber(1, 2) === 1) {
            colour = 'Brown';
        }
        else {
            colour = 'Grey';
        }
        switch (this.randomNumber(1, 4)) {
            case 1:
                size = 'tiny';
                break;
            case 2:
                size = 'small';
                break;
            case 3:
                size = 'med';
                break;
            case 4:
                size = 'big';
                amount = 4;
                break;
        }
        let number = this.randomNumber(1, amount);
        const asteroidImage = `./assets/images/SpaceShooterRedux/PNG/Meteors/meteor${colour}_${size}${number}.png`;
        this.loadImage(asteroidImage, this.writeAsteroidImageToLevelScreen);
    }
    titleScreen() {
        this.drawTextToCanvas(`Score: ${this.score}`, this.canvas.width / 2, 300, 100, 'center');
        this.drawHighscores();
    }
    drawHighscores() {
        let longestLine = 0;
        let lines = [];
        const fontSize = 60;
        this.ctx.font = fontSize + 'px Roboto';
        for (let i = 0; i < this.highscores.length; i++) {
            const player = this.highscores[i];
            const string = `${i + 1}: ${player.playerName}, score: ${player.score}`;
            const textWidth = this.ctx.measureText(string).width;
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