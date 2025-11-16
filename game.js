//Dohvat canvasa i 2D konteksta za crtanje igre
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

//Spremanje dimenzija canvasa u varijable
const CANVAS_WIDTH = canvas.width;
const CANVAS_HEIGHT = canvas.height;

//Stanja igre 
const GAME_STATE_START = "start";
const GAME_STATE_PLAYING = "playing";
const GAME_STATE_GAME_OVER = "game_over";
const GAME_STATE_WON = "won";

//Tren stanje igre
let gameState = GAME_STATE_START;


//Konstante za broj redova i stupaca i dimenzije cigli
const BRICK_ROWS = 5;
const BRICK_COLS = 10;
const BRICK_WIDTH = 50;
const BRICK_HEIGHT = 20;

//Razmaci i pomaci za uređivanje pozicija cigli
const BRICK_GAP_X = 30;
const BRICK_GAP_Y = 15;
const BRICK_OFFSET_TOP = 80;
const BRICKS_TOTAL_WIDTH = BRICK_COLS * BRICK_WIDTH + (BRICK_COLS - 1) * BRICK_GAP_X;
const BRICK_OFFSET_LEFT = (CANVAS_WIDTH - BRICKS_TOTAL_WIDTH) / 2;

//2D polje di spremamo cigle
let bricks = [];

//Boje cigli po redovima
const BRICK_COLORS = [
    "rgb(153, 51, 0)",   
    "rgb(255, 0, 0)",    
    "rgb(255, 153, 204)",
    "rgb(0, 255, 0)",    
    "rgb(255, 255, 153)" 
];


//Konstante za dimenzije i brzinu palice
const PADDLE_WIDTH = 120;
const PADDLE_HEIGHT = 15;
const PADDLE_SPEED = 7;

//Početna pozicija palice
let paddleX = (CANVAS_WIDTH - PADDLE_WIDTH) / 2;
//Visina palice iznad ekrana
let paddleY = CANVAS_HEIGHT - 60;


//Veličina kvadrata loptice i početna brzina
const BALL_SIZE = 12;
const BALL_SPEED = 4;

//Početna pozicija loptice koja je na sredini palice
let ballX = paddleX + PADDLE_WIDTH / 2;
let ballY = paddleY - BALL_SIZE;
//Brzina loptice po x i y osi
let ballSpeedX = 0;
let ballSpeedY = 0;

//Trenutni score i best score
let score = 0;
let bestScore = 0;

//Učitavanje best scorea iz local storeaga
if (localStorage.getItem("bestScoreBreakout")) {
    bestScore = parseInt(localStorage.getItem("bestScoreBreakout"), 10);
}



//Početno stanje tipke nisu pritisnute
let leftPressed = false;
let rightPressed = false;

//Ako se pritisne tipka
document.addEventListener("keydown", function (event) {
    if (event.key === "ArrowLeft") {
        leftPressed = true;
    }
    if (event.key === "ArrowRight") {
        rightPressed = true;
    }
    //SPACE tipka pokreće ili restartira igru ovisno o tren stanju igre
    if (event.code === "Space") {
        if (gameState === GAME_STATE_START) {
            startGame();
        } else if (gameState === GAME_STATE_GAME_OVER || gameState === GAME_STATE_WON) {
            resetGame();
            startGame();
        }
    }
});

//Otpuštanje tipki
document.addEventListener("keyup", function (event) {
    if (event.key === "ArrowLeft") {
        leftPressed = false;
    }
    if (event.key === "ArrowRight") {
        rightPressed = false;
    }
});



//Stvara se novo polje cigli i početna pozicija njiihova, boja i stanje vidljivosti (u startu su sve vidljive jer još nisu pogođene)

function createBricks() {
    bricks = [];
    for (let row = 0; row < BRICK_ROWS; row++) {
        bricks[row] = [];
        for (let col = 0; col < BRICK_COLS; col++) {
            const x = BRICK_OFFSET_LEFT + col * (BRICK_WIDTH + BRICK_GAP_X);
            const y = BRICK_OFFSET_TOP + row * (BRICK_HEIGHT + BRICK_GAP_Y);
            bricks[row][col] = {
                x: x,
                y: y,
                width: BRICK_WIDTH,
                height: BRICK_HEIGHT,
                color: BRICK_COLORS[row],
                visible: true
            };
        }
    }
}

