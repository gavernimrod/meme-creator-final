"use strict";
var gCanvas;
var gCtx;
var gIsDrawing = false;
var gIsErasing = false;
var gTool = "pencil";

function renderCanvas() {
  var elImg = document.querySelector("#meme-img");
  var imgWidth = elImg.clientWidth;
  var imgHeight = elImg.clientHeight;
  var strHtml = "";
  strHtml = `
    <canvas id="canvas" width="${imgWidth}" height="${imgHeight}" onmousedown="onMouseDown(event)" onmouseup="onMouseUp(event)" onmousemove="onMouseMovement(event)"></canvas>
    `;
  document.querySelector("#canvas-container").innerHTML = strHtml;
}

function drawlines() {
  var lines = gMeme.txts;
  lines.forEach(function(line) {
    drawStroked(line);
  });
}

function drawStroked({ line, size, color, strokeColor, font, left, top }) {
  gCtx.font = `${size}px ${font}`;
  gCtx.strokeStyle = strokeColor;
  gCtx.lineWidth = Math.floor(size / 10);
  gCtx.strokeText(line, left, top + size);
  gCtx.fillStyle = color;
  gCtx.fillText(line, left, top + size);
}

function drawImg() {
  let img = new Image();
  img.src = gMemeImgSrc;
  gCanvas = document.querySelector("#canvas");
  gCtx = gCanvas.getContext("2d");
  gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
}

////////////////////////////////
////// Painting Functions///////
////////////////////////////////

function onMouseMovement(ev) {
  var x = ev.offsetX;
  var y = ev.offsetY;
  if (gIsDrawing) {
    gCtx.lineTo(x, y);
    if (gIsErasing) erasePath(x, y);
    else if (gTool === "pencil") drawPencil();
    else if (gTool === "brush") drawBrush(x, y);
    else if (gTool === "rect") drawRect(x, y);
  } else return;
}

function drawPencil() {
  gCtx.stroke();
}

function erasePath(x, y) {
  gCtx.save();
  gCtx.strokeStyle = "#ffffff";
  gCtx.fillStyle = "#ffffff";
  gCtx.arc(x, y, 5, 0, 2 * Math.PI);
  gCtx.stroke();
  gCtx.closePath();
  gCtx.fill();
  gCtx.restore();
  gCtx.beginPath();
}

function drawBrush(x, y) {
  gCtx.save();
  gCtx.strokeStyle = gCtx.fillStyle;
  gCtx.arc(x, y, 10, 0, 2 * Math.PI);
  gCtx.stroke();
  gCtx.closePath();
  gCtx.fill();
  gCtx.beginPath();
  gCtx.restore();
}

function drawRect(x, y) {
  gCtx.rect(x - 5, y - 10, x + 5, y + 10);
  gCtx.stroke();
  gCtx.fill();
  gCtx.closePath();
  gCtx.beginPath();
}

function onMouseUp(ev) {
  ev.stopPropagation();
  gIsDrawing = false;
  gCtx.closePath();
}
function onMouseDown(ev) {
  ev.stopPropagation();
  var x = ev.offsetX;
  var y = ev.offsetY;
  gCtx.beginPath();
  gCtx.moveTo(x, y);
  gIsDrawing = true;
}

function onColorChange(color, property) {
  if (property === "fill") gCtx.fillStyle = color;
  else gCtx.strokeStyle = color;
}

function onCheckMousePos(ev) {
  let targetId = ev.target.id;
  if (targetId !== "canvas") {
    gIsDrawing = false;
    gCtx.closePath();
  }
}

function onChooseDrawTool(tool) {
  gTool = tool;
}
