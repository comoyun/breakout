const canvas = document.createElement("canvas"),
    ctx = canvas.getContext("2d"),
    movements = {
        right: false,
        left: false
    },
    WIDTH = 350,
    HEIGHT = 400,
    CENTER_X = WIDTH * 0.5,
    CENTER_Y = HEIGHT * 0.5,
    PADDLE_HEIGHT = 15,
    PADDLE_WIDTH = 80,
    OFFSET_Y = 10,
    PADDLE_Y = HEIGHT - PADDLE_HEIGHT - OFFSET_Y,
    BALL_RADIUS = 10,
    BWIDTH = WIDTH / 7,
    BHEIGHT = BWIDTH * 0.3,
    BY_MARGIN = 15,
    COIN_RADIUS = 10,
    BX_MARGIN = BY_MARGIN;
    
let lineX, lineY, bricks = [], coins = [], overlay = {
    opacity: 1,
    text: '<span class="orange">Brick</span> Breaker!',
    pointerEvents: "all",
    subtitle: ""
}, paddle, ball, animationId = 0, gatheredCoins = 0, mouseX = CENTER_X, distX = 0,
    isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
    clickSound = new Audio("./res/click_sound.mp3"),
    collideSound = new Audio("./res/break.wav"),
    coinImage = new Image(),
    ballImage = new Image(),
    brickGrayImage = new Image(),
    brickBrokenGrayImage = new Image(),
    brickOrangeImage = new Image(),
    paddleImage = new Image(),
    resources = [],
    lives = 3,
    BALL_SPEED = -3,
    nextLevelPending = false,
    fractions = [];

resources.push(coinImage);
resources.push(ballImage);
resources.push(brickGrayImage);
resources.push(brickBrokenGrayImage);
resources.push(brickOrangeImage);
resources.push(paddleImage);

collideSound.volume = 0.4

resources.forEach(_resource => {
    _resource.onload = () => _resource.dataset.loaded = true;
});

paddleImage.src = "./res/paddle.png";
brickGrayImage.src = "./res/brick_gray.png";
brickBrokenGrayImage.src = "./res/brick_gray_broken.png";
brickOrangeImage.src = "./res/brick_orange.png";
ballImage.src = "./res/ball.png";
coinImage.src = "./res/coin.png";

const startBtn = document.querySelector("#start"),
    howtoBtn = document.querySelector("#how-to"),
    aboutBtn = document.querySelector("#about"),
    overlayEl = document.querySelector("#overlay"),
    titleEl = document.querySelector("#title"),
    coinEl = document.querySelector("#coin"),
    subtitle = document.querySelector("#subtitle"),
    heart = document.querySelector("#heart");


document.body.appendChild(canvas);

canvas.width = WIDTH;
canvas.height = HEIGHT;

