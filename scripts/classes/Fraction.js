class Fraction extends Rect {
    constructor({
        position,
        width = 5,
        height = 5,
        fillColor = "orange",
    }) {
        super({ position, width, height, fillColor });
        this.markedForDelegation = false;
        this.velocity = {
            x: Math.random() - 0.5,
            y: Math.random()
        };
    }

    animate() {
        if (this.width > 0) this.width -= 0.1;
        if (this.height > 0) this.height -= 0.1;
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        this.debug();
    }
}