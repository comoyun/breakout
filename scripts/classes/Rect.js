class Rect {
    constructor({
        position,
        width,
        height,
        fillColor = "#133",
    }) {
        this.position = position;
        this.width = width;
        this.height = height;
        this.fillColor = fillColor;
    }

    debug() {
        ctx.fillStyle = this.fillColor;
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    getCenterX() {
        return this.position.x + this.width * 0.5;
    }

    getCenterY() {
        return this.position.y + this.height * 0.5;
    }

    getRight() {
        return this.position.x + this.width;
    }

    getBottom() {
        return this.position.y + this.height;
    }
}