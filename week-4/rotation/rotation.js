"use strict";
window.addEventListener('load', init);
function init() {
    var rotate = new Square(500, 500, 0, 100);
}
var Square = /** @class */ (function () {
    function Square(x, y, angle, size) {
        var _this = this;
        this.draw = function () {
            ;
            _this.ctx.clearRect(0, 0, _this.canvas.width, _this.canvas.height);
            _this.ctx.save();
            _this.ctx.fillStyle = 'black';
            var x = _this.canvas.width / 2;
            var y = _this.canvas.height / 2;
            _this.ctx.translate(x + _this.size / 2, y + _this.size / 2);
            _this.ctx.rotate(_this.angle);
            _this.ctx.translate(-(x + _this.size / 2), -(y + _this.size / 2));
            _this.ctx.fillRect(_this.x - _this.size / 2, _this.y - _this.size / 2, _this.size, _this.size);
            _this.ctx.restore();
            _this.angle += Math.PI / 180;
            requestAnimationFrame(_this.draw);
        };
        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.x = x;
        this.y = y;
        this.size = size;
        this.angle = Math.PI / 180 * angle;
        this.draw();
    }
    return Square;
}());
