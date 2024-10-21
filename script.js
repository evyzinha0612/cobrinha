// Definindo o campo do jogo e seu contexto
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const box = 32;  // tamanho de cada quadrado
canvas.width = 16 * box;  // largura do campo (16 blocos)
canvas.height = 16 * box; // altura do campo (16 blocos)

// Criando a cobra
let snake = [];
snake[0] = { x: 8 * box, y: 8 * box };  // Começo da cobra no centro

// Criando a comida da cobra
let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
};

// Variáveis de direção
let direction;
let score = 0;

// Controle da direção via teclado
document.addEventListener('keydown', event => {
    if (event.keyCode == 37 && direction !== "right") direction = "left";
    else if (event.keyCode == 38 && direction !== "down") direction = "up";
    else if (event.keyCode == 39 && direction !== "left") direction = "right";
    else if (event.keyCode == 40 && direction !== "up") direction = "down";
});

// Função para desenhar o jogo
function drawGame() {
    // Limpa o campo de jogo
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Desenha a cobra
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = (i === 0) ? "green" : "white";  // Cabeça verde, corpo branco
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
    }

    // Desenha a comida
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, box, box);

    // Posição anterior da cobra
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    // Movimenta a cobra conforme a direção
    if (direction == "left") snakeX -= box;
    if (direction == "right") snakeX += box;
    if (direction == "up") snakeY -= box;
    if (direction == "down") snakeY += box;

    // Verifica se a cobra comeu a comida
    if (snakeX === food.x && snakeY === food.y) {
        score++;
        // Gera nova comida
        food = {
            x: Math.floor(Math.random() * 15 + 1) * box,
            y: Math.floor(Math.random() * 15 + 1) * box
        };
    } else {
        // Remove a cauda
        snake.pop();
    }

    // Adiciona nova cabeça
    let newHead = { x: snakeX, y: snakeY };
    
    // Verifica se a cobra colidiu com a parede ou com o próprio corpo
    if (snakeX < 0 || snakeX >= 16 * box || snakeY < 0 || snakeY >= 16 * box || collision(newHead, snake)) {
        clearInterval(game);
        alert(`Fim de Jogo! Pontuação: ${score}`);
    }

    snake.unshift(newHead);
}

// Função para detectar colisão da cobra com seu próprio corpo
function collision(head, snake) {
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            return true;
        }
    }
    return false;
}

// Chama a função do jogo a cada 100ms
let game = setInterval(drawGame, 100);
