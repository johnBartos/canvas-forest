const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');
const width = canvas.width = window.innerWidth * 2;
const height = canvas.height = window.innerHeight * 2;

const craziness = 1

const generateDistanceSeed = depth =>  (seed * (Math.random() * (depth / 2)) * craziness);
const generateSeed = () => (Math.random() * 40) + 10;


function draw(startX, startY) {
  const iterations = Math.round(Math.random() * 4) + 2;
  const trunkHeight = seed * 2;
  const moundRadius = trunkHeight / 2;

  context.beginPath();
  context.moveTo(startX, startY)
  context.lineTo(startX, startY - trunkHeight);
  context.strokeStyle = 'black';
  context.stroke();

  context.moveTo(startX, startY);  
  context.beginPath();
  context.arc(startX, startY + moundRadius, moundRadius, 1.25 * Math.PI, 1.75 * Math.PI, false);
  context.stroke();

  drawTree(startX, startY - trunkHeight, iterations);
};

function drawBranch(startX, startY, endX, endY, color) {
  context.beginPath();  
  context.moveTo(startX, startY);
  context.lineTo(endX, endY);
  context.strokeStyle = color;
  context.stroke();
}

function drawCurvyBranch(startX, startY, endX, endY, color) {
  context.beginPath();  
  context.moveTo(startX, startY);
  context.bezierCurveTo(startX + Math.random(), startY + Math.random(), endX - Math.random(), endY * Math.random(), endX, endY);
  context.strokeStyle = color;
  context.stroke();
}


function drawTree(startX, startY, depth) {
  if (depth < 1) {
    return;
  }

  const left = startX - generateDistanceSeed(depth);
  const right = startX + generateDistanceSeed(depth);
  const up = startY - generateDistanceSeed(depth);
  let color = depth === 1 ? 'green' : 'brown';

  drawBranch(startX, startY, right, up, color);
  drawBranch(startX, startY, left, up, color);
  drawTree(left, up, depth - 1);
  drawTree(right, up, depth - 1);
}


let seed = generateSeed();
(() => {
  for (let i = 0; i < 100; i += 1) {
    draw(Math.random() * width, Math.random() * height);
    seed = generateSeed();
  }
})();
