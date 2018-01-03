// Global
let DOUGHCHART
let MYCHART

//Category
let CD = 0, CA = 0, DONATION = 0, OTHER = 0

// charts configurations
let barConfig = {
    type: 'bar',
    data: {
        labels: ["CD", "CA", "Donation", "Other"],
        datasets: [{
        data: [5,10,90,10],
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
};

let lineConfig = {
    type: "line",
    data: {
        labels: ["CD", "CA", "Donation", "Other"],
        datasets: [{
            fill: true,
            data: [CD,CA,DONATION,OTHER],
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
            yAxes: [{
                display: true,
                ticks: {
                    beginAtZero:true
                }
            }]
        },
        responsive: true,
        animation: {
            animationScale: true
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
}

let radarConfig = {
    type: "radar",
    data: {
        labels: ["CD", "CA", "DONATION", "OTHER"],
        datasets: [{
            backgroundColor: "rgba(75, 192, 192, 0.4)",
            borderColor: "rgba(75, 192, 192, 1)",
            pointBackgroundColor: "rgba(75, 192, 192, 1)",
            data: [CD,CA,DONATION,OTHER]
        }],
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
}

//implementation version2
function changeChart(typ,d1,d2,d3,d4) {
    let ctx = $("#mychart")[0].getContext('2d')
    let temp

    if(MYCHART) {
        MYCHART.destroy()
    }

    if (typ == "bar") {
        temp = jQuery.extend(true, {}, barConfig)
    } else if (typ == "line") {
        temp = jQuery.extend(true, {}, lineConfig)
    } else if (typ == "radar"){
        temp = jQuery.extend(true, {}, radarConfig)
    } else {
        console.log("not a type")
        return
    }
    temp.type = typ
    temp.data.datasets[0].data[0] = d1
    temp.data.datasets[0].data[1] = d2
    temp.data.datasets[0].data[2] = d3
    temp.data.datasets[0].data[3] = d4
    MYCHART = new Chart(ctx, temp)

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
                text: 'Doughnut Chart'
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

// function for classify button
function classify() {
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
}

// function to fetch data from the database on load time
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
        changeChart("bar",CD,CA,DONATION,OTHER)

       // Set the category value
       $('#cd').text(CD)
       $('#ca').text(CA)
       $('#donation').text(DONATION)
       $('#other').text(OTHER)
    }
}

// function to update chart with new data
function updateChart(d1,d2,d3,d4) {

    MYCHART.data.datasets[0].data[0] = d1
    MYCHART.data.datasets[0].data[1] = d2
    MYCHART.data.datasets[0].data[2] = d3
    MYCHART.data.datasets[0].data[3] = d4
    MYCHART.update()

}

// function interval category fetcher
function getCategoryData() {
    setInterval (function() {
        $.ajax({
            method: "GET",
            url: window.location.href,
            success: handleFormSuccess
        })

        function handleFormSuccess(data, textStatus, jqXHR) {
            if (CD !== data['cd'] || CA !== data['ca'] || DONATION !== data['donation'] || OTHER !== data['other']){
                CD = data['cd']
                CA = data['ca']
                DONATION = data['donation']
                OTHER = data['other']

                // Set the category value
                $('#cd').text(CD)
                $('#ca').text(CA)
                $('#donation').text(DONATION)
                $('#other').text(OTHER)

                // trigger graph
                if($('#bar').is(':checked')) {
                    updateChart(CD,CA,DONATION,OTHER)
                }

                if ($('#line').is(':checked')) {
                    updateChart(CD,CA,DONATION,OTHER)
                }

                if($('#radar').is(':checked')) {
                    updateChart(CD,CA,DONATION,OTHER)
                }
            }
        }
    }, 20000)
}

// Radio button Bar graph
$('#bar').click( function() {
    changeChart("bar",CD,CA,DONATION,OTHER)
})

// Radio button Line Graph
$('#line').click(function() {
    changeChart("line",CD,CA,DONATION,OTHER)
})

// Radio button Radar Graph
$('#radar').click(function() {
    changeChart("radar",CD,CA,DONATION,OTHER)
})

// Trigger events to populate the canvas
$(document).ready(function() {

    // Fecth data from the database
    categoryFetcher()

    // call function to trigger doughnut graph
    doughnutStat(5,10,15)

    // call classify function
    classify()

    //call the click button
    $('#bar').click()

    // Datbase checker
    getCategoryData()
    
})




