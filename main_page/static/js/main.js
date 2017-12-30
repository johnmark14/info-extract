// Global
let DOUGHCHART

// Radio button Bar graph
$('#bar').click( function() {

    $("#bar-id").css("display","block");
    $("#line-id").css("display", "none");
    $("#radar-id").css("display", "none");

    let barChart = new Chart($('#barchart'), {
        type: "bar",
        data: {
            labels: ["CD", "CA", "Donation", "Other"],
            datasets: [{
                data: [12, 19, 3, 5, 2, 3],
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
            animation: {
                animationScale: true,
                animationRotate:true
            },
            title: {
                display: true,
                text: 'Bar CHart'
            },
        }
    });
})

$('#line').click(function() {

    $("#line-id").css("display", "block");
    $("#bar-id").css("display","none");
    $("#radar-id").css("display", "none");

    let lineChart = new Chart($('#linechart'), {
        type: "line",
        data: {
            labels: ["CD", "CA", "Donation", "Other"],
            datasets: [{
                fill: true,
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: "rgba(75, 192, 192, 0.4)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderCapstyle: 'butt',
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
        }
    });
})

$('#radar').click(function() {
    window.alert('log')
})

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

// Classify button
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




// Trigger events to populate the canvas
$(document).ready(function() {
    // trigger bar graph
    $('#bar').click()

    // call function to trigger doughnut graph
    doughnutStat(5,10,15)

    // call function classify that if button is click this will execute
    classify()
})




