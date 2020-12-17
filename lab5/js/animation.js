const width = document.getElementById('animation-area-canvas').offsetWidth;
const height = document.getElementById('animation-area-canvas').offsetHeight;
const canvas = document.getElementById("animation-area-canvas");
const ctx = canvas.getContext("2d");
const radius = 5;
let controlState = 0; // 0 - stoped, 1 - playing, 2 - ready for reload
let ballInterval;
let width_c, height_c;
let frame;
let animType;

const random = (min, max) => {
	let num = Math.floor(Math.random() * (max-min+1)) + min;
	return num === 0 ? 1 : num;
}

// function Ball(x, y, velX, velY, color, size){
//   this.x = x;
//   this.y = y;
//   this.velX = velX;
//   this.velY = velY;
//   this.color = color;
//   this.size = size;
// }


// Ball.prototype.draw = function() {
//   ctx.beginPath();
//   ctx.fillStyle = this.color;
//   ctx.arc(this.x, this.y, this.size, 0, 2*Math.PI);
//   ctx.fill();
// };


// Ball.prototype.update = function() {
//     if((this.x + this.size) >= width) { 
//         document.dispatchEvent(leftArea);
//         document.dispatchEvent(new CustomEvent('animMessage', {detail: {message: 'Left the area'}}))
//   } if((this.x - this.size) <= 0) { 
//         this.velX = -this.velX;
//         document.dispatchEvent(new CustomEvent('animMessage', {detail: {message: 'Touched left'}}))
//   } if((this.y + this.size) >= height) { 
//         this.velY = -this.velY;
//         document.dispatchEvent(new CustomEvent('animMessage', {detail: {message: 'Touched bottom'}}))
//   } if((this.y - this.size) <= 0) { 
//         this.velY = -this.velY;
//         document.dispatchEvent(new CustomEvent('animMessage', {detail: {message: 'Touched top'}}))
//   }

//   this.x += this.velX;
//   this.y += this.velY;

// };

// let ball_c = new Ball(
//     100,
//     100,
//     random(-2,3),
//     random(0,4),
//     'yellow',
//     radius*0.1
//   );

// const loop = () => {
//     ctx.fillStyle='rgba(0,0,0,0.25)';
//     ctx.fillRect(0, 0, width, height);
//     ball_c.draw();
//     ball_c.update();
//     requestAnimationFrame(loop);
//   }

let leftArea = new Event('leftArea');

document.addEventListener('leftArea', () => {
    clearInterval(ballInterval);    
    controlState = 2;
    document.getElementById('reload-button').style.visibility = 'visible';
    document.getElementById('reload-button').style.display = "flex";
    document.getElementById('stop-button').style.visibility = "hidden";
});

localStorage.setItem('eventLog', JSON.stringify(new Array()));
	document.addEventListener("animMessage", (event) => {
		let messages = JSON.parse(localStorage.getItem('eventLog'));
		messages.push({time: (new Date()).toString(), message: event.detail.message});
		localStorage.setItem('eventLog', JSON.stringify(messages));
        document.getElementById('event-text').style.display = "flex";
        document.getElementById('event-text').innerHTML = `<p>Event: ${event.detail.message}</p>`;        
    })

const moveBall = (ball, width, height) => {
	if(ball.x + ball.elem.offsetWidth  >= width) {            
        document.dispatchEvent(leftArea);
        $ball.elem.style.display = "none";
		document.dispatchEvent(new CustomEvent('animMessage', {detail: {message: 'Left the area'}}))
    } if(ball.x < 0) {
        ball.velX = -(ball.velX);
		document.dispatchEvent(new CustomEvent('animMessage', {detail: {message: 'Touched left'}}))
 	} if(ball.y + ball.elem.offsetHeight + 5 >= height) {
		ball.velY = -(ball.velY)
		document.dispatchEvent(new CustomEvent('animMessage', {detail: {message: 'Touched bottom'}}))
	} if(ball.y < 0) {
		ball.velY = -(ball.velY)
		document.dispatchEvent(new CustomEvent('animMessage', {detail: {message: 'Touched top'}}))
    }
    
    ball.x += ball.velX;
	ball.y += ball.velY;
	ball.elem.style.left = `${ball.x}px`;
	ball.elem.style.top = `${ball.y}px`;
}

