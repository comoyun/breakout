class Arc {
    constructor({
        position,
        radius = 10,
        fillColor = "#155",
    }) {
        this.position = position;
        this.radius = radius;
        this.fillColor = fillColor;
    }

    debug() {
        ctx.fillStyle = this.fillColor;
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2, false);
        ctx.closePath();
        ctx.fill();
    }
}