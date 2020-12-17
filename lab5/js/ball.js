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

// // console.log(width_c);
// // console.log(height_c);

// Ball.prototype.update = function() {
//   if((this.x + this.size) >= width_c) { 
//     document.dispatchEvent(leftArea);
//     document.dispatchEvent(new CustomEvent('animMessage', {detail: {message: 'Left the area'}}))
//   }
//   if((this.x - this.size) <= 0) { 
//     this.velX = -this.velX;
//     document.dispatchEvent(new CustomEvent('animMessage', {detail: {message: 'Touched left'}}))
//   }
//   if((this.y + this.size) >= height) { 
//     this.velY = -this.velY;
//     document.dispatchEvent(new CustomEvent('animMessage', {detail: {message: 'Touched bottom'}}))
//   }
//   if((this.y - this.size) <= 0) { 
//     this.velY = -this.velY;
//     document.dispatchEvent(new CustomEvent('animMessage', {detail: {message: 'Touched top'}}))
//   }

//   this.x += this.velX;
//   this.y += this.velY;

// };