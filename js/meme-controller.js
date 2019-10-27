"use strict";

//Model
var gImgId;
var gMemeImgSrc;
var gIsMemeReady;
var gEditableTextId;

//Init
function init() {
  gIsMemeReady = false;
  gImgId = getImgId();
  gMemeImgSrc = `img/${gImgId}.jpg`;
  gEditableTextId;
  renderImg();
  var initMeme = setTimeout(() => {
    setDefaultLinesPos();
    renderItems();
    clearTimeout(initMeme);
  }, 100);
}

// This function renders the chosen image, so we can calculate where to position the lines based on its size
function renderImg() {
  var strHtml = `<img class="img" style="z-index:-1"  id="meme-img" src="img/${gImgId}.jpg" alt="">`;
  document.querySelector(".meme-container").innerHTML = strHtml;
}

// This function calls for master functions renders all elements in the model to the main Meme container
function renderItems() {
  document.querySelector(".meme-container").innerHTML = "";
  var strHtml = renderLines();
  strHtml += `<img class="img" id="meme-img" src="img/${gImgId}.jpg" alt="">`;
  document.querySelector(".meme-container").innerHTML = strHtml;
}

function renderLines() {
  var lines = getAllObjs("txts");
  return lines.map(line => getLineStrHtml(line)).join("");
}

function getLineStrHtml(line) {
  var strHtml = `
			<input 
			 class="txt" 
			 data-type="txts"
			 data-id="${line.id}"
			 type="texts"
			 onClick="markEditable(${line.id}); closeAllControllers(); showTextControls(this); addBorder(this)"
             onmousedown="dragElement(this)"
             ontouchstart="dragElementMobile(this)"
             onchange="updateLineText(this)"
             id="${line.id}"
             value = ""
             placeholder = "${line.line}" 
			 style = "text-align:${line.align}; color:${line.color}; font-family: ${line.font}; 
			 		 width: ${line.width}px; font-size:${line.size}px; top:${line.top}px; left:${line.left}px"
             >
			 `;
  return strHtml;
}

function closeAllControllers() {
  var controllers = document.querySelectorAll(".controllers");
  controllers.forEach(function(controller) {
    controller.classList.add("hide");
  });
}

//This function get all items on DOM and remove their borders
function removeAllBorders() {
  var txts = document.querySelectorAll(".txt");
  txts.forEach(function(txt) {
    txt.classList.remove("border");
  });
}

function addBorder(that) {
  removeAllBorders();
  that.classList.add("border");
}

function onAddText() {
  addNewText();
  renderItems();
}

function showTextControls(element) {
  var strHtml = `
			<button class="btn-txt-ctrl" onmousedown="onChangeFontSize(1)" title="Increase font size"><i class="fas fa-plus"></i></button>
			<button class="btn-txt-ctrl" onmousedown="onChangeFontSize(-1)" title="Decrease font size"><i class="fas fa-minus"></i></button>
			<select class="btn-txt-ctrl" onchange="onChangeFontFamily(this.value)" title="Change font">
				<option value="Impact" style="font-family:Impact; font-size: 14px">Impact</option>
				<option value="Tahoma" style="font-family:Tahoma; font-size: 14px">Tahoma</option>
				<option value="Arial" style="font-family:Arial; font-size: 14px">Arial</option>
				<option value="zcoolq" style="font-family:zcoolq; font-size: 14px">zcoolq</option>
			</select>
			<button class="btn-txt-ctrl" value='center' onclick="onCenterTextOnImg()"title="Align center"><i class="fas fa-align-center"></i></button>
			<button class="btn-txt-ctrl" onclick="onDeleteItem(${element.dataset.id},'txts')" title="Delete"><i class="fas fa-trash" ></i></button>
			<div class="close-controls" data-modal="text-controllers" onclick="hideModal('.text-controllers'); removeAllBorders()" title="close"><i class="fas fa-times"></i></div>`;
  var txtPos = element.getBoundingClientRect();
  var elController = document.querySelector(".text-controllers");
  elController.innerHTML = strHtml;
  if (window.innerWidth > 680) {
    var style = `left: ${txtPos.left - 100}px; top: ${txtPos.top - 90}px`;
  } else {
    var elCanvasControllersPos = document
      .querySelector(".canvas-controllers")
      .getBoundingClientRect();
    var style = `left: ${window.innerWidth / 2 - 180}px; top: ${
      elCanvasControllersPos.top
    }px`;
  }
  elController.style.cssText = style;
  elController.classList.remove("hide");
}

function onDeleteItem(element, type) {
  var elementId = element.id + "";
  var itemIdx = getItemIdxByIdAndType(elementId, type);
  deleteItem(type, itemIdx);
  var modalClass = type === "txts" ? ".text-controllers" : "";
  hideModal(modalClass);
  renderItems();
}

function hideModal(modalClass) {
  document.querySelector(modalClass).classList.add("show");
}

///////////////////////////////////////
/////// Text Controls Functions ///////
///////////////////////////////////////

