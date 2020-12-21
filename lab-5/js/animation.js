const random = (min, max) => {
	let num = Math.floor(Math.random() * (max - min + 1)) + min;
    if (Math.abs(num) < 0.5)  num *= 2;  
    return num === 0 ? 1 : num;
}

const canvas = document.getElementById("animation-area-canvas");
const width = canvas.offsetWidth;
const height = canvas.offsetHeight;
const ctx = canvas.getContext("2d");
const radius = 5;
const texture = new Image();
texture.src = "./img/favicon-32x32.png";

let canvas_x = 5;
let canvas_y = 5;   
let canvas_dx = random(0, 2);
let canvas_dy = random(1, 4);

let ballInterval;
let draw;
let animationType;
let leftArea = new Event('leftArea');

let ball = {
    item: document.getElementById('Ball'),
    x: 0,
    y: 0,
    velX: random(0, 2),
    velY: random(1, 3)
};


const moveBall = (ball, width, height) => {
    if(ball.x + ball.item.offsetWidth + 5 >= width) {            
        document.dispatchEvent(leftArea);
        ball.item.style.display = "none";
		document.dispatchEvent(new CustomEvent('animationMessage', {detail: {message: 'Left the area'}}))
    } if(ball.x < 0) {
        ball.velX = -(ball.velX);
		document.dispatchEvent(new CustomEvent('animationMessage', {detail: {message: 'Touched left'}}))
 	} if(ball.y + ball.item.offsetHeight >= height) {
		ball.velY = -(ball.velY)
		document.dispatchEvent(new CustomEvent('animationMessage', {detail: {message: 'Touched bottom'}}))
	} if(ball.y < 0) {
		ball.velY = -(ball.velY)
		document.dispatchEvent(new CustomEvent('animationMessage', {detail: {message: 'Touched top'}}))
    }
    
    ball.x += ball.velX;
	ball.y += ball.velY;
	ball.item.style.left = `${ball.x}px`;
	ball.item.style.top = `${ball.y}px`;
}


const playJsAnim = () => {
    document.dispatchEvent(new CustomEvent('animationMessage', {detail: {message: 'Launched animation'}}))
    const width = document.getElementById('animation-area-div').offsetWidth;
    const height = document.getElementById('animation-area-div').offsetHeight;
    ballInterval = setInterval(() => {
        moveBall(ball, width, height);
    }, 10)
}


const stopJsAnim = () => {
    document.dispatchEvent(new CustomEvent('animationMessage', {detail: {message: 'Stopped animation'}}))
    clearInterval(ballInterval);
}


const reloadJsAnim = () => {
    document.dispatchEvent(new CustomEvent('animationMessage', {detail: {message: 'Reloaded animation'}}))
    ball.x = 0;
    ball.y = 0;
    ball.velX = random(0, 2);
    ball.velY = random(1, 3);
    ball.item.style.top = '0px';
    ball.item.style.left = '0px';
}


const drawBall = (x, y) => {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI*2);
    ctx.fillStyle = "yellow";
    ctx.fill();
    ctx.closePath();
}


const startCanvasAnim = () => {
    document.dispatchEvent(new CustomEvent('animationMessage', {detail: {message: 'Launched animation'}}));
    const pattern = ctx.createPattern(texture, 'repeat');

    draw = () => {   
        ctx.fillStyle = pattern;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        drawBall(canvas_x, canvas_y);
        
        if (canvas_x + canvas_dx < radius) {
            canvas_dx = -canvas_dx;
		    document.dispatchEvent(new CustomEvent('animationMessage', {detail: {message: 'Touched left'}}))
        } if (canvas_x + canvas_dx > canvas.width + radius) {
            document.dispatchEvent(leftArea);
		    document.dispatchEvent(new CustomEvent('animationMessage', {detail: {message: 'Left the area'}}))
            stopCanvasAnim();           
        } if (canvas_y + canvas_dy > canvas.height - radius)  {   
            canvas_dy = -canvas_dy;
		    document.dispatchEvent(new CustomEvent('animationMessage', {detail: {message: 'Touched bottom'}}))
        } if (canvas_y + canvas_dy < radius) {
            canvas_dy = -canvas_dy;
		    document.dispatchEvent(new CustomEvent('animationMessage', {detail: {message: 'Touched top'}}))
        }

        canvas_x += canvas_dx;
        canvas_y += canvas_dy;
        requestAnimationFrame(draw);
    }
    
    draw();
}


