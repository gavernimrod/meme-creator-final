'use strict';
var gImgSrc = '';
var gSlideIndex = 0;
var gToggleDisplay = true;


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
    let elAboutLink = document.querySelector('.about-link');
    if (elAboutLink.innerText === 'ABOUT ME') {
        elAboutLink.innerText = 'GALLERY';
    } else elAboutLink.innerText = 'ABOUT ME';
    elGallery.classList.toggle('hide');
    elAbout.classList.toggle('hide');
}

/// UPLOAD 

// function onHandleUpload() {
//     let str = prompt('Describe your meme in two words');
//     str = str.toLowerCase();
//     let keywords = str.split(' ');
//     const selectedFile = document.getElementById('add_meme').files[0];
//     const objectURL = window.URL.createObjectURL(selectedFile);
//     console.log(objectURL);
//     addMeme(objectURL, keywords);
//     createImages();
//     renderGallery();
// }