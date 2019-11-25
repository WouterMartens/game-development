window.addEventListener('load', init);

function init() {
    const rotate = new Square(500, 500, 0, 100);
}

class Square {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    x: number;
    y: number;
    angle: number;
    size: number;

    constructor(x: number, y: number, angle: number, size: number) {
        this.canvas = <HTMLCanvasElement>document.getElementById('canvas');
        this.ctx = <CanvasRenderingContext2D>this.canvas.getContext('2d');

        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        this.x = x;
        this.y = y;
        this.size = size;
        this.angle = Math.PI / 180 * angle;

        this.draw();
    }

    draw = () => {;        
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.save();

        this.ctx.fillStyle = 'black';

        const x: number = this.canvas.width / 2;
        const y: number = this.canvas.height / 2;

        this.ctx.translate(x + this.size / 2, y + this.size / 2);
        this.ctx.rotate(this.angle);
        this.ctx.translate(-(x + this.size / 2), -(y + this.size / 2));

        this.ctx.fillRect(this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);

        this.ctx.restore();

        this.angle += Math.PI / 180;

        requestAnimationFrame(this.draw);
    }
}

