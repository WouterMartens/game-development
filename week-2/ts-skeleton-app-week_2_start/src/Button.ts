// class Button {
//     private canvas: HTMLCanvasElement;
//     private ctx: CanvasRenderingContext2D;

//     constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
//         this.canvas = canvas;
//         this.ctx = ctx;
//     }

//     /**
//      * Draws the button element
//      */
//     private drawButton(img: HTMLImageElement) {
//         if (img.naturalWidth > 0) {
//             this.ctx.save();

//             let x: number = this.canvas.width / 2 - img.width / 2;
//             let y: number = 525;

//             this.ctx.drawImage(img, x, y);

//             x += img.width / 2;
//             y += img.height / 3 * 2;

//             this.drawTextToCanvas('Play', x, y, 20, 'center', 'black');

//             this.ctx.restore();
//         }
//     }
// }