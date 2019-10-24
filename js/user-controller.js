'use strict';

function onDownloadImage(elLink){
    elLink.href = gCanvas.toDataURL()
    elLink.download = 'my-img.jpg'
}

