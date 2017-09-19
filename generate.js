const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');
const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;
const generateDistanceSeed = depth =>  seed * (Math.random() * (depth / 3));
const generateSeed = () => (Math.random() * 5) + 50;
const colors = ['green', 'orange', 'yellow', 'red'];

context.lineCap = 'round';

function draw(startX, startY) {
  const iterations = Math.round((Math.random() * 2)) + 5;
  const trunkHeight = (seed * 2) + 20;
  const moundRadius = trunkHeight / 2;

  context.beginPath();
  context.moveTo(startX, startY)
  context.lineTo(startX, startY - trunkHeight);
  context.lineWidth = iterations + 1;
  context.strokeStyle = 'sienna';
  context.stroke();

  drawTree(startX, startY - trunkHeight, iterations);
};

function drawBranch(startX, startY, endX, endY, color, thickness) {
  context.beginPath();  
  context.moveTo(startX, startY);
  context.lineTo(endX, endY);
  context.lineWidth = thickness;  
  context.strokeStyle = color;
  context.stroke();
}


function drawTree(startX, startY, depth) {
  if (depth < 1) {
    return;
  }

  let color = 'sienna';
  if (depth === 1) {
    for (let i = 0; i < 5; i += 1) {
      color = colors[Math.round(Math.random() * colors.length)];
      drawBranch(startX, startY, startX + generateDistanceSeed(depth), startY + generateDistanceSeed(depth), color);
    }
  }

  const drawRandomBranch = () => {
    const direction = Math.random() > 0.5 ? 1 : -1;
    const endX = startX + (direction * generateDistanceSeed(depth));
    const endY = startY - generateDistanceSeed(depth);

    drawBranch(startX, startY, endX, endY, color, depth);
    drawTree(endX, endY, depth - 1);    
  }

  for (let i = 0; i < 4; i += 1) {
    drawRandomBranch();
  }
}


let seed = generateSeed();
(() => {
  draw(width / 2, height / 1.5);
})();