//Vraća se igra u poč stanje osim best scorea
function resetGame() {
    gameState = GAME_STATE_START;
    createBricks();
    score = 0;
    paddleX = (CANVAS_WIDTH - PADDLE_WIDTH) / 2;
    ballX = paddleX + PADDLE_WIDTH / 2;
    ballY = paddleY - BALL_SIZE;
    ballSpeedX = 0;
    ballSpeedY = 0;
}

//Igra ide u stanje igranja i palica dobiva poč brzinu
function startGame() {
    gameState = GAME_STATE_PLAYING;
    const direction = Math.random() < 0.5 ? -1 : 1; // nasumično lijevo ili desno
    ballSpeedX = BALL_SPEED * direction;
    ballSpeedY = -BALL_SPEED; // prema gore
}

//Na poč kreiramo cigle i igra je u poč stanju
resetGame();



//Crtanje sbih vidljivih cigli
function drawBricks() {
    for (let row = 0; row < BRICK_ROWS; row++) {
        for (let col = 0; col < BRICK_COLS; col++) {
            const brick = bricks[row][col];
            if (brick.visible) {
                ctx.shadowOffsetX = 3;
                ctx.shadowOffsetY = 3;
                ctx.shadowBlur = 6;
                ctx.shadowColor = "rgba(255,255,255,0.4)";
                ctx.fillStyle = brick.color;
                ctx.fillRect(brick.x, brick.y, brick.width, brick.height);
                ctx.shadowOffsetX = 0;
                ctx.shadowOffsetY = 0;
                ctx.shadowBlur = 0;
                ctx.shadowColor = "transparent";
            }
        }
    }
}

//Crtanje palice
function drawPaddle() {
    ctx.shadowOffsetX = 3;
    ctx.shadowOffsetY = 3;
    ctx.shadowBlur = 8;
    ctx.shadowColor = "rgba(255,255,255,0.4)";
    ctx.fillStyle = "#ebebeb";
    ctx.fillRect(paddleX, paddleY, PADDLE_WIDTH, PADDLE_HEIGHT);
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.shadowBlur = 0;
    ctx.shadowColor = "transparent";
}

//Crtanje loptice
function drawBall() {
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;
    ctx.shadowBlur = 6;
    ctx.shadowColor = "rgba(255,255,255,0.4)";
    ctx.fillStyle = "#e9e9e9";
    ctx.fillRect(ballX - BALL_SIZE / 2, ballY - BALL_SIZE / 2, BALL_SIZE, BALL_SIZE);
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.shadowBlur = 0;
    ctx.shadowColor = "transparent";
}

//Print tren scorea i best scorea
function drawScores() {
    ctx.font = "20px Helvetica";
    ctx.fillStyle = "white";

    ctx.textAlign = "left";
    ctx.fillText("Score: " + score, 20, 20);

    ctx.textAlign = "right";
    ctx.fillText("Best: " + bestScore, CANVAS_WIDTH - 100, 20);

    ctx.textAlign = "left";
}

//Poč ekran
function drawStartScreen() {
    ctx.font = "bold 36px Helvetica";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("BREAKOUT", CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 - 20);

    ctx.font = "bold italic 18px Helvetica";
    ctx.fillText("Press SPACE to begin", CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 20);

    ctx.textAlign = "left";
    ctx.textBaseline = "alphabetic";
}

//Ekran za GAME OVER
function drawGameOverScreen() {
    ctx.font = "bold 40px Helvetica";
    ctx.fillStyle = "yellow";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("GAME OVER", CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 - 10);

    ctx.font = "20px Helvetica";
    ctx.fillStyle = "white";
    ctx.fillText("Score: " + score + "   (Press SPACE to restart)", CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 25);

    ctx.textAlign = "left";
    ctx.textBaseline = "alphabetic";
}

//Ekran za YOU WIN
function drawWinScreen() {
    ctx.font = "40px Helvetica";
    ctx.fillStyle = "yellow";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("YOU WIN!", CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 - 10);

    ctx.font = "20px Helvetica";
    ctx.fillStyle = "white";
    ctx.fillText("Score: " + score + "   (Press SPACE to play again)", CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 25);

    ctx.textAlign = "left";
    ctx.textBaseline = "alphabetic";
}



//Pomicanje palice lijevo i desno, ne van rubova ekrana
function updatePaddle() {
    if (leftPressed) {
        paddleX -= PADDLE_SPEED;
        if (paddleX < 0) {
            paddleX = 0;
        }
    }
    if (rightPressed) {
        paddleX += PADDLE_SPEED;
        if (paddleX + PADDLE_WIDTH > CANVAS_WIDTH) {
            paddleX = CANVAS_WIDTH - PADDLE_WIDTH;
        }
    }
}