const stopCanvasAnim = () => {
    document.dispatchEvent(new CustomEvent('animationMessage', {detail: {message: 'Stopped animation'}}))
    draw = () => null;
}


const reloadCanvasAnim = () => {
		document.dispatchEvent(new CustomEvent('animationMessage', { detail: { message: 'Reloaded animation'}}))
        canvas_x = 5;
        canvas_y = 5;
        canvas_dx = random(0, 2);
        canvas_dy = random(1, 4);
        drawBall(canvas_x, canvas_y);
    }


document.getElementById("close-button").addEventListener("click", () => {
    document.dispatchEvent(new CustomEvent('animationMessage', { detail: { message: 'Closed animation window'}}))
    document.querySelector("#animation-work-container").style.display = "none";
    
    let logs = JSON.parse(localStorage.getItem('eventLog'));
    const logEl = document.querySelector('.box-2');
    let logbox = document.createElement('div');
    logbox.style.height = "30%";
    logbox.style.overflow = "auto";
    let ul = document.createElement('ul');
    
    logs.forEach(log => {
        let li = document.createElement("li");
        li.appendChild(document.createTextNode(log.time.split('n')[1].split('G')[0] + log.message));
        ul.appendChild(li);
    })

    logbox.appendChild(ul);
    logEl.append(logbox);    
});


document.getElementById('stop-button').addEventListener("click", () => {
    document.getElementById('stop-button').style.display = "none";
    console.log(animationType);
    if (animationType === 1) {
        document.getElementById('play1').style.display = 'flex';
        stopJsAnim();
    } else if (animationType === 2) {
        document.getElementById('play2').style.display = 'flex';
        stopCanvasAnim();
    }
})


document.getElementById("reload-button").addEventListener('click', () => {
    document.getElementById("reload-button").style.display = "none";
    if (animationType === 1) {
        document.getElementById('Ball').style.display = "flex";
        document.getElementById('play1').style.display = "flex";
        reloadJsAnim();
    } else if (animationType === 2) {
        document.getElementById('play2').style.display = "block";
        reloadCanvasAnim();
    }
})


document.getElementById("play1").addEventListener('click', () => {
    animationType = 1;
    document.getElementById("animation-area-div").style.display = "block";
    document.getElementById("animation-area-canvas").style.display = "none";
    document.getElementById("Ball").style.display = "flex";
    document.getElementById('stop-button').style.display = "block";
    document.getElementById("play1").style.display = "none";
    playJsAnim();
});


document.getElementById("play2").addEventListener('click', () => {
    animationType = 2;
    document.getElementById("animation-area-div").style.display = "none";
    document.getElementById("animation-area-canvas").style.display = "block";
    document.getElementById("Ball").style.display = "none";    
    document.getElementById('stop-button').style.display = "block";
    document.getElementById("play2").style.display = "none";
    canvas.width = document.getElementById('animation-area-canvas').offsetWidth;
	canvas.height = document.getElementById('animation-area-canvas').offsetHeight;
    startCanvasAnim();       
});


document.addEventListener('leftArea', () => {
    if (animationType === 1) clearInterval(ballInterval);    
    document.getElementById('reload-button').style.visibility = 'visible';
    document.getElementById('reload-button').style.display = "flex";
    document.getElementById('stop-button').style.display = "none";
});


localStorage.setItem('eventLog', JSON.stringify([]));
	document.addEventListener("animationMessage", (event) => {
        let messages = JSON.parse(localStorage.getItem('eventLog'));
		messages.push({time: (new Date()).toString(), message: event.detail.message});
		localStorage.setItem('eventLog', JSON.stringify(messages));
        document.getElementById('event-text').style.display = "flex";
        document.getElementById('event-text').innerHTML = `<p>Event: ${event.detail.message}</p>`;        
    })



