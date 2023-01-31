class Ball extends Arc {
    constructor({
        position,
        radius,
        fillColor,
        image,
    }) {
        super({ position, radius, fillColor });
        this.velocity = {
            x: BALL_SPEED,
            y: BALL_SPEED
        };
        this.lineX = 0;
        this.lineY = 0;
        this.image = image;
    }

    getDistance(_x = this.lineX, _y = this.lineY) {
        return Math.sqrt(Math.pow(this.position.x - _x, 2) + Math.pow(this.position.y - _y, 2));
    }

    getDist(_circle) {
        return Math.sqrt(Math.pow(this.position.x - _circle.position.x, 2) + Math.pow(this.position.y - _circle.position.y, 2));
    }

    resolveWallCollision() {
        if (this.position.x + this.radius >= WIDTH
            || this.position.x - this.radius <= 0) this.velocity.x = -this.velocity.x;

        if (this.position.y - this.radius <= 0) this.velocity.y = -this.velocity.y;
    }

    resolvePaddleCollision() {
        this.lineX = clamp(paddle.position.x, paddle.position.x + paddle.width, this.position.x);
        this.lineY = clamp(paddle.position.y, paddle.position.y + paddle.height, this.position.y);
        if (this.getDistance() <= this.radius) {
            if (this.velocity.x < 0 && this.position.x + this.radius >= paddle.position.x + paddle.width) {
                this.position.x = this.lineX + this.radius + 1;
                this.velocity.x = Math.abs(this.velocity.x);
            }

            else if (this.velocity.x > 0 && this.position.x - this.radius <= paddle.position.x) {
                this.position.x = this.lineX - this.radius - 1;
                this.velocity.x = -this.velocity.x;
            }

            else if (this.velocity.y < 0 && this.position.y + this.radius >= paddle.position.y + paddle.height) {
                this.position.y = this.lineY + this.radius + 1;
                this.velocity.y = Math.abs(this.velocity.y);
            }

            else if (this.velocity.y > 0 && this.position.y - this.radius <= paddle.position.y) {
                this.position.y = this.lineY - this.radius - 1;
                this.velocity.y = -this.velocity.y;
            }

        }
    }

    draw() {
        ctx.drawImage(this.image, this.position.x - this.radius, this.position.y - this.radius, this.radius * 2, this.radius * 2);
    }

    move() {

        this.resolvePaddleCollision();

        this.resolveWallCollision();


        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    }
}