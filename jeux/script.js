const canvas = document.querySelector('canvas');
const boxwidth = canvas.width / 20;
const boxheight = canvas.height / 20;
const ctx = canvas.getContext("2d");

class Snake {
    #color;
    body;
    #direction = "right";

    constructor(data, color) {
        this.body = data;
        this.#color = color;
    }

    draw(ctx, boxwidth, boxheight) {
        for (let i = 0; i < this.body.length; i++) {
            const data = this.body[i];
            ctx.fillStyle = this.#color;
            ctx.fillRect(data[0] * boxwidth, data[1] * boxheight, boxwidth, boxheight);
        }
    }

    move() {
        const last = [...this.body[this.body.length - 1]];
        this.body.shift();

        if (this.#direction == "right")
            last[0] = last[0] == 19 ? 0 : last[0] + 1;
        if (this.#direction == "left")
            last[0] = last[0] == 0 ? 19 : last[0] - 1;
        if (this.#direction == "down")
            last[1] = last[1] == 19 ? 0 : last[1] + 1;
        if (this.#direction == "up")
            last[1] = last[1] == 0 ? 19 : last[1] - 1;

        this.body = [...this.body, last];
    }

    checkCollision() {
        const last = [...this.body[this.body.length - 1]];
        const rest = this.body.slice(0, -1);
        return rest.find(t => t[0] == last[0] && t[1] == last[1]);
    }

    changeDirection(code) {
        if (["right", "left"].includes(this.#direction) && [38, 40].includes(code)) {
            this.#direction = code == 38 ? "up" : "down";
        }
        if (["up", "down"].includes(this.#direction) && [37, 39].includes(code)) {
            this.#direction = code == 39 ? "right" : "left";
        }
    }

    isEatApple(x, y) {
        const last = [...this.body[this.body.length - 1]];
        return last[0] == x && last[1] == y;
    }

    grow(x, y) {
        this.body.push([x, y]);
    }

    shrink() {
        this.body.pop();
    }
}

class Apple {
    x;
    y;
    #color;
    isPoison = false;

    constructor(posx, posy, color, isPoison = false) {
        this.x = posx;
        this.y = posy;
        this.#color = color;
        this.isPoison = isPoison;
    }

    draw(ctx, boxwidth, boxheight) {
        ctx.fillStyle = this.#color;
        ctx.fillRect(this.x * boxwidth, this.y * boxheight, boxwidth, boxheight);
    }

    genposition(snakebody) {
        let x, y;
        do {
            x = Math.floor(Math.random() * 20);
            y = Math.floor(Math.random() * 20);
        } while (snakebody.find(t => t[0] == x && t[1] == y));

        this.x = x;
        this.y = y;
    }
}

// Classe block si besoin
class Block {
    body;
    #color = "gray";

    constructor(data) {
        this.body = data;
    }

    draw(ctx, boxwidth, boxheight) {
        for (let i = 0; i < this.body.length; i++) {
            const data = this.body[i];
            ctx.fillStyle = this.#color;
            ctx.fillRect(data[0] * boxwidth, data[1] * boxheight, boxwidth, boxheight);
        }
    }
}

// --- Game setup ---
const snake = new Snake([[4, 6], [5, 6], [6, 6]], "red");
const apple = new Apple(6, 7, "purple");
const poison = [
    new Apple(8, 9, "green", true),
    new Apple(19, 12, "green", true)
];

let interval = setInterval(() => {
    snake.move();

    if (snake.checkCollision()) {
        clearInterval(interval);
        alert("Game Over!");
        return;
    }

    if (snake.isEatApple(apple.x, apple.y)) {
        snake.grow(apple.x, apple.y);
        apple.genposition(snake.body);
    }

    poison.forEach((el, i) => {
        if (snake.isEatApple(el.x, el.y)) {
            snake.shrink();
            if (snake.body.length === 0) {
                clearInterval(interval);
                alert("You died by poison!");
                return;
            }
            poison.splice(i, 1);
        }
    });

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    snake.draw(ctx, boxwidth, boxheight);
    apple.draw(ctx, boxwidth, boxheight);
    poison.forEach(el => el.draw(ctx, boxwidth, boxheight));
}, 150);

// Direction input
document.body.addEventListener("keydown", (e) => {
    snake.changeDirection(e.keyCode);
});
