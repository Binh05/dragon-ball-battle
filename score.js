const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

const gravity = 0.5

class Player {
    constructor() {
        this.position = {
            x: 200,
            y: 100,
        }
        this.vantoc = {
            x: 0,
            y: 1,
        }
        this.height = 100
    }
    draw() {
        c.fillStyle = "red";
        c.fillRect(this.position.x, this.position.y, 100, this.height);
    }
    run() {
        this.position.x += this.vantoc.x
        this.position.y += this.vantoc.y
        if (this.position.y + this.height + this.vantoc.y < canvas.height)
            this.vantoc.y += gravity
        else this.vantoc.y = 0
    }
}
const player = new Player()
const keys = {
    a: {
        pressed: false,
    },
    d: {
        pressed: false,
    }
};
function animate() {
    c.fillStyle = "white";
    c.fillRect(0, 0, canvas.width, canvas.height);

    player.draw()
    player.run()

    player.vantoc.x = 0
    if (keys.a.pressed) {
        player.vantoc.x = -5
    }else if (keys.d.pressed) {
        player.vantoc.x = 5
    }

    window.requestAnimationFrame(animate);
}

animate();

window.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'a':
            keys.a.pressed = true
            break
        case 'd':
            keys.d.pressed = true
            break
        case ' ':
            player.vantoc.y = -15
            break
    }
});

window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'a':
            keys.a.pressed = false
            break
        case 'd':
            keys.d.pressed = false
            break
    }
});