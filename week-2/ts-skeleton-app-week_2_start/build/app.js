class Asteroid {
    constructor(x, y, velocityX, velocityY, rotation, rotationVelocity) {
        this._x = x;
        this._y = y;
        this._velocityX = velocityX;
        this._velocityY = velocityY;
        this._rotation = Math.PI / 180 * rotation;
        this._rotationVelocity = rotationVelocity;
        console.log(rotationVelocity);
        this.img = new Image();
        this.source = this.getRandomAsteroid();
        this.loadImage(this.source);
    }
    get x() {
        return this._x;
    }
    set x(value) {
        this._x = value;
    }
    get y() {
        return this._y;
    }
    set y(value) {
        this._y = value;
    }
    get velocityX() {
        return this._velocityX;
    }
    set velocityX(value) {
        this._velocityX = value;
    }
    get velocityY() {
        return this._velocityY;
    }
    set velocityY(value) {
        this._velocityY = value;
    }
    get rotation() {
        return this._rotation;
    }
    set rotation(value) {
        this._rotation = value;
    }
    get rotationVelocity() {
        return this._rotationVelocity;
    }
    set rotationVelocity(value) {
        this._rotationVelocity = value;
    }
    loadImage(source) {
        this.img.src = source;
    }
    draw(ctx) {
        ctx.save();
        ctx.translate(this.x + 0.5 * this.img.width, this.y + 0.5 * this.img.height);
        ctx.rotate(this.rotation);
        ctx.translate(-(this.x + 0.5 * this.img.width), -(this.y + 0.5 * this.img.height));
        ctx.drawImage(this.img, this.x, this.y);
        ctx.restore();
        this.rotation += this.rotationVelocity;
    }
    move(canvas) {
        if (this.x >= canvas.width - this.img.width || this.x <= 0) {
            this.velocityX *= -1;
        }
        if (this.y >= canvas.height - this.img.height || this.y <= 0) {
            this.velocityY *= -1;
        }
        this.x += this.velocityX;
        this.y += this.velocityY;
    }
    getRandomAsteroid() {
        let colour = '';
        let size = '';
        let amount = 2;
        if (Game.randomNumber(1, 2) === 1) {
            colour = 'Brown';
        }
        else {
            colour = 'Grey';
        }
        switch (Game.randomNumber(1, 4)) {
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
        let number = Game.randomNumber(1, amount);
        return `./assets/images/SpaceShooterRedux/PNG/Meteors/meteor${colour}_${size}${number}.png`;
    }
}
class Game {
    constructor(canvasId) {
        this.loop = () => {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.asteroids.forEach(asteroid => {
                asteroid.draw(this.ctx);
                asteroid.move(this.canvas);
            });
            const lifeImage = './assets/images/SpaceShooterRedux/PNG/UI/playerLife1_blue.png';
            this.loadImage(lifeImage, this.drawLifeImages);
            this.drawCurrentScore();
            const shipImage = './assets/images/SpaceShooterRedux/PNG/playerShip1_blue.png';
            this.loadImage(shipImage, this.drawPlayerShip);
            requestAnimationFrame(this.loop);
        };
        this.canvas = canvasId;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.ctx = this.canvas.getContext('2d');
        this.player = "Player one";
        this.score = 400;
        this.lives = 3;
        this.asteroids = [];
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
        const asteroidImage = './assets/images/SpaceShooterRedux/PNG/Meteors/meteorBrown_big' + Game.randomNumber(1, 4) + '.png';
        const asteroid = new Asteroid(this.canvas.width / 2, this.canvas.height / 2, 0, 0, 90, 0);
        asteroid.loadImage(asteroidImage);
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
        this.createAsteroids(Game.randomNumber(2, 5));
        this.loop();
    }
    createAsteroids(num) {
        for (let i = 0; i < num; i++) {
            const x = Game.randomNumber(100, this.canvas.width - 100);
            const y = Game.randomNumber(100, this.canvas.height - 100);
            const vX = Game.randomNumber(1, 3);
            const vY = Game.randomNumber(1, 3);
            const r = Game.randomNumber(0, 359);
            const rV = Game.randomNumber(1, 5) / 200;
            const asteroid = new Asteroid(x, y, vX, vY, r, rV);
            this.asteroids.push(asteroid);
        }
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
    static randomNumber(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }
}
let init = function () {
    const Asteroids = new Game(document.getElementById('canvas'));
};
window.addEventListener('load', init);
//# sourceMappingURL=app.js.map