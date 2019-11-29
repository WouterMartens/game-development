/**
 * @author Wouter Martens
 */
class Game {
	private readonly canvas: Canvas;

	private gameObjects: GameObject[];
	private score: number;

	/**
	 * Constructor method to construct an instance of the Game Class
	 * @param {HTMLCanvasElement} canvasId - canvas in the DOM
	 */
	public constructor(canvasId: HTMLCanvasElement) {
		// Construct the canvas
		this.canvas = new Canvas(canvasId);

		// Create an empty gameObjects array
		this.gameObjects = [];

		// Adds some game objects to the array created above
		this.createGameObjects('kiwi', 3, 10);
		this.createGameObjects('apple', 1, 3);

		// Add a mouse event listener
		document.addEventListener("click", this.mouseHandler);

		// Set the score to 0
		this.score = 0;

		// Start the loop
		this.loop();
	}

	/**
	 * Method for the main game loop
	 */
	private loop = (): void => {
		// draw all the game objects
		this.draw();
		// move the apples and kiwis
		this.move();

		// requests a new frame (loop)
		requestAnimationFrame(this.loop);
	};

	/**
	 * Method to create a kiwi or apple object
	 * @param {string} source String for image url
	 * @returns {Kiwi | Apple | null} Returns an instance of Kiwi or Apple, or null (if somehow the name is incorrect)
	 */
	private fruitFactory(source: string, name: string = 'kiwi'): GameObject {
		const x: number = this.randomNumber(0, this.canvas.width - 200);
		const y: number = this.randomNumber(0, this.canvas.height - 200);
		const xVel: number = this.randomNumber(1, 6);
		const yVel: number = this.randomNumber(1, 6);
		const lifespan: number = this.randomNumber(5, 10);

		// Creates an object according to the given name
		if (name === 'kiwi') {
			return new Kiwi(source, x, y, xVel, yVel, lifespan);
		} else if (name === 'apple') {
			return new Apple(source, x, y, xVel, yVel, lifespan);
		} else {
			return null;
		}
	}

	/**
	 * Creates a certain amount of game objects from given name
	 * @param {string} name Name of the gameobject (kiwi or apple)
	 * @param {number} lowestNumber Lowest amount that could be created
	 * @param {number} highestNumber Highest amount that could be created
	 */
	private createGameObjects(name: string, lowestNumber: number, highestNumber: number): void {
		for (let index = 0; index < this.randomNumber(lowestNumber, highestNumber); index++) {
			this.gameObjects.push(this.fruitFactory(`./assets/${name}-sm.png`, name));
		}
	}

	/**
	 * Method to handle the mouse event
	 * @param {MouseEvent} event Mouse event
	 */
	private mouseHandler = (event: MouseEvent): void => {
		// console.log(`xPos ${event.clientX}, yPos ${event.clientY}`);

		this.gameObjects.forEach((object, index) => {
			if (
				event.clientX >= object.xPos &&
				event.clientX < object.xPos + object.image.width &&
				event.clientY >= object.yPos &&
				event.clientY <= object.yPos + object.image.height
			) {
				if (object instanceof Kiwi) {
					this.score++;
					this.gameObjects.splice(index, 1);
				} else if (object instanceof Apple) {
					this.score--;
				}
			}
		});
	};

	/**
	 * Method that handles all of the drawing
	 */
	private draw(): void {
		// Clears the canvas
		this.canvas.clear();

		// Checks if there are still kiwis in the array
		const findKiwi = this.gameObjects.findIndex(object => object instanceof Kiwi);
		// When there are elements with the instance of Kiwi in the gameObjects array then the game is still going
		if (findKiwi !== -1) {
			// Draw all of the game objects or remove it if it should despawn/not be drawn
			for (let i = this.gameObjects.length - 1; i >= 0; i--) {
				const object = this.gameObjects[i];
				if (object.getTimeAlive() > object.lifespan * 1000) {
					this.gameObjects.splice(i, 1);
				} else {
					object.draw(this.canvas.ctx);
				}
			}

			// Write the current score
			this.canvas.writeScore(this.score);
		} else {
			// If there are no elements in the kiwi array left then the game is over
			this.canvas.writeGameOver();
			// Writes the end score
			this.canvas.writeEndScore(this.score);
		}
	}

	/**
	 * Method to move all of the gameobjects
	 */
	public move(): void {
		this.gameObjects.forEach(object => {
			object.move(this.canvas);
		});
	}

	/**
	 * Renders a random number between min and max
	 * @param {number} min - minimal time
	 * @param {number} max - maximal time
	 * @returns {number} - returns a random number
	 */
	private randomNumber(min: number, max: number): number {
		return Math.round(Math.random() * (max - min) + min);
	}
}

// Initialize the game after the DOM is loaded
let init = (): void => {
	const KiwiWars = new Game(
		document.getElementById("canvas") as HTMLCanvasElement
	);
};

// Add EventListener to load the game whenever the browser is ready
window.addEventListener("load", init);
