const BARCHART = document.getElementById('barchart');
const LINECHART = document.getElementById('linechart');
const RADARCHART = document.getElementById('radarchart');
const DOUGHNUTCHART = document.getElementById('doughnut');

const BARCLASS = document.getElementById("bar-id");
const LINECLASS = document.getElementById("line-id");
const RADARCLASS = document.getElementById("radar-id");

const BAR = document.getElementById('bar');
const LINE = document.getElementById('line');
const RADAR = document.getElementById('radar');

const FEATURE = document.getElementById('feature');
const ACCURACY = document.getElementById('accuracy');
const PROBABILITY = document.getElementById('probability');

let category = document.getElementById('category');

//Category
const CD = "Casualty & Damage";
const CA = "Caution & Advice";
const DONATION = "Donation";
const OTHER = "Other";

BAR.onclick = () => {

    BARCLASS.style.display = 'block';
    LINECLASS.style.display = 'none';
    RADARCLASS.style.display = 'none';

    let barChart = new Chart(BARCHART, {
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
}

LINE.onclick = () => {

    LINECLASS.style.display = 'block'
    BARCLASS.style.display = 'none';
    RADARCLASS.style.display = 'none';

    let lineChart = new Chart(LINECHART, {
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
}

function doughnutStat(d1,d2,d3) {

    let randomScalingFactor = () => {
        return Math.round(Math.random() * 100);
    }
    
    let doughChart = new Chart(DOUGHNUTCHART, {
        type: 'doughnut',
        data: {
            labels: ['Features', 'Accuracy', 'Probability'],
            datasets: [{
                data: [
                    d1, d2, d3],
                backgroundColor: [
                    '#F7474A',
                    '#FFB55E',
                    '#48BEBE',
                ],
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

    FEATURE.style.borderLeft = "2.5em solid #F7474A";
    FEATURE.style.paddingLeft ="0.5em";
    ACCURACY.style.borderLeft = "2.5em solid #FFB55E";
    ACCURACY.style.paddingLeft = "0.5em";
    PROBABILITY.style.borderLeft = "2.5em solid #48BEBE";
    PROBABILITY.style.paddingLeft = "0.5em";

    category.innerHTML = CA;
}

BAR.click();
doughnutStat(5,0.83,0.63);






