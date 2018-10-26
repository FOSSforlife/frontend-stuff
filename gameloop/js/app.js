var box = document.getElementById('box'),
    boxPos = 10,
    boxVelocity = 0.08,
    limit = 300,
    lastFrameTimeMs = 0,
    maxFPS = 60,
    delta = 0,
    timestep = 1000 / 60;

function update(delta) {
    boxPos += boxVelocity * delta;
    // Switch directions if we go too far
    if (boxPos >= limit || boxPos <= 0) boxVelocity = -boxVelocity;
}

function draw() {
    box.style.left = boxPos + 'px';
}
function panic() {
    delta = 0; // discard the unsimulated time
    // ... snap the player to the authoritative state
}

var numUpdateSteps = 0
function mainLoop(timestamp) {
    // Throttle the frame rate.    
    if (timestamp < lastFrameTimeMs + (1000 / maxFPS)) {
        requestAnimationFrame(mainLoop);
        return;
    }
    delta += timestamp - lastFrameTimeMs;
    lastFrameTimeMs = timestamp;

    while (delta >= timestep) {
        update(timestep);
        delta -= timestep;
        // Sanity check
        if (++numUpdateSteps >= 240) {
            panic(); // fix things
            break; // bail out
        }
    }
    draw();
    requestAnimationFrame(mainLoop);
}

requestAnimationFrame(mainLoop);