const playJsAnim = () => {
    document.dispatchEvent(new CustomEvent('animMessage', {detail: {message: 'Launched animation'}}))
    const width = document.getElementById('animation-area-div').offsetWidth;
    const height = document.getElementById('animation-area-div').offsetHeight;
    ballInterval = setInterval(() => {
        moveBall($ball, width, height);
    }, 10)
}

const stopJsAnim = () => {
    document.dispatchEvent(new CustomEvent('animMessage', {detail: {message: 'Stopped animation'}}))
    clearInterval(ballInterval);
}

const reloadJsAnim = () => {
    document.dispatchEvent(new CustomEvent('animMessage', {detail: {message: 'Reloaded animation'}}))
    $ball = {...$ball, x: 0, y: 0, velX: random(-1,2), velY: random(-1,2)};
    $ball.elem.style.top = '0px';
    $ball.elem.style.left = '0px';
}


const drawBall = (x, y) => {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI*2);
    ctx.fillStyle = "yellow";
    ctx.fill();
    ctx.closePath();
}

const startCanvasAnim = () => {
    document.dispatchEvent(new CustomEvent('animMessage', {detail: {message: 'Launched animation'}}))
    let x = 10;
    let y = 10;
    let dx = random(-1,3);
    let dy = random(-1,3);
    frame = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawBall(x, y);
        if(x + dx < radius) {
            dx = -dx;
		    document.dispatchEvent(new CustomEvent('animMessage', {detail: {message: 'Touched left'}}))
        }
        if(x + dx > canvas.width+radius) {
            document.dispatchEvent(leftArea);
		    document.dispatchEvent(new CustomEvent('animMessage', {detail: {message: 'Left the area'}}))
            stopCanvasAnim();           
        } if(y + dy > canvas.height-radius)  {   
            dy = -dy;
		    document.dispatchEvent(new CustomEvent('animMessage', {detail: {message: 'Touched bottom'}}))
        } if(y + dy < radius) {
            dy = -dy;
		    document.dispatchEvent(new CustomEvent('animMessage', {detail: {message: 'Touched top'}}))
        }
        x += dx;
        y += dy;
        requestAnimationFrame(frame);}
    frame();
}


const stopCanvasAnim = () => {
    document.dispatchEvent(new CustomEvent('animMessage', {detail: {message: 'Stopped animation'}}))
    frame = _ => {};
}


const reloadCanvasAnim = (square, width, height) => {
		document.dispatchEvent(new CustomEvent('animMessage', {detail: {message: 'Reloaded animation'}}))
		// square_c = new Square(10, width_c - 10, 0, width_c, height_c, ctx);
		// square_c.draw()	
	}


document.getElementById("close-button").addEventListener("click", () => {
    document.querySelector("#animation-work-container").style.display = "none";
    let logs = JSON.parse(localStorage.getItem('eventLog'));
    const logEl = document.querySelector('.box-2');
    let logbox = document.createElement('div');
    let ul = document.createElement('ul');
    
    logs.forEach(log => {
        let li = document.createElement("li");
        li.appendChild(document.createTextNode(log.time.split('n')[1].split('G')[0] + log.message));
        ul.appendChild(li);
    })
    logbox.appendChild(ul);
    logEl.append(logbox);
    });


let $ball = {
    elem: document.getElementById('Ball'),
    x: 0,
    y: 0,
    velX: random(-3, 3),
    velY: random(-3, 3)
};


