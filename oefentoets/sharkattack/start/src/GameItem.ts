class GameItem {
    protected xPos: number;
    protected yPos: number;
    protected height: number;
    protected width: number;
    protected imgSource: string;
    protected img: HTMLImageElement;
    protected canvas: Canvas;

    /**
     * Constructor of GameItem
     * @param x Horizontal position of this item
     * @param y Vertical position of this item
     * @param imgSource Relative path to an image
     * @param canvas Place to draw the game
     */
    public constructor(x: number, y: number, imgSource: string, canvas: Canvas) {
        this.xPos = x;
        this.yPos = y;
        this.imgSource = imgSource;
        this.canvas = canvas;
        this.img = this.canvas.loadImage(imgSource);
        this.width = this.img.width;
        this.height = this.img.height;
    }

    public draw() {
        if (this.width === 0) {
            this.img = this.canvas.loadImage(this.imgSource);
            this.width = this.img.width;
            this.height = this.img.height;
        }

        this.canvas.writeImageFromFileToCanvas(
            this.imgSource,
            this.xPos,
            this.yPos
        );
    }

    public getX(): number {
        return this.xPos;
    }

    public getY(): number {
        return this.yPos;
    }
    
    public getWidth(): number {
        return this.width;
    }

    public getHeight(): number {
        return this.height;
    }
}