class GameItem {
    constructor(x, y, imgSource, canvas) {
        this.xPos = x;
        this.yPos = y;
        this.imgSource = imgSource;
        this.canvas = canvas;
        this.img = canvas.loadImage(imgSource);
    }
    draw() {
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
    }
    move() {
        if (this.keyboardListener.getUpPressed()) {
            this.yPos--;
        }
        if (this.keyboardListener.getDownPressed()) {
            this.yPos++;
        }
        if (this.keyboardListener.getRightPressed()) {
            this.xPos++;
        }
    }
    isColliding(shark) {
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
    writeImageFromFileToCanvas(src, xCoordinate, yCoordinate) {
        let element = document.createElement("img");
        element.src = src;
        this.ctx.drawImage(element, xCoordinate, yCoordinate);
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
}
class Game {
    constructor() {
        this.loop = () => {
            this.canvas.clear();
            if (this.sharks.length === 0) {
                this.createShark();
            }
            this.move();
            this.draw();
            requestAnimationFrame(this.loop);
        };
        this.canvas = new Canvas(document.getElementById('canvas'));
        this.boat = new Boat(100, 100, './assets/images/boat.png', this.canvas);
        this.sharks = [];
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
        }
    }
    draw() {
        this.boat.draw();
        this.sharks.forEach(shark => {
            shark.draw();
        });
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