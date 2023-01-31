class Brick extends Rect {
    constructor({
        position,
        width,
        height,
        fillColor = "#144",
        image,
        health = 1
    }) {
        super({ position, width, height, fillColor });
        this.markedForDelegation = false;
        this.image = image;
        this.health = health;
        this.type = "weak";
    }

    draw() {
        ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
    }
}
