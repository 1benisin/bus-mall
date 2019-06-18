'use strict';

var maxClicksAllowed = 25;
var clicksThisSession = 0;
var previousSetOfImages = [];

function ImageAnalytics(name, filepath) {
    this.name = name;
    this.filepath = filepath;
    this.displayed = 0;
    this.clicked = 0;
    ImageAnalytics.imageDatabase.push(this);
}
ImageAnalytics.imageDatabase = [];

//CHANGE FILE PATH
new ImageAnalytics('R2D2 Bag', 'images/bag.jpg');
new ImageAnalytics('Banana Slicer', 'images/banana.jpg');
new ImageAnalytics('Bathroom Screen', './images/bathroom.jpg');
new ImageAnalytics('Yellow Boots', './images/boots.jpg');
new ImageAnalytics('Breakfast Toaster', './images/breakfast.jpg');
new ImageAnalytics('Delicious Meatball Gum, Yum!', './images/bubblegum.jpg');
new ImageAnalytics('Gorgeous Red Chair', './images/chair.jpg');
new ImageAnalytics('Cthulhu Eats a Guy!', './images/cthulhu.jpg');
new ImageAnalytics('Duck Dog Muzzle', './images/dog-duck.jpg');
new ImageAnalytics('YUMMY dragon meat', './images/dragon.jpg');
new ImageAnalytics('Office Cutlery', './images/pen.jpg');
new ImageAnalytics('Doggie Housework Helper', './images/pet-sweep.jpg');
new ImageAnalytics('Pizza Slicer', './images/scissors.jpg');
new ImageAnalytics('Sleep With the Fishes', './images/shark.jpg');
new ImageAnalytics('Put Baby to WORK', './images/sweep.png');
new ImageAnalytics('Smells Worse Inside', './images/tauntaun.jpg');
new ImageAnalytics('You\'re a Monster if You Eat This', './images/unicorn.jpg');
new ImageAnalytics('Slither', './images/usb.gif');
new ImageAnalytics('Not Useless at ALL', './images/water-can.jpg');
new ImageAnalytics('Stylish', './images/wine-glass.jpg');


function setupListeners() {
    var imageContainer = document.getElementById('images');
    imageContainer.addEventListener('click', handleClick);
    imageContainer.addEventListener('click', screamAndShout);
}

function removeListeners() {
    var imageContainer = document.getElementById('images');
    imageContainer.removeEventListener('click', handleClick);
}


function screamAndShout() {
    console.log("OUCH");
}

function getRandomNumber() {
    return Math.floor(Math.random() * ImageAnalytics.imageDatabase.length);
}

function handleClick(event) {
    for (var i = 0; i < ImageAnalytics.imageDatabase.length; i++) {
        if (ImageAnalytics.imageDatabase[i].name === event.target.alt) {
            ImageAnalytics.imageDatabase[i].clicked++;
            clicksThisSession++;
            if (clicksThisSession === maxClicksAllowed) {
                removeListeners();
            }
            break;
        }
    }
    getRandomImages();
}

function getRandomImages() {

    // The list of image ids from the DOM
    var images = ['img1', 'img2', 'img3'];

    // Start with an empty set of images for this screen to compare against
    var currentSetOfImages = [];

    // Repeat this for each image that we are showing
    for (var i = 0; i < images.length; i++) {

        // Find it in the DOM
        var image = document.getElementById(images[i]);

        // False Flag
        var ok = false;

        // Keep trying to find a unique image to display
        while (ok === false) {

            // Get a random number between 0 and the number of images
            var randomNumber = getRandomNumber();

            // If it hsan't been previously showwn and its not on screen ...
            if (!previousSetOfImages.includes(randomNumber) && !currentSetOfImages.includes(randomNumber)) {

                // Update it's displayed count
                ImageAnalytics.imageDatabase[randomNumber].displayed++;

                // Render it
                image.src = ImageAnalytics.imageDatabase[randomNumber].filepath;
                image.alt = ImageAnalytics.imageDatabase[randomNumber].name;

                // Add it to my list of seen images
                currentSetOfImages.push(randomNumber);

                // Bug out
                ok = true;
            }

        }
    }

    previousSetOfImages = currentSetOfImages;

}

/// Create Images
// createImages(); //
setupListeners();
getRandomImages();