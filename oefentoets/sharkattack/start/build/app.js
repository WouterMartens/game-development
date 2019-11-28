class GameItem {
    constructor(x, y, imgSource, canvas) {
        this.xPos = x;
        this.yPos = y;
        this.imgSource = imgSource;
        this.canvas = canvas;
        this.img = this.canvas.loadImage(imgSource);
        this.width = this.img.width;
        this.height = this.img.height;
    }
    draw() {
        if (this.width === 0) {
            this.img = this.canvas.loadImage(this.imgSource);
            this.width = this.img.width;
            this.height = this.img.height;
        }
        this.canvas.writeImageFromFileToCanvas(this.imgSource, this.xPos, this.yPos);
    }
    getX() {
        return this.xPos;
    }
    getY() {
        return this.yPos;
    }
    getWidth() {
        return this.width;
    }
    getHeight() {
        return this.height;
    }
}
class Boat extends GameItem {
    constructor(x, y, imgSource, canvas) {
        super(x, y, imgSource, canvas);
        this.keyboardListener = new KeyBoardListener();
        this.isHit = false;
    }
    move() {
        if (this.keyboardListener.getUpPressed()) {
            this.yPos -= 5;
        }
        if (this.keyboardListener.getDownPressed()) {
            this.yPos += 5;
        }
        if (this.keyboardListener.getRightPressed()) {
            this.xPos += 5;
        }
        this.xPos -= 1;
        const width = this.canvas.getWidth() - this.img.width;
        const height = this.canvas.getHeight() - this.img.height;
        if (this.xPos < 0) {
            this.xPos = 0;
        }
        if (this.xPos > width) {
            this.xPos = width;
        }
        if (this.yPos < 0) {
            this.yPos = 0;
        }
        if (this.yPos > height) {
            this.yPos = height;
        }
    }
    isColliding(shark) {
        const ctx = this.canvas.getContext();
        ctx.save();
        ctx.strokeStyle = 'red';
        console.log(shark.getSize());
        const translateY1 = 42 * (1 + (1 - shark.getSize()));
        const translateY2 = 50 * (1 + (1 - shark.getSize()));
        ctx.strokeRect(shark.getX(), shark.getY() + translateY1, shark.getWidth() * shark.getSize(), shark.getHeight() - translateY2 - translateY1);
        ctx.restore();
        if ((this.yPos + this.img.height > shark.getY() + translateY1) &&
            (this.yPos < shark.getY() + shark.getHeight() - translateY2) &&
            (this.xPos + this.img.width > shark.getX()) &&
            (this.xPos < shark.getX() + shark.getWidth())) {
            return true;
        }
        return false;
    }
}
class Canvas {
    constructor(canvasId) {
        this._canvas = canvasId;
        this._canvas.width = window.innerWidth;
        this._canvas.height = window.innerHeight;
        this.ctx = this._canvas.getContext('2d');
    }
    clear() {
        this.ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
    }
    loadImage(imgUrl) {
        const img = new Image();
        img.src = imgUrl;
        return img;
    }
    writeTextToCanvas(text, fontSize, xCoordinate, yCoordinate, color = "white", alignment = "center") {
        this.ctx.font = `${fontSize}px Arial`;
        this.ctx.fillStyle = color;
        this.ctx.textAlign = alignment;
        this.ctx.fillText(text, xCoordinate, yCoordinate);
    }
    getContext() {
        return this.ctx;
    }
    writeImageFromFileToCanvas(src, xCoordinate, yCoordinate, scale = 1) {
        let element = document.createElement("img");
        element.src = src;
        this.ctx.save();
        this.ctx.translate(xCoordinate, yCoordinate + element.height / 2);
        this.ctx.scale(scale, scale);
        this.ctx.translate(-xCoordinate, -(yCoordinate + element.height / 2));
        this.ctx.drawImage(element, xCoordinate, yCoordinate);
        this.ctx.restore();
    }
    randomNumber(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }
    getWidth() {
        return this._canvas.width;
    }
    getHeight() {
        return this._canvas.height;
    }
    writeDropShadowText(text, fontSize, xCoordinate, yCoordinate, color = "white", alignment = "center") {
        this.writeTextToCanvas(text, fontSize, xCoordinate, yCoordinate + (fontSize / 20), 'black', alignment);
        this.writeTextToCanvas(text, fontSize, xCoordinate, yCoordinate, color, alignment);
    }
    writeGameOver() {
        const string = 'Game over!';
        const size = 100;
        const x = this.getWidth() / 2;
        const y = this.getHeight() / 2;
        this.writeDropShadowText(string, size, x, y, 'white');
    }
    writeScore(score) {
        this.writeDropShadowText(`Score: ${score}`, 50, 20, 100, 'white', 'left');
    }
    writeLives(lives) {
        const string = 'Lives: ' + lives;
        const size = 50;
        const x = 20;
        const y = 50;
        this.writeDropShadowText(string, size, x, y, 'white', 'left');
    }
}
class Game {
    constructor() {
        this.loop = () => {
            this.canvas.clear();
            this.player.score = this.getScore();
            if (this.sharks.length < this.maxSharksOnScreen) {
                this.createShark();
            }
            this.move();
            this.draw();
            if (this.player.lives !== 0) {
                requestAnimationFrame(this.loop);
            }
            else {
                this.canvas.writeGameOver();
            }
        };
        this.canvas = new Canvas(document.getElementById('canvas'));
        this.boat = new Boat(50, this.canvas.getHeight() / 2 - 70, './assets/images/boat.png', this.canvas);
        this.sharks = [];
        this.maxSharksOnScreen = 5;
        this.player = {
            lives: 3,
            score: 0
        };
        this.startTime = performance.now();
        this.loop();
    }
    createShark() {
        const x = this.canvas.getWidth();
        const y = this.canvas.randomNumber(0, this.canvas.getHeight() - 182);
        const source = './assets/images/shark.png';
        const speed = this.canvas.randomNumber(2, 5);
        const shark = new Shark(x, y, source, this.canvas, speed);
        this.sharks.push(shark);
    }
    move() {
        this.boat.move();
        for (let i = this.sharks.length - 1; i >= 0; i--) {
            const shark = this.sharks[i];
            if (shark.isOffScreen()) {
                this.sharks.splice(i, 1);
            }
            else {
                shark.moveRightToLeft();
            }
            if (this.boat.isColliding(shark)) {
                if (!shark.hitBoat) {
                    this.player.lives--;
                }
                shark.hitBoat = true;
            }
        }
    }
    draw() {
        this.canvas.writeLives(this.player.lives);
        this.canvas.writeScore(this.player.score);
        this.sharks.forEach(shark => {
            shark.draw();
        });
        this.boat.draw();
    }
    getScore() {
        const delta = (performance.now() - this.startTime) / 1000;
        return Number(delta.toFixed(0));
    }
}
window.addEventListener('load', init);
function init() {
    const SharkAttack = new Game();
}
class Shark extends GameItem {
    constructor(x, y, imgSource, canvas, speed) {
        super(x, y, imgSource, canvas);
        this.speed = speed;
        this.size = canvas.randomNumber(5, 10) / 10;
        this.hitBoat = false;
        this.boundingBox = {
            x1: 0,
            y1: 40 * this.size,
            x2: this.img.width * this.size,
            y2: 50 * this.size
        };
    }
    draw() {
        this.canvas.writeImageFromFileToCanvas(this.imgSource, this.xPos, this.yPos, this.size);
    }
    moveRightToLeft() {
        this.xPos -= this.speed;
    }
    isOffScreen() {
        if (this.xPos + this.img.width < 0) {
            return true;
        }
        return false;
    }
    getSize() {
        return this.size;
    }
}
class KeyBoardListener {
    constructor() {
        this.keyDownHandler = (event) => {
            if (event.keyCode == 37) {
                this.leftPressed = true;
            }
            if (event.keyCode == 38) {
                this.upPressed = true;
            }
            if (event.keyCode == 39) {
                this.rightPressed = true;
            }
            if (event.keyCode == 40) {
                this.downPressed = true;
            }
        };
        this.keyUpHandler = (event) => {
            if (event.keyCode == 37) {
                this.leftPressed = false;
            }
            if (event.keyCode == 38) {
                this.upPressed = false;
            }
            if (event.keyCode == 39) {
                this.rightPressed = false;
            }
            if (event.keyCode == 40) {
                this.downPressed = false;
            }
        };
        this.leftPressed = false;
        this.upPressed = false;
        this.rightPressed = false;
        this.downPressed = false;
        window.addEventListener("keydown", this.keyDownHandler);
        window.addEventListener("keyup", this.keyUpHandler);
    }
    getLeftPressed() {
        return this.leftPressed;
    }
    getUpPressed() {
        return this.upPressed;
    }
    getRightPressed() {
        return this.rightPressed;
    }
    getDownPressed() {
        return this.downPressed;
    }
}
//# sourceMappingURL=app.js.map