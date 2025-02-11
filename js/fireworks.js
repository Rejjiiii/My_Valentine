let canvas, width, height, ctx;
let fireworks = [];
let particles = [];

function setup() {
    canvas = document.getElementById("canvas");
    setSize(canvas);
    ctx = canvas.getContext("2d");
    // Instead of filling with black, fill with the page's background color:
    ctx.fillStyle = "#ffc2d1";
    ctx.fillRect(0, 0, width, height);

    // Start with an initial firework:
    fireworks.push(new Firework(Math.random() * (width - 200) + 100));
    window.addEventListener("resize", windowResized);
    document.addEventListener("click", onClick);
}

setTimeout(setup, 1);

function loop() {
    // Use a semi-transparent fill with the background color to create a trail effect.
    ctx.globalAlpha = 0.5;
    ctx.fillStyle = "#ffc2d1";  // Change from black to the body's background color.
    ctx.fillRect(0, 0, width, height);
    ctx.globalAlpha = 1;

    // Update fireworks
    for (let i = 0; i < fireworks.length; i++) {
        let done = fireworks[i].update();
        fireworks[i].draw();
        if (done) fireworks.splice(i, 1);
    }

    // Update particles
    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
        if (particles[i].lifetime > 80) particles.splice(i, 1);
    }

    // Add a new firework randomly
    if (Math.random() < 1 / 30) {
        for (let i = 0; i < 3; i++) { // Multiple fireworks each time
            fireworks.push(new Firework(Math.random() * (width - 200) + 100));
        }
    }
    
    requestAnimationFrame(loop); // Use requestAnimationFrame for smoother animation
}

requestAnimationFrame(loop);

class Particle {
    constructor(x, y, col) {
        this.x = x;
        this.y = y;
        this.col = col;
        this.vel = randomVec(5);
        this.lifetime = 0;
    }

    update() {
        this.x += this.vel.x;
        this.y += this.vel.y;
        this.vel.y += 0.02;
        this.vel.x *= 0.99;
        this.vel.y *= 0.99;
        this.lifetime++;
    }

    draw() {
        ctx.globalAlpha = Math.max(1 - this.lifetime / 90, 0);
        ctx.fillStyle = this.col;
        ctx.fillRect(this.x, this.y, 4, 4);
    }
}

class Firework {
    constructor(x) {
        this.x = x;
        this.y = height;
        this.isBlown = false;
        this.col = randomCol();
    }

    update() {
        this.y -= 3.5;
        if (this.y < 350 - Math.sqrt(Math.random() * 500) * 40) {
            this.isBlown = true;
            for (let i = 0; i < 60; i++) {
                particles.push(new Particle(this.x, this.y, this.col));
            }
        }
        return this.isBlown;
    }

    draw() {
        ctx.globalAlpha = 1;
        ctx.fillStyle = this.col;
        ctx.fillRect(this.x, this.y, 4, 4);
    }
}

function randomCol() {
    var letter = '0123456789ABCDEF';
    var nums = [];

    for (var i = 0; i < 3; i++) {
        nums[i] = Math.floor(Math.random() * 256);
    }

    let brightest = Math.max(...nums);
    brightest /= 255;
    for (var i = 0; i < 3; i++) {
        nums[i] /= brightest;
    }

    let color = "#";
    for (var i = 0; i < 3; i++) {
        color += letter[Math.floor(nums[i] / 16)];
        color += letter[Math.floor(nums[i] % 16)];
    }
    return color;
}

function randomVec(max) {
    let dir = Math.random() * Math.PI * 2;
    let spd = Math.random() * max;
    return { x: Math.cos(dir) * spd, y: Math.sin(dir) * spd };
}

function setSize(canv) {
    canv.style.width = innerWidth + "px";
    canv.style.height = innerHeight + "px";
    width = innerWidth;
    height = innerHeight;

    // Set actual canvas resolution considering devicePixelRatio
    canv.width = innerWidth * window.devicePixelRatio;
    canv.height = innerHeight * window.devicePixelRatio;
    ctx = canv.getContext("2d");
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
}

function onClick(e) {
    fireworks.push(new Firework(e.clientX));
}

function windowResized() {
    setSize(canvas);
    ctx.fillStyle = "#ffc2d1";
    ctx.fillRect(0, 0, width, height);
}
