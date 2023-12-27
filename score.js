const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

const CANVAS_WIDTH = canvas.width = 1024
const CANVAS_HEIGHT = canvas.height = 576

const gravity = 0.7
//const playerImage = new Image();
//playerImage.src = 'img/Vegito.png';


class Player {
    constructor({ position, offset }) {
        this.position = position
        this.vantoc = {
            x: 0,
            y: 1,
        }
        this.width = 50
        this.height = 200
        this.attackBox = {
            position: {
                x: this.position.x,
                y: this.position.y,
            },
            offset: offset,
            width: 100,
            height: 50,
        }
        this.lastKey
        this.isAttacking
        this.health = 100
    }
    draw() {
        c.fillStyle = "red";
        c.fillRect(this.position.x, this.position.y, this.width, this.height);
        //c.drawImage(playerImage, 14, 374, 34, 68, 400, 376, 100, 200);
        c.fillStyle = "white"
        if (this.isAttacking) {
            c.fillRect(this.attackBox.position.x, this.attackBox.position.y+50, this.attackBox.width, this.attackBox.height)
        }
    }
    run() {
        this.attackBox.position.x = this.position.x + this.attackBox.offset.x
        this.attackBox.position.y = this.position.y
        this.position.x += this.vantoc.x
        this.position.y += this.vantoc.y
        if (this.position.y + this.height + this.vantoc.y < canvas.height)
            this.vantoc.y += gravity
        else this.vantoc.y = 0
    }

    attack() {
        this.isAttacking = true
        setTimeout(() => {
            this.isAttacking = false
        }, 100);
    }
}
const player = new Player({
    position: {
        x: 150,
        y: 100,
    },
    offset: {
        x: 0,
        y: 0,
    }
})

const enemy = new Player({
    position: {
        x: 550,
        y: 100,
    },
    offset: {
        x: -50,
        y: 0,
    }
})

const keys = {
    a: {
        pressed: false,
    },
    d: {
        pressed: false,
    },
    ArrowLeft: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    }
};

function khoi_hop_va_cham({ khoihop1, khoihop2 }) {
    return (
        khoihop1.attackBox.position.x + khoihop1.attackBox.width >= khoihop2.position.x
        && khoihop1.attackBox.position.x <= khoihop2.position.x + khoihop2.width
        && khoihop1.attackBox.position.y + khoihop1.attackBox.height >= khoihop2.position.y
        && khoihop1.attackBox.position.y + khoihop1.attackBox.height <= khoihop2.position.y + khoihop2.height
        && khoihop1.isAttacking
    )
}

let lastKey

function animate() {
    c.fillStyle = "black";
    c.fillRect(0, 0, canvas.width, canvas.height);

    player.draw()
    player.run()

    enemy.draw()
    enemy.run()

    player.vantoc.x = 0
    if (keys.a.pressed && lastKey === 'a') {
        player.vantoc.x = -5
    } else if (keys.d.pressed && lastKey === 'd') {
        player.vantoc.x = 5
    }

    enemy.vantoc.x = 0
    if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
        enemy.vantoc.x = -5
    } else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
        enemy.vantoc.x = 5
    }

    if (
        khoi_hop_va_cham({
            khoihop1: player,
            khoihop2: enemy,
        })
        && player.isAttacking) {
        player.isAttacking = false
        enemy.health -= 4
        document.getElementById("enemyHealth").style.width = enemy.health + '%'
    }

    if (
        khoi_hop_va_cham({
            khoihop1: enemy,
            khoihop2: player,
        })
        && enemy.isAttacking) {
        enemy.isAttacking = false
        player.health -= 4
        document.getElementById("playerHealth").style.width = player.health + '%'
    }

    window.requestAnimationFrame(animate);
}

animate();

window.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'a':
            keys.a.pressed = true
            lastKey = 'a'
            break
        case 'd':
            keys.d.pressed = true
            lastKey = 'd'
            break
        case 'k':
            player.vantoc.y = -15
            break
        case 'j':
            player.attack()
            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true
            enemy.lastKey = 'ArrowLeft'
            break
        case 'ArrowRight':
            keys.ArrowRight.pressed = true
            enemy.lastKey = 'ArrowRight'
            break
        case '2':
            enemy.vantoc.y = -15
            break
        case '1':
            enemy.attack()
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
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false
            break
        case 'ArrowRight':
            keys.ArrowRight.pressed = false
            break
    }
});
