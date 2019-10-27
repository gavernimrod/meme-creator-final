'use strict';
var gImgSrc = '';
var gToggleDisplay = true;


function init(){
    createImages();
    renderGallery();
}

function renderGallery() {
    if (gToggleDisplay) {
        let elGallery = document.querySelector('.gallery-container');
        let strHtml = '';
        gImgs.map(function (img) {
            strHtml += `<a href="editor.html?${img.id}"><img class="my-slides"  src="${img.url}" alt="">
            <div class="img-details flex wrap">Keywords: ${img.keywords.join(', ')}</div></a>`;
        })
        elGallery.innerHTML=strHtml;
    }
}

function onToggleDisplay() {
    gToggleDisplay = !gToggleDisplay;
    renderGallery();
}

function onToggleInfo() {
    let elGallery = document.querySelector('.gallery-container');
    let elAbout = document.querySelector('.about-me');
    // let elAboutLink = document.querySelector('.about-link');
    // if (elAboutLink.innerText === 'ABOUT ME') {
    //     elAboutLink.innerText = 'GALLERY';
    // } else elAboutLink.innerText = 'ABOUT ME';
    elGallery.classList.toggle('hide');
    elAbout.classList.toggle('hide');
}