document.getElementById('stop-button').addEventListener("click", () => {
    document.getElementById('stop-button').style.visibility = 'hidden';
    console.log(animType);
    if (animType === 1) {
        document.getElementById('play1').style.display = 'flex';
        stopJsAnim();
    } else if (animType === 2) {
        console.log('yes is 2');
        document.getElementById('play2').style.visibility = 'visible';
        stopCanvasAnim();
    }
})


document.getElementById("reload-button").addEventListener('click', () => {
    document.getElementById("reload-button").style.visibility = "hidden";
    if (animType === 1) {
        document.getElementById('Ball').style.display = "flex";
        document.getElementById('play1').style.display = "flex";
        reloadJsAnim();
    } else if (animType === 2) {
        document.getElementById('play2').style.visibility = "visible";
        reloadCanvasAnim();
    }
})


document.getElementById("play1").addEventListener('click', () => {
    animType = 1;
    document.getElementById("animation-area-div").style.display = "flex";
    document.getElementById("animation-area-canvas").style.display = "none";
    document.getElementById("Ball").style.display = "flex";
    document.getElementById('stop-button').style.visibility = "visible";
    document.getElementById("play1").style.display = "none";
    playJsAnim();
});


document.getElementById("play2").addEventListener('click', () => {
    animType = 2;
    document.getElementById("animation-area-div").style.display = "none";
    document.getElementById("animation-area-canvas").style.display = "flex";
    document.getElementById("Ball").style.display = "none";    
    document.getElementById('stop-button').style.visibility = "visible";
    document.getElementById("play2").style.visibility = "hidden";
    width_c = canvas.width = document.getElementById('animation-area-canvas').offsetWidth;
	height_c = canvas.height = document.getElementById('animation-area-canvas').offsetHeight;
    startCanvasAnim();       
});


// function loop() {
//     ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
//     ctx.fillRect(0, 0, width, height);
//     var ball = new Ball(
//         random(0,width),
//         random(0,height),
//         random(-7,7),
//         random(-7,7),
//         'rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) +')',
//         random(10,20)
//       );
//     ball.draw();
//     ball.update();
//     requestAnimationFrame(loop);
// }

// loop();

// var ctx = canvas.getContext("2d");
// var ballRadius = 2;
// var x = 0;
// var y = 0;
// var dx = 2;
// var dy = -2;

// function drawBall() {
//     ctx.beginPath();
//     ctx.arc(x, y, ballRadius, 0, Math.PI*2);
//     ctx.fillStyle = "yellow";
//     ctx.fill();
//     ctx.closePath();
// }

// function draw() {
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//     drawBall();
    
//     if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
//         dx = -dx;
//     }
//     if(y + dy > canvas.height-ballRadius || y + dy < ballRadius) {
//         dy = -dy;
//     }
    
//     x += dx;
//     y += dy;
// }

// setInterval(draw, 10);




// document.addEventListener('DOMContentLoaded', () => {
// 	let animType = 0;
// 	document.getElementById("play1").addEventListener("click", () => {
// 		openWork();
// 		document.getElementById("animation-area-div").style.display = "flex";
// 		document.getElementById("animation-area-canvas").style.display = "none";
// 		animType = 1;
//     });
    
// 	let width_c, height_c, square_c;
// 	// document.getElementById("play2").addEventListener("click", () => {
// 	// 	openWork();
// 	// 	document.getElementById("anim1").style.display = "none";
// 	// 	document.getElementById("anim2").style.display = "flex";
// 	// 	animType = 2;
// 	// 	width_c = $canvas.width = document.getElementById('anim2').offsetWidth;
// 	// 	height_c = $canvas.height = document.getElementById('anim2').offsetHeight;
// 	// 	square_c = new Square(10, width_c - 10, 0, width_c, height_c, ctx);
// 	// 	square_c.draw()
//     // });
    
// 	document.getElementById("close-button").addEventListener("click", () => {
// 		closeWork();
// 		let logs = JSON.parse(localStorage.getItem('eventLog'));
// 		const $logEl = document.getElementById('block6');
// 		$logEl.innerHTML = '';
// 		logs.map((log) => {
// 			$logEl.insertAdjacentHTML('beforeend', `
// 				<li>${log.timeStamp.split('(')[0]} -- ${log.message}</li>
// 			`)
// 		})
// 	})

