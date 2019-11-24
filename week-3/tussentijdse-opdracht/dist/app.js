"use strict";
/**
 * @author Wouter Martens
 */
class Shape {
    constructor(x, y, direction, velocity, radius = 25, colour = 'black') {
        this.x = x;
        this.y = y;
        this.direction = Math.PI / 180 * direction;
        this.xVel = velocity;
        this.yVel = velocity;
        this.radius = radius;
        this.colour = colour;
    }
    /**
     * Handles the movement of the ball across the canvas (and bouncing against the wall)
     *
     * Note to self: including the velocity check (to fix the stuck on edge bug) probably doesn't work
     * because of the way I used Math.sin/Math.cos. Velocity might never be (or is always) negative?
     *
     * @param canvas Uses canvas to find the bounding box
     */
    move(canvas) {
        // Inverts the velocity of the x axis if the ball hits the left or right side
        if ((this.x >= canvas.width - this.radius) ||
            (this.x <= 0 + this.radius)) {
            this.xVel *= -1;
        }
        // Inverts the velocity of the y axis if the ball hits the top or bottom side
        if ((this.y >= canvas.height - this.radius) ||
            (this.y <= 0 + this.radius)) {
            this.yVel *= -1;
        }
        // Calculates the amount to translate the x and y value respectively
        this.x += Math.sin(this.direction) * this.xVel;
        this.y -= Math.cos(this.direction) * this.yVel;
    }
    draw(ctx) { }
}
/// <reference path="Shape.ts" />
class Circle extends Shape {
    constructor(x, y, direction, velocity, radius = 25, colour = 'black') {
        super(x, y, direction, velocity, radius, colour);
    }
    /**
     * Draws the ball outline on the given x and y coordinates and with the given colour
     * @param ctx Context to draw with
     */
    draw(ctx) {
        ctx.save();
        ctx.beginPath();
        ctx.strokeStyle = this.colour;
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.restore();
    }
}
/**
 * @author Wouter Martens
 */
class Game {
    constructor(canvas) {
        /**
         * Main game loop
         *
         * Clears the screen, moves and draws all of the created balls
         */
        this.loop = () => {
            // Clears the canvas
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            // Goes through the ball array and moves, then draws every ball in the array
            this.shapes.forEach(shape => {
                shape.move(this.canvas);
                shape.draw(this.ctx);
            });
            // Loops
            requestAnimationFrame(this.loop);
        };
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.shapes = [];
        this.createShapes(10);
        this.loop();
    }
    /**
     * Creates a given number of balls with random properties
     * @param num Amount of balls to create
     */
    createShapes(num) {
        // One loop creates one ball
        for (let i = 0; i < num; i++) {
            // Sets random values for each parameter
            let shape = null;
            const circleOrSquare = Math.random();
            const x = this.randomNumber(200, this.canvas.width - 200);
            const y = this.randomNumber(200, this.canvas.height - 200);
            const direction = this.randomNumber(0, 359);
            const velocity = this.randomNumber(4, 5);
            const radius = this.randomNumber(10, 200);
            const colour = '#' + Math.floor(Math.random() * 16777215).toString(16);
            // Creates a shape object
            if (circleOrSquare < 0.5) {
                shape = new Circle(x, y, direction, velocity, radius, colour);
            }
            else {
                shape = new Square(x, y, direction, velocity, radius, colour);
            }
            // Pushes the ball object to the balls array (then repeats the process)
            this.shapes.push(shape);
        }
    }
    /**
     * Renders a random number between min and max
     * @param min Minimal value
     * @param max Maximal value
     */
    randomNumber(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }
}
// Makes sure the init function is called when the window loads
window.addEventListener('load', init);
/**
 * Adds a canvas element to the body and starts the game
 */
function init() {
    const body = document.getElementById('body');
    const canvas = document.createElement('canvas');
    if (body) {
        body.appendChild(canvas);
        const game = new Game(canvas);
    }
}
/// <reference path="Shape.ts" />
class Square extends Shape {
    constructor(x, y, direction, velocity, radius = 25, colour = 'black') {
        super(x, y, direction, velocity, radius, colour);
        this.size = radius * 2;
    }
    /**
     * Draws the ball outline on the given x and y coordinates and with the given colour
     * @param ctx Context to draw with
     */
    draw(ctx) {
        ctx.save();
        ctx.beginPath();
        ctx.strokeStyle = this.colour;
        ctx.strokeRect(this.x - this.radius, this.y - this.radius, this.size, this.size);
        ctx.stroke();
        ctx.restore();
    }
}
