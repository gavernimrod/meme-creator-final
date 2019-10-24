'use strict'


// Model
var gMeme = {
	selectedImgId: getImgId(),
	txts: [
		{
			id: getRandId(),
			line: 'Top Line',
			left: 0,
			top: 0,
			size: 40,
			width: 0,
			align: 'left',
			color: 'white',
			strokeColor: 'black',
			font: 'Impact'
		},
		{
			id: getRandId(),
			line: 'Bottom Line',
			left: 0,
			top: 0,
			size: 40,
			width: 0,
			align: 'left',
			color: 'white',
			strokeColor: 'black',
			font: 'Impact'
		}
	]
}

function getSelectedImgId(){
    return gMeme.selectedImgId
}

//This function gets and imageId from a URL param
function getImgId() {
	var url = window.location.href;
	var params = url.split('?');
	var id = params[1];
	return id;
}



function getAllObjs(type){
    return gMeme[type]
}

function addItem(type,newItem){
    gMeme[type].push(newItem)
}

function getFirstLine(){
    if (gMeme.txts[0]) {
        return gMeme.txts[0].line
    } else {
        return 'myMeme'
    }
}

function addNewText(){
    var newText = {
		id: getRandId(),
		line: 'Enter Text',
		left: 0,
		top: 0,
		size: 40,
		width: 240,
		align: 'left',
		color: 'white',
		strokeColor: 'black',
		font: 'Impact'
    }
    gMeme.txts.push(newText);
}

function updateTextWidth(lineIdx){
    var line =  gMeme.txts[lineIdx]
    gMeme.txts[lineIdx].width = getTextWidth(line)
}


//This function calculate the default position of top and bottom default lines
function setDefaultLinesPos() {
	var img = document.querySelector('#meme-img')
	var imgPos = img.getBoundingClientRect();
	var imgWidth = imgPos.width
	var imgHeight = imgPos.height
	var lineTop = gMeme.txts[0];
	var lineBot = gMeme.txts[1];
	lineTop.top = lineTop.size;
	lineBot.top = imgHeight - lineBot.size * 2;
	lineTop.width = getTextWidth(lineTop);
	lineBot.width = getTextWidth(lineBot);
	gMeme.txts[0].left = imgWidth / 2 - lineTop.width / 2;
	gMeme.txts[1].left = imgWidth / 2 - lineBot.width / 2;
}



function changeEditableText(itemId){
    gEditableTextId = itemId.id 
}


function updateItem(type,itemIdx,property,value) {
    gMeme[type][itemIdx][property] += value;
}


function deleteItem(type,itemIdx){
    gMeme[type].splice(itemIdx, 1)
}

function setItemValue(type,itemIdx,property,value) {
    gMeme[type][itemIdx][property] = value;
} 


//Service function
function getItemIdxByIdAndType(id, type) {
	return gMeme[type].findIndex(function (item) {
		return item.id === id
	})
}


//This service function to update the Top and Left of an element after it moved
function updateItemPos(element) {
	var imgPos = document.querySelector('#meme-img').getBoundingClientRect()
	var itemPos = element.getBoundingClientRect();
	var itemId = element.id
	var type = element.dataset.type;
	var itemIdx = getItemIdxByIdAndType(itemId, type)
	var itemModel = gMeme[type][itemIdx]
	itemModel.top = itemPos.top - imgPos.top;
	itemModel.left = itemPos.left - imgPos.left;
	if (type === 'txts') itemModel.width = getTextWidth(itemModel);
}