//Provjera sudara loptice s palicom i rubovima ekrana i GAME OVER
function handleBallWallAndPaddleCollision() {
    // Rubovi lijevo/desno
    if (ballX + BALL_SIZE / 2 >= CANVAS_WIDTH || ballX - BALL_SIZE / 2 <= 0) {
        ballSpeedX = -ballSpeedX;
    }

    //Gornji rub
    if (ballY - BALL_SIZE / 2 <= 0) {
        ballSpeedY = -ballSpeedY;
    }

    //Ako padne ispod dna je GAME OVER
    if (ballY - BALL_SIZE / 2 > CANVAS_HEIGHT) {
        gameState = GAME_STATE_GAME_OVER;
        if (score > bestScore) {
            bestScore = score;
            localStorage.setItem("bestScoreBreakout", bestScore.toString());
        }
    }

    //Sudar s palicom
    if (
        ballY + BALL_SIZE / 2 >= paddleY &&
        ballY + BALL_SIZE / 2 <= paddleY + PADDLE_HEIGHT &&
        ballX >= paddleX &&
        ballX <= paddleX + PADDLE_WIDTH
    ) {
        //Mjesto di loptica pogodi palicu 
        const hitPosition = (ballX - (paddleX + PADDLE_WIDTH / 2)) / (PADDLE_WIDTH / 2);
        ballSpeedX = BALL_SPEED * hitPosition * 1.5;
        ballSpeedY = -Math.abs(ballSpeedY);
        ballY = paddleY - BALL_SIZE / 2 - 1;
    }
}



//Provjera pogotka loptice u cigle, njihovo brisanje i +1 u score 
function handleBallBrickCollision() {
    for (let row = 0; row < BRICK_ROWS; row++) {
        for (let col = 0; col < BRICK_COLS; col++) {
            const brick = bricks[row][col];
            if (brick.visible) {
                const brickLeft = brick.x;
                const brickRight = brick.x + brick.width;
                const brickTop = brick.y;
                const brickBottom = brick.y + brick.height;

                const ballLeft = ballX - BALL_SIZE / 2;
                const ballRight = ballX + BALL_SIZE / 2;
                const ballTop = ballY - BALL_SIZE / 2;
                const ballBottom = ballY + BALL_SIZE / 2;

                //Osnovni sudar pravokutnik s pravokutnikom
                if (
                    ballRight > brickLeft &&
                    ballLeft < brickRight &&
                    ballBottom > brickTop &&
                    ballTop < brickBottom
                ) {
                    const prevBallX = ballX - ballSpeedX;
                    const prevBallY = ballY - ballSpeedY;

                    const prevBallLeft = prevBallX - BALL_SIZE / 2;
                    const prevBallRight = prevBallX + BALL_SIZE / 2;

                    //Odluka di je udarac 
                    if (prevBallRight <= brickLeft || prevBallLeft >= brickRight) {
                        ballSpeedX = -ballSpeedX;
                    } else {
                        ballSpeedY = -ballSpeedY;
                    }

                    brick.visible = false;
                    score += 1;

                    //Ako su sve cigle srušene je pobjeda
                    if (score === BRICK_ROWS * BRICK_COLS) {
                        gameState = GAME_STATE_WON;
                        if (score > bestScore) {
                            bestScore = score;
                            localStorage.setItem("bestScoreBreakout", bestScore.toString());
                        }
                    }

                    //Nakon prvog sudara izlaz
                    return;
                }
            }
        }
    }
}

//Main fja koje se konst poziva i upravlja igrom
 
function gameLoop() {
    //Brisanje ekrana prije crtanja novog
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    if (gameState === GAME_STATE_START) {
        drawBricks();
        drawPaddle();
        drawBall();
        drawScores();
        drawStartScreen();
    } else if (gameState === GAME_STATE_PLAYING) {
        updatePaddle();
        ballX += ballSpeedX;
        ballY += ballSpeedY;
        handleBallWallAndPaddleCollision();
        handleBallBrickCollision();
        drawBricks();
        drawPaddle();
        drawBall();
        drawScores();
    } else if (gameState === GAME_STATE_GAME_OVER) {
        drawBricks();
        drawPaddle();
        drawBall();
        drawScores();
        drawGameOverScreen();
    } else if (gameState === GAME_STATE_WON) {
        drawBricks();
        drawPaddle();
        drawBall();
        drawScores();
        drawWinScreen();
    }

    //Sljedeći ekran animacije tj igre
    requestAnimationFrame(gameLoop);
}

//Pokretanje glavne petlje igre
gameLoop();
