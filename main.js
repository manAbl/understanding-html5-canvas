const $ = name => document.querySelector(name);

const canvas = $('canvas');
const c = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight; 

let mouseX;
let mouseY;

const canvasWidth = canvas.width;
const canvasHeight = canvas.height;

const maxRadius = 35;

canvas.onmousemove = e => {
  mouseX = e.clientX
  mouseY = e.clientY
};

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
});

function Circle(x, y, radius) {
  const randomNumber = Math.floor(Math.random() * 4)
  const randomTrueOrFalse = Math.floor(Math.random() * 2)

  this.x = x;
  this.y = y;
  this.radius = radius;
  this.color = colorArr[randomNumber];

  if (randomTrueOrFalse == 1) {
    this.xSpeed = -Math.random() * 1
    this.ySpeed = -Math.random() * 1
  } 
  else {
    this.xSpeed = Math.random() * 1
    this.ySpeed = Math.random() * 1
  }

  // As distance gets closer to 0, increase radius

  this.update = () => {
      this.x += this.xSpeed
      const xDistance = mouseX - this.x
      const yDistance = mouseY - this.y
      const originalRadius = radius
      this.y += this.ySpeed

      // Movement Functions
      if (
          this.x + this.radius > canvasWidth ||
          this.x - this.radius < 0
      ) {
          this.xSpeed = -this.xSpeed
      }
      if (
          this.y + this.radius > canvasHeight ||
          this.y - this.radius < 0
      ) {
          this.ySpeed = -this.ySpeed
      }

      // Radius Decrease Functions
      // When distance between circle center and mouse on horizontal axis is less than 50, increase radius until it is equal to 35
      if (
          xDistance < 50 &&
          xDistance > -50 &&
          this.radius < maxRadius &&
          yDistance < 50 &&
          yDistance > -50
      ) {
          this.radius += 2
      } else if (
          (xDistance >= 50 && originalRadius < this.radius) ||
          (xDistance <= -50 && originalRadius < this.radius) ||
          (yDistance >= 50 && originalRadius < this.radius) ||
          (yDistance <= -50 && originalRadius < this.radius)
      ) {
          this.radius -= 2
      }

      this.draw();
  }

  this.draw = () => {
      c.beginPath()
      c.arc(
          this.x,
          this.y,
          Math.abs(this.radius),
          0,
          Math.PI * 2
      )
      c.fillStyle = this.color
      c.fill()
  }
};

const colorArr = ['aqua', 'darkred', 'darkslateblue', 'darkyellow'];
const myCircle = new Circle(30, 80, 10);
let circleArr = [];

(function init() {
 for (let i = 0; i < 1200; i++) {
    const randomX = Math.random() * canvasWidth
    const randomY = Math.random() * canvasHeight
    const randomRadius = Math.random() * 5
    circleArr.push(
        new Circle(randomX, randomY, randomRadius)
    )
  } 
}());

(function updateAll() {
    c.clearRect(0, 0, canvasWidth, canvasHeight)
    myCircle.update();
  
    for (let i = 0; i < circleArr.length; i++) {
        circleArr[i].update();
    }
    window.requestAnimationFrame(updateAll);
}());
