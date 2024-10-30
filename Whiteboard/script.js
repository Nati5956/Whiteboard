// script.js

const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 600;

let drawing = false;
let isErasing = false;
let thickness = 5; // Default thickness

// Slider to adjust thickness
const thicknessSlider = document.getElementById('thickness');
thicknessSlider.addEventListener('input', () => {
  thickness = thicknessSlider.value;
});

function startDrawing(e) {
  drawing = true;
  draw(e);
}

function stopDrawing() {
  drawing = false;
  ctx.beginPath();
}

function draw(e) {
  if (!drawing) return;

  ctx.lineWidth = thickness;
  ctx.lineCap = 'round';
  ctx.strokeStyle = isErasing ? '#FFFFFF' : '#000000';

  ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
}

// Pencil button
document.getElementById('pencil').addEventListener('click', () => {
  isErasing = false;
  canvas.style.cursor = 'crosshair';
  thicknessSlider.value = 5; // Reset thickness to a standard value for pencil
  thickness = thicknessSlider.value;
});

// Eraser button
document.getElementById('eraser').addEventListener('click', () => {
  isErasing = true;
  canvas.style.cursor = 'not-allowed';
});

// Clear button
document.getElementById('clear').addEventListener('click', () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mousemove', draw);
