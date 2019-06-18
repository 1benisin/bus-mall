'use strict';

var imageArr = [
    "img/bag.jpg",
    "img/banana.jpg",
    "img/bathroom.jpg",
    "img/boots.jpg",
    "img/breakfast.jpg",
    "img/bubblegum.jpg",
    "img/chair.jpg",
    "img/cthulhu.jpg",
    "img/dog-duck.jpg",
    "img/dragon.jpg",
    "img/pen.jpg",
    "img/pet-sweep.jpg",
    "img/scissors.jpg",
    "img/screen-shot.png",
    "img/shark.jpg",
    "img/sweep.png",
    "img/tauntaun.jpg",
    "img/unicorn.jpg",
    "img/usb.gif",
    "img/water-can.jpg",
    "img/wine-glass.jpg"
];

var slot1 = document.getElementById('slot1');
var slot2 = document.getElementById('slot2');
var slot3 = document.getElementById('slot3');

var slotsArr = [slot1, slot2, slot3];
var unusedArr = new Array(imageArr.length);
var votesArr = new Array(imageArr.length).fill(0);
var loadedArr = new Array(3);




function setup() {
    fillUnusedArray();
    slot1.addEventListener('click', onImageClick);
    slot2.addEventListener('click', onImageClick);
    slot3.addEventListener('click', onImageClick);
    slot1.src = imageArr[3];
    slot2.src = imageArr[getRandomFromArray[imageArr]];
    slot3.src = getRandomFromArray[imageArr];
}

function addImage(slot) {

}


function fillUnusedArray() {
    for (var i = 0; i < unusedArr.length; i++) {
        unusedArr[i] = i;
    }
}

function getRandomFromArray(arr) {
    return (Math.floor(Math.random() * arr.length));
}

function onImageClick() {

    addImage();


}





setup();

