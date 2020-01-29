class Game {
	// Necessary canvas attributes
	private readonly canvas: HTMLCanvasElement;
	private readonly ctx: CanvasRenderingContext2D;

	// Coins (the player needs to collect these)
	private coins: Coin[];

	// Player
	private player: Character;

	/**
	 * Initialize the game
	 *
	 * @param {HTMLCanvasElement} canvas - The canvas element that the game
	 * should be rendered upon
	 */
	public constructor(canvas: HTMLCanvasElement) {
		this.canvas = canvas;
		this.ctx = this.canvas.getContext("2d");

		this.canvas.width = window.innerWidth;
		this.canvas.height = window.innerHeight;

		this.coins = [];

		// Create coins
		for (let i = 0; i < this.randomNumber(1, 5); i++) {
			this.coins.push(
				new Coin(this.randomNumber(0, this.canvas.width - 50), 50)
			);
		}

		// Create player
		this.player = new Character(this.randomNumber(0, this.canvas.width - 80), this.canvas.height - 260, 3)

		// Start the game cycle
		this.loop();
	}

	/**
	 * Game cycle, basically loop that keeps the game running. It contains all
	 * the logic needed to draw the individual frames.
	 */
	private loop = () => {
		// Clear the screen
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

		// Move the player
		this.player.move(this.canvas);

		// Draw everything
		this.draw();

		// Check if the player has any coins
		this.coins = this.coins.filter(element => {
			return ! this.player.collision(element);
		});

		// Show score
		this.writeTextToCanvas("Score: " + this.player.getTotalScore(), 36, 120, 50);

		// Make sure the game actually loops
		requestAnimationFrame(this.loop);
	};

	/**
	 * Draw all the necessary items to the screen
	 */
	private draw() {
		// draw coins
		this.coins.forEach(element => {
			element.draw(this.ctx);
		});

		// draw player
		this.player.draw(this.ctx);
	}

	/**
	 * Writes text to the canvas
	 * @param {string} text - Text to write
	 * @param {number} fontSize - Font size in pixels
	 * @param {number} xCoordinate - Horizontal coordinate in pixels
	 * @param {number} yCoordinate - Vertical coordinate in pixels
	 * @param {string} alignment - Where to align the text
	 * @param {string} color - The color of the text
	 */
	private writeTextToCanvas(
		text: string,
		fontSize: number = 20,
		xCoordinate: number,
		yCoordinate: number,
		alignment: CanvasTextAlign = "center",
		color: string = "white"
	) {
		this.ctx.font = `${fontSize}px sans-serif`;
		this.ctx.fillStyle = color;
		this.ctx.textAlign = alignment;
		this.ctx.fillText(text, xCoordinate, yCoordinate);
	}

	/**
	 * Returns a random number between min and max
	 * @param {number} min - lower boundary
	 * @param {number} max - upper boundary
	 */
	private randomNumber(min: number, max: number): number {
		return Math.round(Math.random() * (max - min) + min);
	}
}

/**
 * Start the game whenever the entire DOM is loaded
 */
let init = () =>
	new Game(document.getElementById("canvas") as HTMLCanvasElement);

// Add EventListener to load the game whenever the browser is ready
window.addEventListener("load", init);
