const canvas = document.getElementById('canvas'),
        ctx = canvas.getContext('2d'),
        w = canvas.width,
        h = canvas.height;

const walk = 0;
const wall = 1;
const player = 2;
const finish = 3;

let board = [
    [wall,wall,wall,wall,wall,wall,wall,wall],
    [wall,walk,wall,walk,walk,walk,walk,wall],
    [wall,walk,wall,wall,walk,wall,walk,wall],
    [wall,walk,walk,wall,walk,wall,walk,wall],
    [wall,walk,walk,walk,walk,wall,walk,wall],
    [wall,walk,wall,wall,walk,wall,walk,wall],
    [wall,walk,walk,wall,walk,wall,walk,finish],
    [wall,wall,wall,wall,wall,wall,wall,wall],
]

const blockSize = w/8;
let playerPos = [5,0];

window.onload = function() {
    draw();
}

function draw() {
    drawLine()
    drawElement()
}

function drawElement() {
    for(let i=0;i<8;i++) {
        for(let j=0;j<8;j++) {

            let [y,x] = playerPos;
            board[y][x] = player;

            ctx.beginPath();
            ctx.rect(j*blockSize, i*blockSize, blockSize, blockSize)

            switch(board[i][j]) {
                case wall : 
                    ctx.fillStyle = 'black'
                    break;
                case player :
                    ctx.fillStyle = 'yellow'
                    break;
                case finish :
                    ctx.fillStyle = 'red'
                    break;
                case walk :
                    ctx.fillStyle = 'white'
                    break;
            }
            
            ctx.fill()
            ctx.strokeStyle = 'gray';
            ctx.stroke()
        }
    }
}

function drawLine() {
    ctx.beginPath();
    ctx.strokeStyle = 'gray';

    for(let i=0;i<8;i++) {
        ctx.moveTo(0,i*blockSize);
        ctx.lineTo(w,i*blockSize);
        for(let j=0;j<8;j++) {
            ctx.moveTo(j*blockSize,0);
            ctx.lineTo(j*blockSize,h);
        }
    }

    ctx.stroke()
}

document.addEventListener('keydown', (e) => {
    let keyCode = e.keyCode;
    switch(keyCode) {
        case 39:
            movePlayer(0,1)
            break;
        case 37: 
            movePlayer(0,-1)
            break;
        case 38: 
            movePlayer(-1,0);
            break;
        case 40:
            movePlayer(1,0);
            break;
    }
})

function movePlayer(y,x) {
    let [oldY, oldX] = playerPos;

    if(board[oldY+y][oldX+x] === 1) return;
    else if(board[oldY+y][oldX+x] === 3) alert('You Win');

    playerPos[0] = oldY+y;
    playerPos[1] = oldX+x;

    board[oldY][oldX] = 0;
    // board[oldY+y][oldX+x] = player;
    draw();
}