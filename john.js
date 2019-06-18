'use strict';









var ctx = document.getElementById('placemat').getContext('2d');

var allTheData = [
    {
        name: "John",
        clicks: 17,
        views: 100
    },
    {
        name: "Cat",
        clicks: 21,
        views: 90,
    },
    {
        name: "Zach",
        clicks: 10,
        views: 37
    },
    {
        name: "Allie",
        clicks: 14,
        views: 76
    }
]


function doTheChartThing() {
    var labels = []; // ["John", "Cat", "Zach", "Allie"]
    var voteData = []; // [17, 13, 44, 16]
    var colors = []; // ['#880088', '#880088', ... ]

    for (var i = 0; i < allTheData.length; i++) {
        allTheData[i].pct = Math.round((allTheData[i].clicks / allTheData[i].views) * 100);
    }

    allTheData.sort(function (a, b) {
        return b.pct - a.pct;
    });

    for (var i = 0; i < allTheData.length; i++) {
        labels.push(allTheData[i].name);
        voteData.push(allTheData[i].pct);
        var randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
        colors.push(randomColor);
    }


    var myChart = new Chart(ctx, {
        type: 'horizontalBar',
        data: {
            labels: labels,
            datasets: [
                {
                    label: "Popularity based on % of clicks",
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

doTheChartThing();