class GameObject {
    constructor(imgUrl, x, y, xVel, yVel, lifespanInSeconds) {
        this.imgUrl = imgUrl;
        this._xPos = x;
        this._yPos = y;
        this._xVel = xVel;
        this._yVel = yVel;
        this._lifespan = lifespanInSeconds;
        this._img = this.loadImage(this.imgUrl);
        this._spawnTime = performance.now();
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
    get lifespan() {
        return this._lifespan;
    }
    getTimeAlive() {
        return performance.now() - this._spawnTime;
    }
    get image() {
        return this._img;
    }
    move(canvas) { }
    draw(ctx) {
        ctx.drawImage(this.image, this.xPos, this.yPos);
    }
    loadImage(source) {
        const img = new Image();
        img.src = source;
        return img;
    }
}
class Apple extends GameObject {
    constructor(imgUrl, x, y, xVel, yVel, lifespan) {
        super(imgUrl, x, y, xVel, yVel, lifespan);
    }
    move(canvas) {
        if (this.xPos + this.image.width - 28 > canvas.width ||
            this.xPos < 0) {
            this.xVel *= -1;
        }
        if (this.yPos + this.image.height - 28 > canvas.height ||
            this.yPos < 0) {
            this.yVel *= -1;
        }
        this.xPos += this.xVel;
        this.yPos += this.yVel;
    }
}
class Canvas {
    constructor(canvas) {
        this._canvas = canvas;
        this._canvas.width = window.innerWidth;
        this._canvas.height = window.innerHeight;
        this._ctx = this._canvas.getContext('2d');
    }
    clear() {
        this.ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
    }
    get canvas() {
        return this._canvas;
    }
    get ctx() {
        return this._ctx;
    }
    get width() {
        return this._canvas.width;
    }
    get height() {
        return this._canvas.height;
    }
    writeTextToCanvas(text, fontSize, xCoordinate, yCoordinate, color = 'red', alignment = 'center') {
        this.ctx.save();
        this.ctx.font = `${fontSize}px Arial`;
        this.ctx.fillStyle = color;
        this.ctx.textAlign = alignment;
        this.ctx.fillText(text, xCoordinate, yCoordinate);
        this.ctx.restore();
    }
    writeGameOver() {
        const string = 'Game over';
        const size = 60;
        const x = this.width / 2;
        const y = this.height / 2;
        this.writeTextToCanvas(string, size, x, y);
    }
    writeScore(score) {
        this.writeTextToCanvas(`Score is: ${score}`, 40, 100, 40);
    }
    writeEndScore(score) {
        const string = `Uw score is: ${score}`;
        const size = 40;
        const x = this.width / 2;
        const y = this.height / 2 + 50;
        this.writeTextToCanvas(string, size, x, y);
    }
}
class Game {
    constructor(canvasId) {
        this.loop = () => {
            this.draw();
            this.move();
            requestAnimationFrame(this.loop);
        };
        this.mouseHandler = (event) => {
            this.gameObjects.forEach((object, index) => {
                if (event.clientX >= object.xPos &&
                    event.clientX < object.xPos + object.image.width &&
                    event.clientY >= object.yPos &&
                    event.clientY <= object.yPos + object.image.height) {
                    if (object instanceof Kiwi) {
                        this.score++;
                        this.gameObjects.splice(index, 1);
                    }
                    else if (object instanceof Apple) {
                        this.score--;
                    }
                }
            });
        };
        this.canvas = new Canvas(canvasId);
        this.gameObjects = [];
        this.createGameObjects('kiwi', 3, 10);
        this.createGameObjects('apple', 1, 3);
        document.addEventListener("click", this.mouseHandler);
        this.score = 0;
        this.loop();
    }
    fruitFactory(source, name = 'kiwi') {
        const x = this.randomNumber(0, this.canvas.width - 200);
        const y = this.randomNumber(0, this.canvas.height - 200);
        const xVel = this.randomNumber(1, 6);
        const yVel = this.randomNumber(1, 6);
        const lifespan = this.randomNumber(5, 10);
        if (name === 'kiwi') {
            return new Kiwi(source, x, y, xVel, yVel, lifespan);
        }
        else if (name === 'apple') {
            return new Apple(source, x, y, xVel, yVel, lifespan);
        }
        else {
            return null;
        }
    }
    createGameObjects(name, lowestNumber, highestNumber) {
        for (let index = 0; index < this.randomNumber(lowestNumber, highestNumber); index++) {
            this.gameObjects.push(this.fruitFactory(`./assets/${name}-sm.png`, name));
        }
    }
    draw() {
        this.canvas.clear();
        const findKiwi = this.gameObjects.findIndex(object => object instanceof Kiwi);
        if (findKiwi !== -1) {
            for (let i = this.gameObjects.length - 1; i >= 0; i--) {
                const object = this.gameObjects[i];
                if (object.getTimeAlive() > object.lifespan * 1000) {
                    this.gameObjects.splice(i, 1);
                }
                else {
                    object.draw(this.canvas.ctx);
                }
            }
            this.canvas.writeScore(this.score);
        }
        else {
            this.canvas.writeGameOver();
            this.canvas.writeEndScore(this.score);
        }
    }
    move() {
        this.gameObjects.forEach(object => {
            object.move(this.canvas);
        });
    }
    randomNumber(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }
}
let init = () => {
    const KiwiWars = new Game(document.getElementById("canvas"));
};
window.addEventListener("load", init);
class Kiwi extends GameObject {
    constructor(imgUrl, x, y, xVel, yVel, lifespan) {
        super(imgUrl, x, y, xVel, yVel, lifespan);
    }
    move(canvas) {
        if (this.xPos + this.image.width > canvas.width ||
            this.xPos < 0) {
            this.xVel *= -1;
        }
        if (this.yPos + this.image.height > canvas.height ||
            this.yPos < 0) {
            this.yVel *= -1;
        }
        this.xPos += this.xVel;
        this.yPos += this.yVel;
    }
}
//# sourceMappingURL=app.js.map