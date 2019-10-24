"use strict";

//This function handles drag & drop on desktop
function dragElement(elmnt) {
  var elImgPos = document.querySelector("#meme-img").getBoundingClientRect();
  var elPost = elmnt.getBoundingClientRect();
  console.log(elPost);
  var pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  elmnt.onmousedown = dragMouseDown;

  function dragMouseDown(e) {
    e = e || window.event;
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    if (
      e.clientX > elImgPos.right - 100 ||
      e.clientX < elImgPos.left + 100 ||
      e.clientY > elImgPos.bottom - 20 ||
      e.clientY < elImgPos.top + 20
    )
      return;
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = elmnt.offsetTop - pos2 + "px";
    elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
  }

  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
    updateItemPos(elmnt);
  }
}

//This function handles drag & drop on mobile devices
function dragElementMobile(elmnt) {
  var elImgPos = document.querySelector("#meme-img").getBoundingClientRect();

  var pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  elmnt.ontouchstart = dragMouseDown;

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();

    // get the mouse cursor position at startup:
    pos3 = e.touches[0].clientX;
    pos4 = e.touches[0].clientY;
    document.ontouchend = closeDragElement;
    // call a function whenever the cursor moves:
    document.ontouchmove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();

    if (
      e.clientX > elImgPos.right - 100 ||
      e.clientX < elImgPos.left + 100 ||
      e.clientY > elImgPos.bottom - 20 ||
      e.clientY < elImgPos.top + 20
    )
      return;

    // calculate the new cursor position:
    pos1 = pos3 - e.touches[0].clientX;
    pos2 = pos4 - e.touches[0].clientY;
    pos3 = e.touches[0].clientX;
    pos4 = e.touches[0].clientY;
    // set the element's new position:
    elmnt.style.top = elmnt.offsetTop - pos2 + "px";
    elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released://
    document.ontouchend = null;
    document.ontouchmove = null;
    updateItemPos(elmnt);
  }
}