// 	const $canvas = document.getElementById("animation-area-canvas");
// 	const ctx = $canvas.getContext('2d');
// 	const texture = new Image();
// 	texture.src = "./img/1-texture.png";


// 	// let $square = {
// 	// 	elem: document.getElementById('square'),
// 	// 	x: 0,
// 	// 	y: 0,
// 	// 	velX: random(-1, 3), 
// 	// 	velY: random(-1, 3) 
// 	// };
// 	// let controlState = 0; // 0 - stoped, 1 - playing, 2 - ready for reload
// 	// let squareInt;

// 	// document.getElementById('animation-controls').addEventListener("click", (event) => {
// 	// 	if(controlState === 0){
// 	// 		controlState = 1;
// 	// 		event.target.innerHTML = "&#x25A0;";
// 	// 		if(animType === 1) playJsAnim();
// 	// 		else if(animType === 2) playCanvasAnim(square_c, width_c, height_c);
// 	// 	} else if(controlState === 1) {
// 	// 		controlState = 0;
// 	// 		event.target.innerHTML = "&#9658;";
// 	// 		if(animType === 1) stopJsAnim();
// 	// 		else if(animType === 2) stopCanvasAnim();
// 	// 	} else if(controlState === 2) {
// 	// 		controlState = 0;
// 	// 		event.target.innerHTML = "&#9658;";
// 	// 		if(animType === 1) reloadJsAnim();
// 	// 		else if(animType === 2) reloadCanvasAnim(square_c, width_c, height_c);
// 	// 	}
// 	// })

// 	// functions for element based animation
// 	const playJsAnim = () => {
// 		document.dispatchEvent(new CustomEvent('animMessage', {detail: {message: 'Launched animation'}}))
// 		const width = document.getElementById('anim1').offsetWidth;
// 		const height = document.getElementById('anim1').offsetHeight;
// 		squareInt = setInterval(() => {
// 			moveSquare($square, width, height);
// 		}, 10)
// 	}

// 	const stopJsAnim = () => {
// 		document.dispatchEvent(new CustomEvent('animMessage', {detail: {message: 'Stopped animation'}}))
// 		clearInterval(squareInt);
// 	}

// 	const reloadJsAnim = () => {
// 		document.dispatchEvent(new CustomEvent('animMessage', {detail: {message: 'Reloaded animation'}}))
// 		$square = {...$square, x: 0, y: 0, velX: random(-1,2), velY: random(-1,2)};
// 		$square.elem.style.top = '0px';
// 		$square.elem.style.right = '0px';
// 	}

// 	// functions for canvas animation
// 	let frame;
// 	const playCanvasAnim = (square, width, height) => {
// 		document.dispatchEvent(new CustomEvent('animMessage', {detail: {message: 'Launched animation'}}))
// 		const pattern = ctx.createPattern(texture, 'repeat');
// 		frame = () => {
// 			ctx.fillStyle = pattern;
// 			ctx.fillRect(0, 0, width, height);
// 			square.draw();
// 			square.updatePosition();
// 			requestAnimationFrame(frame);
// 		}
// 		frame();
// 	}

// 	const stopCanvasAnim = () => {
// 		document.dispatchEvent(new CustomEvent('animMessage', {detail: {message: 'Stopped animation'}}))
// 		frame = _=>{};
// 	}

// 	const reloadCanvasAnim = (square, width, height) => {
// 		document.dispatchEvent(new CustomEvent('animMessage', {detail: {message: 'Reloaded animation'}}))
// 		square_c = new Square(10, width_c - 10, 0, width_c, height_c, ctx);
// 		square_c.draw()	
// 	}

