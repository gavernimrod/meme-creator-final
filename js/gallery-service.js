'use strict';

var gNextId = 0
var gImgs = [];
var gKeyWords = [
['vladimir','putin'],
['trump','face'],
['poppins','dancing'],
['doggo','love'],
['toystory','everywhere'],
['success','kid'],
['kid','dog'],
['cat','laptop'],
['wonka','telling'],
['kid','sneaky'],
['aliens','history'],
['austin','powers','evil'],
['what would you do','haim'],
['happy','africa'],
['angry','trump','wall'],
['baby','suprised'],
['dog','flexing'],
['obama','happy'],
['dicaprio','glass','happy'],
['yelling','angry'],
['morpheus','matrix'],
['gondor','one simply'],
];

function init(){
    createImages();
    renderGallery();
}
function createImg(id) {
    return {
        id: id,
        url: `img/${id}.jpg`,
        keywords: gKeyWords[id]
    }
}
function createImages() {
    for (let i = 0; i < 22; i++) {
        let img = createImg(gNextId);
        img.keywords = gKeyWords[i];
        gNextId++;
        gImgs.push(img);
    }
}

function getKeyWords(){
    return gKeyWords;
}

function getImages(){
    return gImgs;
}

function addMeme(url,keyWords){
    var newImage = createImg(gNextId);
    newImage.url = url;
    gKeyWords.push(keyWords);
    newImage.keywords = keyWords; 
}


