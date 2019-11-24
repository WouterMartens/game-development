class GameObject {
    constructor(xPos, yPos, xVel, yVel, rotation) {
        this._xPos = xPos;
        this._yPos = yPos;
        this._xVel = xVel;
        this._yVel = yVel;
        this._rotation = Math.PI / 180 * rotation;
        this._rotationVel = 0;
    }
    get xPos() {
        return this._xPos;
    }
    set xPos(value) {
        this._xPos = value;
    }
    get yPos() {
        return this._yPos;
    }
    set yPos(value) {
        this._yPos = value;
    }
    get xVel() {
        return this._xVel;
    }
    set xVel(value) {
        this._xVel = value;
    }
    get yVel() {
        return this._yVel;
    }
    set yVel(value) {
        this._yVel = value;
    }
    get rotation() {
        return this._rotation;
    }
    set rotation(value) {
        this._rotation = value;
    }
    get rotationVel() {
        return this._rotationVel;
    }
    set rotationVel(value) {
        this._rotationVel = value;
    }
    draw(ctx) {
        if (this.img.naturalWidth > 0) {
            ctx.save();
            ctx.translate(this.xPos + 0.5 * this.img.width, this.yPos + 0.5 * this.img.height);
            ctx.rotate(this.rotation);
            ctx.translate(-(this.xPos + 0.5 * this.img.width), -(this.yPos + 0.5 * this.img.height));
            ctx.drawImage(this.img, this.xPos, this.yPos);
            ctx.restore();
            this.rotation += this.rotationVel;
        }
    }
    drawTextToCanvas(text, x, y, ctx, fontSize = 10, alignment = 'left', colour = 'white') {
        ctx.save();
        ctx.fillStyle = colour;
        ctx.font = fontSize + 'px Roboto';
        ctx.textAlign = alignment;
        ctx.fillText(text, x, y);
        ctx.restore();
    }
    debug(ctx) {
        const x = this.xPos + this.img.width;
        let y = this.yPos + this.img.height;
        const size = 10;
        this.drawTextToCanvas(`${x.toFixed(0)}, ${y.toFixed(0)}`, x, y, ctx, size);
        y += size + 2;
        this.drawTextToCanvas(`${this.xVel}, ${this.yVel}`, x, y, ctx, size);
        y += size + 2;
        this.drawTextToCanvas(`${this.rotation.toFixed(0)}, ${this.rotationVel.toFixed(3)}`, x, y, ctx, size);
    }
    loadImage(source) {
        this.img = new Image();
        this.img.src = source;
    }
}
class Asteroid extends GameObject {
    constructor(xPos, yPos, xVel, yVel, rotation, rotationVel = 1) {
        super(xPos, yPos, xVel, yVel, rotation);
        const negativeX = Math.random() < 0.5 ? true : false;
        const negativeY = Math.random() < 0.5 ? true : false;
        const direction = Math.random() < 0.5 ? true : false;
        if (negativeX) {
            this.xVel *= -1;
        }
        if (negativeY) {
            this.yVel *= -1;
        }
        if (direction) {
            this.rotationVel *= -1;
        }
        this.rotationVel = Math.PI / 180 * rotationVel;
        this.loadImage(this.getRandomAsteroid());
    }
    move(canvas) {
        if ((this.xPos >= canvas.width - this.img.width && this.xVel > 0) ||
            (this.xPos <= 0 && this.xVel < 0)) {
            this.xVel *= -1;
        }
        if ((this.yPos >= canvas.height - this.img.height && this.yVel > 0) ||
            (this.yPos <= 0 && this.yVel < 0)) {
            this.yVel *= -1;
        }
        this.xPos += this.xVel;
        this.yPos += this.yVel;
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
class Bullet extends GameObject {
    constructor(xPos, yPos, xVel, yVel, rotation, ship) {
        super(xPos, yPos, xVel, yVel, rotation);
        this.xPos = xPos;
        this.yPos = yPos;
        this.rotation = rotation;
        this.xVel = xVel;
        this.yVel = yVel;
        this.width = 3;
        this.height = 10;
        this.isOffScreen = false;
        this.ship = ship;
    }
    move(canvas) {
        if ((this.xPos >= canvas.width + this.height) ||
            (this.xPos <= 0 - this.height)) {
            this.isOffScreen = true;
        }
        if ((this.yPos >= canvas.height + this.height) ||
            (this.yPos <= 0 - this.height)) {
            this.isOffScreen = true;
        }
        this.xPos += Math.sin(this.rotation) * this.xVel;
        this.yPos -= Math.cos(this.rotation) * this.yVel;
    }
    draw(ctx) {
        ctx.save();
        ctx.translate(this.xPos + 0.5 * this.ship.img.width, this.yPos + 0.5 * this.ship.img.height);
        ctx.rotate(this.rotation);
        ctx.translate(-(this.xPos + 0.5 * this.ship.img.width), -(this.yPos + 0.5 * this.ship.img.height));
        ctx.fillStyle = 'white';
        ctx.fillRect(this.xPos + this.ship.img.width / 2 - this.width / 2, this.yPos, this.width, this.height);
        ctx.restore();
    }
    debug(ctx) {
        const x = this.xPos + this.width + 10;
        let y = this.yPos + this.height + 10;
        const size = 10;
        this.drawTextToCanvas(`${x.toFixed(0)}, ${y.toFixed(0)}`, x, y, ctx, size);
        y += size + 2;
        this.drawTextToCanvas(`${this.xVel}, ${this.yVel}`, x, y, ctx, size);
        y += size + 2;
        this.drawTextToCanvas(`${this.rotation.toFixed(0)}, ${this.rotationVel.toFixed(3)}`, x, y, ctx, size);
    }
}
class Game {
    constructor(canvasId) {
        this.loop = () => {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.switchScreen();
            this.currentScreen.draw();
            requestAnimationFrame(this.loop);
        };
        this.canvas = canvasId;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.ctx = this.canvas.getContext('2d');
        this.player = new Player('hi', 1);
        this.t = 0;
        this.keyboardListener = new KeyboardListener();
        this.currentScreen = new StartScreen(this.canvas, this.ctx);
        this.loop();
    }
    switchScreen() {
        const t = performance.now();
        if (t - this.t > 1000) {
            if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_S) && this.currentScreen instanceof StartScreen) {
                this.currentScreen = new LevelScreen(this.canvas, this.ctx, [this.player, new Player('hi2', 500)]);
                this.t = t;
            }
            else if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_ESC) && this.currentScreen instanceof LevelScreen) {
                this.currentScreen = new TitleScreen(this.canvas, this.ctx);
                this.t = t;
            }
            else if ((this.keyboardListener.isKeyDown(KeyboardListener.KEY_S) || this.keyboardListener.isKeyDown(KeyboardListener.KEY_ESC)) &&
                this.currentScreen instanceof TitleScreen) {
                this.currentScreen = new StartScreen(this.canvas, this.ctx);
                this.t = t;
            }
        }
    }
    static randomNumber(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }
}
let init = function () {
    const Asteroids = new Game(document.getElementById('canvas'));
};
window.addEventListener('load', init);
class GameScreen {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
    }
    draw() { }
    drawTextToCanvas(text, x, y, fontSize, alignment = 'center', colour = 'white') {
        this.ctx.save();
        this.ctx.fillStyle = colour;
        this.ctx.font = fontSize + 'px Roboto';
        this.ctx.textAlign = alignment;
        this.ctx.fillText(text, x, y);
        this.ctx.restore();
    }
}
class GameText {
    constructor(ctx, text, x, y, size, alignment = 'center', colour = 'white') {
        this.ctx = ctx;
        this.text = text;
        this.x = x;
        this.y = y;
        this.size = size;
        this.alignment = alignment;
        this.colour = colour;
    }
    draw() {
        this.ctx.save();
        this.ctx.fillStyle = this.colour;
        this.ctx.font = this.size + 'px Roboto';
        this.ctx.textAlign = this.alignment;
        this.ctx.fillText(this.text, this.x, this.y);
        this.ctx.restore();
    }
}
class KeyboardListener {
    constructor() {
        this.keyDown = (ev) => {
            this.keyCodeStates[ev.keyCode] = true;
        };
        this.keyUp = (ev) => {
            this.keyCodeStates[ev.keyCode] = false;
        };
        this.keyCodeStates = new Array();
        window.addEventListener("keydown", this.keyDown);
        window.addEventListener("keyup", this.keyUp);
    }
    isKeyDown(keyCode) {
        return this.keyCodeStates[keyCode] === true;
    }
}
KeyboardListener.KEY_ESC = 27;
KeyboardListener.KEY_SPACE = 32;
KeyboardListener.KEY_LEFT = 37;
KeyboardListener.KEY_UP = 38;
KeyboardListener.KEY_RIGHT = 39;
KeyboardListener.KEY_DOWN = 40;
KeyboardListener.KEY_S = 83;
KeyboardListener.KEY_P = 80;
class LevelScreen extends GameScreen {
    constructor(canvas, ctx, players) {
        super(canvas, ctx);
        this.draw = () => {
            if (this.PERFORMANCE_TEST) {
                this.createAsteroids(1);
                this.drawTest();
            }
            if (this.DEBUG) {
                this.drawFPS();
            }
            this.drawAsteroids();
            this.drawPlayers();
            this.drawCurrentScore();
            this.drawLifeImages();
        };
        this.DEBUG = true;
        this.PERFORMANCE_TEST = false;
        this.players = players;
        this.players[1].ship.xPos += 300;
        this.t = performance.now();
        this.startTime = this.t;
        this.averageFpsList = [];
        this.averageAsteroids = [];
        this.asteroids = [];
        this.createAsteroids(Game.randomNumber(10, 20));
        this.lifeImage = this.loadImage('./assets/images/SpaceShooterRedux/PNG/UI/playerLife1_blue.png');
    }
    loadImage(source) {
        const img = new Image();
        img.src = source;
        return img;
    }
    drawCurrentScore() {
        const x = 50;
        const y = this.canvas.height - 50;
        this.drawTextToCanvas(`Score: ${this.players[0].currentScore}`, x, y, 40, 'left');
    }
    drawFPS() {
        const t = performance.now();
        const fps = Number((1000 / (t - this.t)).toFixed(0));
        if (this.averageFpsList.length > 59) {
            this.averageFpsList.pop();
        }
        this.averageFpsList.unshift(fps);
        const averageFPS = (this.averageFpsList.reduce((a, b) => a + b) / this.averageFpsList.length).toFixed(0);
        this.drawTextToCanvas(String(averageFPS), this.canvas.width - 50, 50, 25);
        this.t = t;
        return Number(averageFPS);
    }
    createAsteroids(num) {
        for (let i = 0; i < num; i++) {
            const x = Game.randomNumber(0, this.canvas.width);
            const y = Game.randomNumber(0, this.canvas.height);
            const xVel = Game.randomNumber(100, 300) / 100;
            const yVel = Game.randomNumber(100, 300) / 100;
            const rotation = Game.randomNumber(0, 359);
            const rotationVelocity = Game.randomNumber(1, 5) / 5;
            const asteroid = new Asteroid(x, y, xVel, yVel, rotation, rotationVelocity);
            this.asteroids.push(asteroid);
        }
    }
    drawLifeImages() {
        for (let i = 1; i <= this.players[0].lives; i++) {
            this.ctx.drawImage(this.lifeImage, this.lifeImage.width * i + 10 * i, 10);
        }
    }
    drawAsteroids() {
        this.asteroids.forEach(asteroid => {
            asteroid.move(this.canvas);
            asteroid.draw(this.ctx);
            if (this.DEBUG) {
                asteroid.debug(this.ctx);
            }
        });
    }
    drawPlayers() {
        this.players.forEach(player => {
            for (let i = player.ship.bullets.length - 1; i >= 0; i--) {
                const bullet = player.ship.bullets[i];
                bullet.move(this.canvas);
                bullet.draw(this.ctx);
                if (bullet.isOffScreen) {
                    player.ship.bullets.splice(i, 1);
                }
            }
            player.ship.move(this.canvas);
            player.ship.draw(this.ctx);
            if (this.DEBUG) {
                player.ship.debug(this.ctx);
            }
        });
    }
    drawTest() {
        if (!(this.drawFPS() > 50 || performance.now() - this.startTime < 1000)) {
            this.averageAsteroids.push(this.asteroids.length);
            console.log('Lost performance at ' + this.asteroids.length + ' asteroids, average: ' +
                (this.averageAsteroids.reduce((a, b) => a + b) / this.averageAsteroids.length).toFixed(0));
            this.asteroids = [];
            this.startTime = performance.now();
        }
    }
}
class Player {
    constructor(name, score) {
        this.name = name;
        this.ship = new Ship(window.innerWidth / 2, window.innerHeight / 2, 5, 5, 0, `./assets/images/SpaceShooterRedux/PNG/playerShip1_${this.randomColour()}.png`, new KeyboardListener());
        this.lives = 3;
        this.currentScore = 0;
        this.scores = [score];
    }
    addFinalScore(score) {
        this.scores.push(score);
    }
    die() {
        this.lives--;
    }
    randomColour() {
        let colour = '';
        Math.random() < 0.5 ? colour = 'blue' : colour = 'red';
        return colour;
    }
}
class Ship extends GameObject {
    constructor(xPos, yPos, xVel, yVel, rotation, imgUrl, keyboardListener) {
        super(xPos, yPos, xVel, yVel, rotation);
        this.loadImage(imgUrl);
        this.bullets = [];
        this.keyboardListener = keyboardListener;
    }
    move(canvas) {
        if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_RIGHT)) {
            this.rotation += this.degreesToRadian(3);
        }
        if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_LEFT)) {
            this.rotation -= this.degreesToRadian(3);
        }
        if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_UP)) {
            this.xPos += Math.sin(this.rotation) * this.xVel;
            this.yPos -= Math.cos(this.rotation) * this.yVel;
        }
        if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_DOWN)) {
            this.xPos -= Math.sin(this.rotation) * this.xVel;
            this.yPos += Math.cos(this.rotation) * this.yVel;
        }
        if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE)) {
            this.shoot();
        }
    }
    shoot() {
        this.bullets.push(new Bullet(this.xPos, this.yPos, this.xVel * 1.5, this.yVel * 1.5, this.rotation, this));
    }
    degreesToRadian(num) {
        return Math.PI / 180 * num;
    }
}
class StartScreen extends GameScreen {
    constructor(canvas, ctx) {
        super(canvas, ctx);
        this.draw = () => {
            this.drawTextToCanvas('Asteroids', this.canvas.width / 2, 200, 200, 'center');
            this.drawTextToCanvas('Press start to play', this.canvas.width / 2, 350, 60, 'center');
            this.drawButton(this.button);
            this.ctx.drawImage(this.asteroid, this.canvas.width / 2 - this.asteroid.width / 2, 400);
        };
        this.button = this.loadImage('./assets/images/SpaceShooterRedux/PNG/UI/buttonBlue.png');
        this.asteroid = this.loadImage('./assets/images/SpaceShooterRedux/PNG/Meteors/meteorBrown_big1.png');
        this.draw();
    }
    loadImage(source) {
        const img = new Image();
        img.src = source;
        return img;
    }
    drawButton(img) {
        if (img.naturalWidth > 0) {
            this.ctx.save();
            let x = this.canvas.width / 2 - img.width / 2;
            let y = 525;
            this.ctx.drawImage(img, x, y);
            x += img.width / 2;
            y += img.height / 3 * 2;
            this.drawTextToCanvas('Play', x, y, 20, 'center', 'black');
            this.ctx.restore();
        }
    }
}
class TitleScreen extends GameScreen {
    constructor(canvas, ctx) {
        super(canvas, ctx);
        this.draw = () => {
            this.drawTextToCanvas(`Score: ${this.score}`, this.canvas.width / 2, 300, 100, 'center');
            this.drawHighscores();
        };
        this.score = 0;
        this.highscores = [
            new Player('Loek', 40000),
            new Player('Daan', 34000),
            new Player('Rimmert', 200)
        ];
    }
    drawHighscores() {
        let longestLine = 0;
        let lines = [];
        const fontSize = 60;
        this.ctx.font = fontSize + 'px Roboto';
        for (let i = 0; i < this.highscores.length; i++) {
            const player = this.highscores[i];
            const string = `${i + 1}: ${player.name}, score: ${Math.max(...player.scores)}`;
            const textWidth = this.ctx.measureText(string).width;
            lines.push(string);
            if (textWidth > longestLine) {
                longestLine = textWidth;
            }
        }
        lines.forEach((line, i) => {
            this.drawTextToCanvas(line, this.canvas.width / 2 - longestLine / 2, this.canvas.height / 3 + 100 + i * fontSize * 1.5, fontSize, 'left');
        });
    }
}
//# sourceMappingURL=app.js.map