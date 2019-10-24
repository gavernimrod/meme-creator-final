'use strict'

function getRandId(){
    var possible = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    var randId = ''
    for (let i=0; i<6; i++){
        randId+=possible.charAt(getRandomInt(0,possible.length))
    }
    return randId;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function saveToLocalStorage(key, value) {
    value = JSON.stringify(value);
    localStorage.setItem(key, value);
}

function loadFromLocalStorage(key) {
    let val = localStorage.getItem(key);
    val = JSON.parse(val);
    return val;
}


function getRandomColor() {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}