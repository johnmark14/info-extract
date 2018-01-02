// Global
let DOUGHCHART
let CD = 0, CA = 0, DONATION = 0, OTHER = 0

// function for Bar Graph
function barGraph(d1,d2,d3,d4) {

    $("#bar-id").css("display","block");
    $("#line-id").css("display", "none");
    $("#radar-id").css("display", "none");

    let barChart = new Chart($('#barchart'), {
        type: "bar",
        data: {
            labels: ["CD", "CA", "Donation", "Other"],
            datasets: [{
                data: [d1,d2,d3,d4],
                backgroundColor: [
                    '#F7474A',
                    '#FFB55E',
                    '#48BEBE',
                    '#4F535F',
                ],
                borderWidth: 1
            }]
        },
        options: {
            legend: {
                display: false,
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            },
            responsive: true,
            title: {
                display: true,
                text: 'Bar CHart'
            },
        }
    });
}

// function for Line Graph
function lineGraph(d1,d2,d3,d4) {

    $("#line-id").css("display", "block");
    $("#bar-id").css("display","none");
    $("#radar-id").css("display", "none");

    let lineChart = new Chart($('#linechart'), {
        type: "line",
        data: {
            labels: ["CD", "CA", "Donation", "Other"],
            datasets: [{
                fill: true,
                data: [d1,d2,d3,d4],
                backgroundColor: "rgba(75, 192, 192, 0.4)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderCapstyle: 'round',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: "rgba(75, 192, 192, 1)",
                pointBackgroundColor: "#fff",
                pointBorderWidth: 2,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "rgba(75, 192, 192, 1)",
                pointHoverBorderColor: "rgba(220, 220, 220, 1)",
                pointHoverBorderWidth: 2,
                pointRadius: 5,
                pointHitRadius: 15
            }]
        },
        options: {
            legend: {
                display: false,
            },
            scales: {
                xAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true
                    }
                }],
                yAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true
                    },
                    ticks: {
                        beginAtZero:true
                    }
                }]
            },
            responsive: true,
            animation: {
                animationScale: true,
                animationRotate:true
            },
            title: {
                display: true,
                text: 'Line CHart'
            },
            tooltips: {
                mode: 'nearest',
                intersect: true
            },
            hover: {
                mode: 'nearest',
                intersect: true
            }

        }
    });
}

// function for Radar Graph
function radarGraph(d1,d2,d3,d4) {
    $("#radar-id").css("display", "block");
    $("#line-id").css("display", "none");
    $("#bar-id").css("display","none");

    let radarChart = new Chart($('#radarchart'), {
        type: 'radar',
        data: {
            labels: ["CD", "CA", "DONATION", "OTHER"],
            datasets: [{
                backgroundColor: "rgba(75, 192, 192, 0.4)",
                borderColor: "rgba(75, 192, 192, 1)",
                pointBackgroundColor: "rgba(75, 192, 192, 1)",
                data: [d1,d2,d3,d4]
            }]
        },
        options: {
            legend: {
                display: false,
            },
            title: {
                display: true,
                text: 'Radar Chart'
            },
            scale: {
              ticks: {
                beginAtZero: true
              }
            }
        }
    })

}

// function for doughnut
function doughnutStat(featureVal,accuracyVal,probabilityVal) {

    // colors used in doughnut
    const red = "#F7474A", orange = "#FFB55E",  green = "#48BEBE"
    
    DOUGHCHART = new Chart($("#doughnut"), {
        type: 'doughnut',
        data: {
            labels: ['Features', 'Accuracy', 'Probability'],
            datasets: [{
                data: [featureVal, accuracyVal, probabilityVal],
                backgroundColor: [red,orange,green],
                label: 'Dataset 1'
            }],
        },
        options: {
            legend: {
                display: false,
            },
            responsive: true,
            animation: {
                animationScale: true,
                animationRotate:true
            },
            title: {
                display: true,
                text: 'Doughnut CHart'
            },
        }
    });

    // add styles to statistics 
    $('#feature').css({"border-left": "1.25em solid " + red, "padding-left":"10px"})
    $('#accuracy').css({"border-left": "1.25em solid " + orange, "padding-left":"10px"})
    $('#probability').css({"border-left": "1.25em solid " + green, "padding-left":"10px"})

    // change the value of statistics
    $('#feature-val').html(featureVal)
    $('#accuracy-val').html(accuracyVal)
    $('#probability-val').html(probabilityVal)

}

// function to fetch data from the database
function categoryFetcher() {

    $.ajax({
        method: "GET",
        url: window.location.href,
        success: handleFormSuccess
    })

    function handleFormSuccess(data, textStatus, jqXHR) {
        // Fetch the data from the database 
       CD = data['cd']
       CA = data['ca']
       DONATION = data['donation']
       OTHER = data['other']

       // trigger bar graph
       barGraph(CD,CA,DONATION,OTHER)

       // Set the category color code value
       $('#cd').text(CD)
       $('#ca').text(CA)
       $('#donation').text(DONATION)
       $('#other').text(OTHER)
    }

}

// Radio button Bar graph
$('#bar').click( function() {
    barGraph(CD, CA, DONATION, OTHER)
})

// Radio button Line Graph
$('#line').click(function() {
    lineGraph(CD, CA, DONATION, OTHER)
})

// Radio button Radar Graph
$('#radar').click(function() {
    radarGraph(CD, CA, DONATION, OTHER)
})

// Classify button
$('#btnsubmit').click(function() {
    let myForm = $('.ajax-classify')
    myForm.submit(function(event) {
        event.preventDefault()
        let formData = $(this).serialize()
        let thisURL = myForm.attr('data-url') || window.location.href // or set my own data-URL
        $.ajax({
            method: "POST",
            url: thisURL,
            data: formData,
            success: handleFormSuccess
        })
    })

    function handleFormSuccess(data, textStatus, jqXHR) {
        $("#lblcategory").text(data['result'])
        DOUGHCHART.destroy()
        doughnutStat(data['features'],data['accuracy'],data['prob_dist'])
        //myForm[0].reset();
    }
})



// Trigger events to populate the canvas
$(document).ready(function() {

    // Fetch the data from the datatabase
    categoryFetcher()

    // call function to trigger doughnut graph
    doughnutStat(5,10,15)
    
})




