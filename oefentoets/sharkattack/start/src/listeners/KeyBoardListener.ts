class KeyBoardListener {

  private leftPressed: boolean;
  private upPressed: boolean;
  private rightPressed: boolean;
  private downPressed: boolean;

  /**
  * Create a keyboardListener
  */
  constructor() {
    this.leftPressed = false;
    this.upPressed = false;
    this.rightPressed = false;
    this.downPressed = false;
    window.addEventListener("keydown", this.keyDownHandler);
    window.addEventListener("keyup", this.keyUpHandler);
  }

  /**
   * Function to handle the key down
   * @param {KeyboardEvent} event 
   */
  private keyDownHandler = (event: KeyboardEvent) => {
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
  }

  /**
    * Function to handle the key up
    * @param {KeyboardEvent} event 
    */
  private keyUpHandler = (event: KeyboardEvent) => {
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
  }

  /**
   * Function to get the leftPressed property
   */
  public getLeftPressed(): boolean {
    return this.leftPressed;
  }

  /**
   * Function to get the upPressed property
   */
  public getUpPressed(): boolean {
    return this.upPressed;
  }

  /**
   * Function to get the rightPressed property
   */
  public getRightPressed(): boolean {
    return this.rightPressed;
  }

  /**
   * Function to get the downPressed property
   */
  public getDownPressed(): boolean {
    return this.downPressed;
  }
}