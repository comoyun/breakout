
class Paddle extends Rect {
    constructor({
        position,
        width,
        height,
        fillColor,
        image
    }) {
        super({ position, width, height, fillColor });
        this.speed = 4;
        this.image = image;
    }

    handle() {
        if (movements.right && this.position.x + this.width < WIDTH) this.moveRight();
        else if (movements.left && this.position.x > 0) this.moveLeft();

        if (isMobile) {
            distX = mouseX - paddle.getCenterX();
            paddle.position.x += distX / 10;
        }
    }

    moveRight() {
        this.position.x += this.speed;
    }

    moveLeft() {
        this.position.x -= this.speed
    }

    draw() {
        ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
    }

}