function onChangeFontSize(value) {
  var elId = `#${gEditableTextId}`;
  var text = document.querySelector(elId);
  var textIdx = getItemIdxByIdAndType(text.id, "txts");
  updateItem("txts", textIdx, "size", value);
  updateItem("txts", textIdx, "width", value * 4);
  renderItems();
}

function onCenterTextOnImg() {
  var imgPos = document.querySelector("#meme-img").getBoundingClientRect();
  var elId = `#${gEditableTextId}`;
  var text = document.querySelector(elId);
  var itemIdx = getItemIdxByIdAndType(text.id, "txts");
  var textPos = document.querySelector(elId).getBoundingClientRect();
  var newLeft = imgPos.width / 2 - textPos.width / 2;
  setItemValue("txts", itemIdx, "left", newLeft);
  renderItems();
}

function onChangeFontFamily(selectedFont) {
  var elId = `#${gEditableTextId}`;
  var text = document.querySelector(elId);
  var textIdx = getItemIdxByIdAndType(text.id, "txts");
  setItemValue("txts", textIdx, "font", selectedFont);
  renderItems();
}

function markEditable(itemId) {
  changeEditableText(itemId);
}

///////////////////////////////
//////// Core Functions ///////
///////////////////////////////

//This function uses a dummy canvas to calculate text measurement
function getTextWidth(textObj) {
  // if given, use cached canvas for better performance
  // else, create new canvas
  var canvas =
    getTextWidth.canvas ||
    (getTextWidth.canvas = document.createElement("canvas"));
  var ctx = canvas.getContext("2d");
  ctx.font = `${textObj.size}px ${textObj.font}`;
  var metrics = ctx.measureText(textObj.line);
  return metrics.width + 20;
}

//This function updates the model every time a line text has been changed
function updateLineText(line) {
  var type = line.dataset.type;
  var lineId = line.id;
  var lineTxt = line.value;
  var lineIdx = getItemIdxByIdAndType(lineId, type);
  setItemValue("txts", lineIdx, "line", lineTxt);
  updateTextWidth(lineIdx);
  renderItems();
}

// This function renders a canvas in the exact dimensions of the given DOM image, and strokes all given lines at their respective position
function generateMeme() {
  if (gIsMemeReady) {
    document.querySelector(".meme-container").classList.remove("hide");
    document.querySelector(".canvas-container").classList.add("hide");
    document.querySelector(".canvas-controllers").classList.add("invisible");
    document.querySelector(".add-text").classList.remove("hide");
    document.querySelector(".generateBtn").innerHTML =
      '<i class="fas fa-palette"></i><br/>Add Drawing';
    document.querySelector(".fb-share").classList.add("hide");
  } else {
    renderCanvas();
    drawImg();
    drawlines();
    document.querySelector(".meme-container").classList.add("hide");
    document.querySelector(".add-text").classList.add("hide");
    document.querySelector(".canvas-container").classList.remove("hide");
    document.querySelector(".canvas-controllers").classList.remove("invisible");
    document.querySelector(".fb-share").classList.remove("hide");
    document.querySelector(".generateBtn").innerHTML =
      '<i class="fas fa-edit"></i><br/>Edit Texts';
  }
  gIsMemeReady = !gIsMemeReady;
}

//This function handles the meme downloading process
function onDownloadImage(elLink) {
  if (!gCanvas) {
    generateMeme();
  }
  elLink.href = gCanvas.toDataURL();
  var firstLine = getFirstLine();
  var fileName = firstLine.replace(/[^a-zA-Z0-9]/, "").toLowerCase();
  elLink.download = `${fileName}.jpg`;
}

///////////////////////////////////
//////// FB Share Functions ///////
///////////////////////////////////

function uploadImg(elForm, ev) {
  ev.preventDefault();

  document.getElementById("imgData").value = document
    .querySelector("#canvas")
    .toDataURL("image/jpeg");

  // A function to be called if request succeeds
  function onSuccess(uploadedImgUrl) {
    uploadedImgUrl = encodeURIComponent(uploadedImgUrl);
    document.querySelector(".share-container").innerHTML = `
        <a class="w-inline-block flex center-all btn fb" href="https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}" title="Share on Facebook" target="_blank" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}'); return false;">
           Share to &nbsp;&nbsp;<i class="fab fa-facebook-f"></i>
		</a>`;
  }

  document.querySelector(".download").classList.add("hide");
  document.querySelector(".fb-share").classList.add("hide");
  document.querySelector(".share-container").classList.remove("hide");

  doUploadImg(elForm, onSuccess);
}

function doUploadImg(elForm, onSuccess) {
  var formData = new FormData(elForm);

  fetch("https://ca-upload.com/here/upload.php", {
    method: "POST",
    body: formData
  })
    .then(function(response) {
      return response.text();
    })
    .then(onSuccess)
    .catch(function(error) {
      console.error(error);
    });
}

// facebook api
(function(d, s, id) {
  var js,
    fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s);
  js.id = id;
  js.src =
    "https://connect.facebook.net/he_IL/sdk.js#xfbml=1&version=v3.0&appId=807866106076694&autoLogAppEvents=1";
  fjs.parentNode.insertBefore(js, fjs);
})(document, "script", "facebook-jssdk");
