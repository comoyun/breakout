function getRandomItem(_array) {
    return _array[Math.floor(Math.random() * _array.length)];
}

function clamp(_min, _max, _value) {
    return Math.max(Math.min(_max, _value), _min);
}

function getRandomInt(_min, _max) {
    return Math.floor(Math.random() * (_max - _min) + _min);
}

function clearScreen() {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
}