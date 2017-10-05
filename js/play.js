console.log("Ekstra, ze tu zaglądasz, jeśli szukasz szybko uczącego się juniora do swojego zespołu, wiesz do kogo pisać. Nie umiem wszystkiego, ale powiedz co i będę umiał za godzinę ;)");

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var x = canvas.width/2;
var y = canvas.height-30;
var dx = 2;
var dy = -2;
var ballRadius = 8;
var color = "white";
var paddleHeight = 7;
var paddleWidth = 60;
var paddleX = (canvas.width-paddleWidth)/2;
var rightPressed = false;
var leftPressed = false;
var interval = 20;
var brickRowCount = 3;
var brickColumnCount = 8;
var brickWidth = 30;
var brickHeight = 10;
var brickPadding = 5;
var brickOffsetTop = 20;
var brickOffsetLeft = 5;
var bricks = [];
for(c=0; c<brickColumnCount; c++) {
    bricks[c] = [];
    for(r=0; r<brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
}
var score = 0;
var lives = 3;

var modal = document.getElementById('myModal');
var modal2 = document.getElementById('myModal2');
var modal3 = document.getElementById('myModal3');

var blink = document.getElementById('blink')
var blinkA = document.getElementById('blinkA')
var content = document.querySelector(".content")

var active = document.querySelector(".hover") || document.querySelector(".hoverlist li");

var lis = document.getElementsByTagName("li");
var len = lis.length;
for (var i=0; i < len; i++) {
    lis[i].addEventListener("mouseover",function(e) {
      active.classList.remove("hover");
      active=e.target.parentNode.parentNode;
      active.classList.add("hover");
      active.querySelector('input').focus();
    });
};
document.addEventListener("keydown", function (e){
    active.classList.remove("hover");
    if (e.which == 40){
        active = active.nextElementSibling || active;
    }else if (e.which == 38){
        active = active.previousElementSibling || active;
    } else if (typeof(active) != 'undefined' && active != null){
        active.classList.add("hover");
        active.querySelector('input').focus();
    }else{
        active = e.target;
    }
    active.classList.add("hover");
    active.querySelector('input').focus();

});

document.addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode == 32) {
        game();
        blink.style.display = "none"
        blinkA.style.display = "none"
        content.style.display = "none"
    } else if (event.keyCode == 113) {
        modal.style.display = "block"
    } else if  (event.keyCode == 27) {
        window.location = "play.html"
    }
});

// var touch = document.getElementById("touch");

// touch.addEventListener('touchstart', function(event){
//     game();
//     touch.style.display = "none";
//     content.style.display = "none";
// }, false);

function game(){
function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    drawBall();
    drawPaddle();
    drawScore();
    drawLives();
    collisionDetection();
    x += dx;
    y += dy;
    if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
        dx = -dx;
       
    }
    if(y + dy < ballRadius) {
        dy = -dy;
    }
    else if(y + dy > canvas.height-ballRadius) {
        if(x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
            //setInterval(draw, interval - 1);
        }
        else {
            lives--;
            if(!lives) {
                modal3.style.display = "block";

            }
            else {
                x = canvas.width/2;
                y = canvas.height-30;
                dx = 2;
                dy = -2;
                paddleX = (canvas.width-paddleWidth)/2;
            }
        }
    }
    if(rightPressed && paddleX < canvas.width-paddleWidth) {
        paddleX += 7;
    }
    else if(leftPressed && paddleX > 0) {
        paddleX -= 7;
    }
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();
}

function drawBricks() {
    for(c=0; c<brickColumnCount; c++) {
        for(r=0; r<brickRowCount; r++) {
            if(bricks[c][r].status == 1) {
                var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
                var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = color;
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

setInterval(draw, interval);

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
// document.addEventListener("mousemove", mouseMoveHandler, false);
// document.addEventListener("touchmove", touchHandler, false)

function keyDownHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = true;
    }
    else if(e.keyCode == 37) {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = false;
    }
    else if(e.keyCode == 37) {
        leftPressed = false;
    }
}

// function mouseMoveHandler(e) {
//     var relativeX = e.clientX - canvas.offsetLeft;
//     if(relativeX > 0 && relativeX < canvas.width) {
//         paddleX = relativeX - paddleWidth/2;
//     }
// }

// function touchHandler(e) {
//     var relativeX = e.clientX - canvas.offsetLeft;
//     if(relativeX > 0 && relativeX < canvas.width) {
//         paddleX = relativeX.pageX - canvas.offsetLeft - playerWidth / 2;
//         e.preventDefault();
//     }
// }

function collisionDetection() {
    for(c=0; c<brickColumnCount; c++) {
        for(r=0; r<brickRowCount; r++) {
            var b = bricks[c][r];
            if(b.status == 1) {
                if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
                    dy = -dy;
                    b.status = 0;
                    score++;
                    if(score == brickRowCount*brickColumnCount) {
                       modal2.style.display = "block";
                       lives = 100;
                    }
                }
            }
        }
    }
}

function drawScore() {
    ctx.font = "1em VT323";
    ctx.fillStyle = "#F4FF6C";
    ctx.fillText("Score: "+score, 8, 13);
}
function drawLives() {
    ctx.font = "1em VT323";
    ctx.fillStyle = "#F4FF6C";
    ctx.fillText("Lives: "+lives, canvas.width-65, 13);
    }
}