// 	document.addEventListener('leftArea', () => {
// 		clearInterval(squareInt);
// 		frame = _=>{};
// 		controlState = 2;
// 		document.getElementById('mainControl').innerHTML = "&#8634;";
// 	})

// 	localStorage.setItem('eventLog', JSON.stringify(new Array()));
// 	document.addEventListener("animMessage", (event) => {
// 		document.getElementById("messages").innerHTML = event.detail.message;
// 		let messages = JSON.parse(localStorage.getItem('eventLog'));
// 		console.log(messages);
// 		messages.push({timeStamp: (new Date()).toString(), message: event.detail.message});
// 		localStorage.setItem('eventLog', JSON.stringify(messages));
// 	})
// })

// const openWork = () => {
// 	document.getElementById('work').style.display = "flex";
// 	document.dispatchEvent(new CustomEvent('animMessage', {detail: {message: 'Opened animation'}}))
// }

// const closeWork = () => {
// 	document.getElementById('work').style.display = "none";
// 	document.dispatchEvent(new CustomEvent('animMessage', {detail: {message: 'Closed animation'}}))
// }

// const random = (min, max) => {
// 	let num = Math.floor(Math.random()*(max-min+1))+min;
// 	return num === 0 ? 0.5 : num
// }

// let leftArea = new Event('leftArea');

// const moveSquare = (square, width, height) => {
// 	if(square.x + square.elem.offsetWidth >= width) {
// 		document.dispatchEvent(leftArea);
// 		document.dispatchEvent(new CustomEvent('animMessage', {detail: {message: 'Left the area'}}))
// 	}
// 	if(square.x < 0) {
// 		square.velX = -(square.velX)
// 		document.dispatchEvent(new CustomEvent('animMessage', {detail: {message: 'Touched right border'}}))
// 	}
// 	if(square.y + square.elem.offsetHeight + 5 >= height) {
// 		square.velY = -(square.velY)
// 		document.dispatchEvent(new CustomEvent('animMessage', {detail: {message: 'Touched bottom border'}}))
// 	}
// 	if(square.y < 0) {
// 		square.velY = -(square.velY)
// 		document.dispatchEvent(new CustomEvent('animMessage', {detail: {message: 'Touched top border'}}))
// 	}
// 	square.x += square.velX;
// 	square.y += square.velY;
// 	square.elem.style.right = `${square.x}px`;
// 	square.elem.style.top = `${square.y}px`;
// }

// class Ball {
// 	constructor(size, x, y, canvasWidth, canvasHeight, ctx){
// 		this.size = size;
// 		this.x = x;
// 		this.y = y;
// 		this.velX = random(-1, 3);
// 		this.velY = random(-1, 3);
// 		this.canvasHeight = canvasHeight;
// 		this.canvasWidth = canvasWidth;
// 		this.ctx = ctx;
// 	}

// 	updatePosition () {



// 		if(this.x + this.size <= 0) {
// 			document.dispatchEvent(leftArea);
// 			document.dispatchEvent(new CustomEvent('animMessage', {detail: {message: 'Left the area'}}))
// 		}
// 	    if(this.x + this.size > this.canvasWidth) {
// 	    	this.velX =- (this.velX);
// 	    	document.dispatchEvent(new CustomEvent('animMessage', {detail: {message: 'Touched right border'}}))
// 	    }
//         if(this.y + this.size >= this.canvasHeight) { 
//         	this.velY = -(this.velY);
//         	document.dispatchEvent(new CustomEvent('animMessage', {detail: {message: 'Touched bottom border'}}))
//         }
// 	    if(this.y < 0) { 
// 	    	this.velY = -(this.velY);
// 	    	document.dispatchEvent(new CustomEvent('animMessage', {detail: {message: 'Touched top border'}}))
// 	    }
// 	    this.x += this.velX;
// 	    this.y += this.velY;
// 	}

// 	draw () {
// 		this.ctx.fillStyle = "rgba(90, 243, 90, 1)";
// 		this.ctx.fillRect(this.x, this.y, this.size, this.size);
// 	}
