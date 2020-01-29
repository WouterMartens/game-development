class GameEntity {
    constructor(imgSrc, xPos, yPos) {
        this.xPos = xPos;
        this.yPos = yPos;
        this.img = this.loadNewImg(imgSrc);
    }
    draw(ctx) {
        ctx.drawImage(this.img, this.xPos, this.yPos);
    }
    getImg() {
        return this.img;
    }
    getXPos() {
        return this.xPos;
    }
    getYPos() {
        return this.yPos;
    }
    loadNewImg(source) {
        const img = new Image();
        img.src = source;
        return img;
    }
}
class Character extends GameEntity {
    constructor(xPos, yPos, xVel) {
        super('./assets/img/buzz.png', xPos, yPos);
        this.xVel = xVel;
        this.playerState = "moving";
        this.keyboardListener = new KeyboardListener();
        this.score = 0;
        console.log(xPos, yPos);
    }
    move(canvas) {
        if (this.playerState == "moving") {
            if (this.xPos + this.img.width >= canvas.width ||
                this.xPos < 0) {
                this.xVel = -this.xVel;
            }
            this.xPos += this.xVel;
        }
        if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE)) {
            this.playerState = "hyperjump";
            this.yPos = 50;
        }
        if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_DOWN) &&
            this.playerState == "hyperjump") {
            this.playerState = "moving";
            this.yPos = canvas.height - 260;
        }
    }
    collision(item) {
        if (this.getXPos() < item.getXPos() + item.getImg().width &&
            this.getXPos() + this.getImg().width > item.getXPos() &&
            this.getYPos() < item.getYPos() + item.getImg().height &&
            this.getYPos() + this.getImg().height > item.getYPos()) {
            this.score += item.getScore();
            return true;
        }
        else {
            return false;
        }
    }
    getTotalScore() {
        return this.score;
    }
}
class Coin extends GameEntity {
    constructor(xPos, yPos) {
        super('./assets/img/coin.png', xPos, yPos);
        this.score = 3;
    }
    getScore() {
        return this.score;
    }
}
class Game {
    constructor(canvas) {
        this.loop = () => {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.player.move(this.canvas);
            this.draw();
            this.coins = this.coins.filter(element => {
                return !this.player.collision(element);
            });
            this.writeTextToCanvas("Score: " + this.player.getTotalScore(), 36, 120, 50);
            requestAnimationFrame(this.loop);
        };
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.coins = [];
        for (let i = 0; i < this.randomNumber(1, 5); i++) {
            this.coins.push(new Coin(this.randomNumber(0, this.canvas.width - 50), 50));
        }
        this.player = new Character(this.randomNumber(0, this.canvas.width - 80), this.canvas.height - 260, 3);
        this.loop();
    }
    draw() {
        this.coins.forEach(element => {
            element.draw(this.ctx);
        });
        this.player.draw(this.ctx);
    }
    writeTextToCanvas(text, fontSize = 20, xCoordinate, yCoordinate, alignment = "center", color = "white") {
        this.ctx.font = `${fontSize}px sans-serif`;
        this.ctx.fillStyle = color;
        this.ctx.textAlign = alignment;
        this.ctx.fillText(text, xCoordinate, yCoordinate);
    }
    randomNumber(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }
}
let init = () => new Game(document.getElementById("canvas"));
window.addEventListener("load", init);
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
KeyboardListener.KEY_SPACE = 32;
KeyboardListener.KEY_LEFT = 37;
KeyboardListener.KEY_UP = 38;
KeyboardListener.KEY_RIGHT = 39;
KeyboardListener.KEY_DOWN = 40;
//# sourceMappingURL=app.js.map