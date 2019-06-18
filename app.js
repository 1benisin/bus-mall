'use strict';

var imageArray = [
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
    "img/shark.jpg",
    "img/sweep.png",
    "img/tauntaun.jpg",
    "img/unicorn.jpg",
    "img/usb.gif",
    "img/water-can.jpg",
    "img/wine-glass.jpg"
];
var totalClicks = 0;
var maxClicks = 25;
var previousSetOfImages = [];
var chartContext = document.getElementById('chart').getContext('2d');



function Product(filepath) {
    this.filepath = filepath;
    this.displayed = 0;
    this.clicks = 0;
    Product.all.push(this);
}
Product.all = [];


function setup() {
    // create all products
    imageArray.forEach(element => {
        new Product(element);
    });
    //setup listeners
    setupListener()
}

function setupListener() {
    var container = document.getElementById('image-container');
    container.addEventListener('click', handleClick);
}

// TODO refactor code
function removeListener() {
    var container = document.getElementById('image-container');
    container.removeEventListener('click', handleClick);
}


function loadRandomImages() {

    var containers = ['container1', 'container2', 'container3'];
    var currentSetOfImages = [];

    // for all 3 containers
    for (var i = 0; i < containers.length; i++) {
        var image = document.getElementById(containers[i]);

        // Keep trying to find a unique image to display
        var exit = false;
        while (exit === false) {
            var ranProductIndex = getRandProductIndex();

            // If it hsan't been previously shown and its not on screen ...
            if (!previousSetOfImages.includes(ranProductIndex) && !currentSetOfImages.includes(ranProductIndex)) {

                Product.all[ranProductIndex].displayed++;

                // Render it
                image.src = Product.all[ranProductIndex].filepath;
                image.alt = Product.all[ranProductIndex].filepath;

                currentSetOfImages.push(ranProductIndex);
                exit = true;
            }
        }
    }

    previousSetOfImages = currentSetOfImages;
}


function getRandProductIndex() {
    return Math.floor(Math.random() * Product.all.length);
}


function handleClick(event) {
    for (var i = 0; i < Product.all.length; i++) {
        if (Product.all[i].filepath === event.target.alt) {
            Product.all[i].clicks++;
            totalClicks++;
            if (totalClicks >= maxClicks) {
                removeListener();
                triggerResults();
            }
            break;
        }
    }
    loadRandomImages();
}



function triggerResults() {
    console.log('Trigger Results');
    renderChart();
}

function renderChart() {
    console.log('renderChart called');

    var labels = [];
    var voteData = [];
    var colors = [];

    for (var i = 0; i < Product.all.length; i++) {
        Product.all[i].percentage = Math.round(Product.all[i].clicks / Product.all[i].displayed * 100);
    }

    Product.all.sort(function (a, b) {
        return b.percentage - a.percentage;
    });

    for (var j = 0; j < Product.all.length; j++) {
        labels.push(Product.all[j].filepath);
        voteData.push(Product.all[j].percentage);
        var randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
        colors.push(randomColor);
    }

    console.log(labels);
    console.log(voteData);
    console.log(colors);

    var myChart = new Chart(chartContext, {
        type: 'horizontalBar',
        data: {
            labels: labels,
            datasets: [
                {
                    label: "Products Clicked by Percentage",
                    data: voteData,
                    backgroundColor: colors
                }
            ]
        },
        options: {
            responsive: false,
            maintainAspectRatio: true,
            scales: {
                yAxes: [
                    {
                        ticks: {
                            beginAtZero: true
                        }
                    }
                ]
            }
        }
    });

}


setup();
loadRandomImages();
