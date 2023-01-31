
class Coin extends Arc {
    constructor({ position, radius, image }) {
        super({ position, radius });
        this.markedForDelegation = false;
        this.rotation = 0;
        this.faded = false;
        this.image = image;
    }

    draw() {
        ctx.drawImage(this.image, this.position.x - this.radius, (this.position.y - this.radius) + (Math.sin(this.rotation) * 8), this.radius * 2, this.radius * 2);
    }

    sineAnimation() {
        this.rotation += 0.05;
    }
}