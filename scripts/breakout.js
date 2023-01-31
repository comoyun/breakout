
function updateCoins() {
    coins.forEach(_coin => {
        _coin.draw();
        _coin.sineAnimation();
        if (ball.getDist(_coin) <= ball.radius + _coin.radius && !_coin.faded) {
            _coin.faded = true;
            gsap.to(_coin, {
                radius: 0,
                duration: 2.2,
                ease: "bounce",
                onComplete() {
                    _coin.markedForDelegation = true;
                }
            });
            gsap.to(_coin.position, {
                y: HEIGHT,
                x: CENTER_X,
                ease: "bounce",
                duration: 1.5,
                onComplete() {
                    coinEl.innerText = ++gatheredCoins;
                }
            });
        }
    });

    coins = coins.filter(_coin => !_coin.markedForDelegation);
}

function updateBricks() {
    bricks.forEach((_brick, _index) => {
        _brick.draw();
        if (ball.getDistance(clamp(_brick.position.x, _brick.position.x + _brick.width, ball.position.x), clamp(_brick.position.y, _brick.position.y + _brick.height, ball.position.y)) <= ball.radius) {
            _brick.health--;
            if (_brick.health === 2) _brick.image = brickBrokenGrayImage;
            if (_brick.markedForDelegation) return;

            collideSound.play();

            if (!(_brick.health > 0)) {
                generateFractions(17, _brick, _brick.type === "weak" ? "orange" : "gray");

                gsap.to(_brick, {
                    width: 0,
                    height: 0,
                    onComplete() {
                        _brick.markedForDelegation = true;
                    }
                });
                gsap.to(_brick.position, {
                    x: _brick.position.x + BWIDTH * 0.5,
                    y: _brick.position.y + BHEIGHT * 0.5,
                });
            }
            lineX = clamp(_brick.position.x, _brick.position.x + _brick.width, ball.position.x);
            lineY = clamp(_brick.position.y, _brick.position.y + _brick.height, ball.position.y);

            if (ball.velocity.x < 0 && ball.position.x + ball.radius >= _brick.position.x + _brick.width) {
                ball.position.x = lineX + ball.radius + 1;
                ball.velocity.x = Math.abs(ball.velocity.x);
            }

            else if (ball.velocity.x > 0 && ball.position.x - ball.radius <= _brick.position.x) {
                ball.position.x = lineX - ball.radius - 1;
                ball.velocity.x = -ball.velocity.x;
            }

            else if (ball.velocity.y < 0 && ball.position.y + ball.radius >= _brick.position.y + _brick.height) {
                ball.position.y = lineY + ball.radius + 1;
                ball.velocity.y = Math.abs(ball.velocity.y);
            }

            else if (ball.velocity.y > 0 && ball.position.y - ball.radius <= _brick.position.y) {
                ball.position.y = lineY - ball.radius - 1;
                ball.velocity.y = -ball.velocity.y;
            }
        }
    });

    bricks = bricks.filter(_brick => !_brick.markedForDelegation);
}

function updateBall() {
    ball.draw();
    ball.move();

    if (ball.position.y - ball.radius >= HEIGHT) {
        if (lives > 0) {
            lives--;
            ball.position.y = paddle.position.y - 20;
            ball.position.x = CENTER_X;
            ball.velocity.y = -ball.velocity.y;
            return;
        };
        overlay.subtitle = "You gathered <span class='orange'>" + gatheredCoins + "</span> coin(s)!";
        overlay.text = "Game <span class='orange'>Over!</span>";
        startBtn.innerText = "Play Again!";
        overlay.pointerEvents = "all";
        gsap.to(overlay, {
            opacity: 1,
            onComplete() {
                lives = 3;
                BALL_SPEED = -3;
                gatheredCoins = 0;
                coinEl.innerText = 0;
                cancelAnimationFrame(animationId);
            }
        });
    }
}

function updateOverlay() {
    overlayEl.style.pointerEvents = overlay.pointerEvents;
    overlayEl.style.opacity = overlay.opacity;
    subtitle.innerHTML = overlay.subtitle;
    titleEl.innerHTML = overlay.text;
}

function eliminateDeadFractions() {
    fractions = fractions.filter(_fraction => (_fraction.width > 0 && _fraction.height > 0));
}

function animate() {
    animationId = requestAnimationFrame(animate);

    clearScreen();
    updateBricks();
    updateCoins();

    paddle.draw();
    paddle.handle();

    updateBall();

    updateOverlay();

    fractions.forEach(_fraction => _fraction.animate());

    eliminateDeadFractions();


    if (bricks.length === 0 && !nextLevelPending) {
        nextLevelPending = true;
        overlay.subtitle = "";
        overlay.text = "Good Job!";
        startBtn.innerText = "Next Level!";
        overlay.pointerEvents = "all";
        gsap.to(overlay, {
            opacity: 1,
            onComplete() {
                generateBricks();
                fractions = [];
                overlay.subtitle = "Your coins: " + gatheredCoins;
                lives = 3;
                BALL_SPEED -= 1;
                nextLevelPending = false;
                cancelAnimationFrame(animationId);
            }
        });
    }

    heart.innerHTML = lives;
}

function generateBricks() {
    bricks = [];

    for (let y = 0; y < 5; y++) {
        for (let x = 0; x < 5; x++) {
            const brick = new Brick({
                position: {
                    x: x * (BWIDTH + BX_MARGIN) + (CENTER_X * 0.11),
                    y: y * (BHEIGHT + BY_MARGIN) + BX_MARGIN
                },
                width: BWIDTH,
                height: BHEIGHT,
                image: brickOrangeImage,
                health: getRandomItem([1, 3])
            });

            brick.type = "weak";

            if (brick.health === 3) {
                brick.image = brickGrayImage;
                brick.type = "strong";
            }

            bricks.push(brick);
        }
    }
}

function generateFractions(_count, _object, _fillColor) {
    for (let i = 0; i < _count; i++) {
        fractions.push(new Fraction({
            position: {
                x: getRandomInt(_object.position.x, _object.getRight()),
                y: getRandomInt(_object.position.y, _object.getBottom())
            },
            fillColor: _fillColor
        }));
    }
}

function generateCoins() {
    coins = [];
    [
        getRandomItem(bricks),
        getRandomItem(bricks),
        getRandomItem(bricks)
    ].forEach(_randomBrick => {
        coins.push(new Coin({
            position: {
                x: _randomBrick.getCenterX(),
                y: _randomBrick.getCenterY(),
            },
            radius: COIN_RADIUS,
            fillColor: "rgb(255, 253, 50)",
            image: coinImage
        }));
        bricks.splice(bricks.indexOf(_randomBrick), 1);
    });
}

