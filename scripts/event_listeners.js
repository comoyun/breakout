
function touchMove(_event) {
    mouseX = _event.touches[0].clientX - canvas.getBoundingClientRect().left;
}

function touchEnd() {
    movements.left = false;
    movements.right = false;
}

function keyDown(_) {
    switch (_.key.toLowerCase()) {
        case "arrowright":
            movements.right = true;
            break;
        case "arrowleft":
            movements.left = true;
            break;
    }
}

function keyUp(_) {
    switch (_.key.toLowerCase()) {
        case "arrowright":
            movements.right = false;
            break;
        case "arrowleft":
            movements.left = false;
            break;
    }
}

function startGame() {
    clickSound.play();
    overlay.pointerEvents = "none";

    if (!resources.every(_resource => _resource.dataset.loaded === "true")) {
        subtitle.innerHTML = "Please, wait. Loading resources...";
        setTimeout(startGame, 1000);
        return;
    }

    gsap.to(overlay, {
        opacity: 0,
    });
    init();
}

function aboutGame() {
    clickSound.play();
    duDialog("About", "Welcome to Breakout, a simple and fun game created by Khumoyun. This game is written purely in JavaScript, and it has simple graphics and straightforward mechanics. ")
}

function howtoGame() {
    clickSound.play();
    duDialog("About", "The goal of the game is to break all the blocks on the screen by hitting them with the ball and paddle. As you progress through the levels, the blocks become harder to break and the ball will move faster. ")

}

function init() {
    paddle = new Paddle({
        position: {
            x: CENTER_X - PADDLE_WIDTH * 0.5,
            y: PADDLE_Y
        },
        height: PADDLE_HEIGHT,
        width: PADDLE_WIDTH,
        image: paddleImage
    });

    ball = new Ball({
        position: {
            x: CENTER_X,
            y: paddle.position.y - 20
        },
        radius: BALL_RADIUS,
        image: ballImage
    });
    generateBricks();
    generateCoins();
    animate();
}

startBtn.addEventListener("click", startGame);
aboutBtn.addEventListener("click", aboutGame);
howtoBtn.addEventListener("click", howtoGame);
window.addEventListener("keydown", keyDown);
window.addEventListener("keyup", keyUp);
window.addEventListener("touchmove", touchMove);
window.addEventListener("touchend", touchEnd);
