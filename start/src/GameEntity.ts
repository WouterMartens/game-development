class GameEntity {
    protected img: HTMLImageElement;
    protected xPos: number;
    protected yPos: number;

    constructor(imgSrc: string, xPos: number, yPos: number) {
        this.xPos = xPos;
        this.yPos = yPos;
        this.img = this.loadNewImg(imgSrc);
    }

    public draw(ctx: CanvasRenderingContext2D): void {
        ctx.drawImage(this.img, this.xPos, this.yPos);
    }

    public getImg(): HTMLImageElement {
        return this.img;
    }
    
    public getXPos(): number {
        return this.xPos;
    }

    public getYPos(): number {
        return this.yPos;
    }

    /**
     * Method to load an image
     * @param {HTMLImageElement} source
     * @return HTMLImageElement - returns an image
     */
    private loadNewImg(source: string): HTMLImageElement {
        const img = new Image();
        img.src = source;
        return img;
    }
}