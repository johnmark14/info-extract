const BARCHART = document.getElementById('barchart');
const LINECHART = document.getElementById('linechart');
const RADARCHART = document.getElementById('radarchart');

const BARCLASS = document.getElementById("bar-id");
const LINECLASS = document.getElementById("line-id");
const RADARCLASS = document.getElementById("radar-id");

const BAR = document.getElementById('bar');
const LINE = document.getElementById('line');
const RADAR = document.getElementById('radar');

BAR.onclick = () => {

    BARCLASS.style.display = 'block';
    LINECLASS.style.display = 'none';
    RADARCLASS.style.display = 'none;'

    let barChart = new Chart(BARCHART, {
        type: "bar",
        data: {
            labels: ["CD", "CA", "Donation", "Other"],
            datasets: [{
                label: '#urduja categories stat.',
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
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            }
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
                label: '#urduja categories stat.',
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
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "rgba(75, 192, 192, 1)",
                pointHoverBorderColor: "rgba(220, 220, 220, 1)",
                pointHoverBorderWidth: 2,
                pointRadius: 3,
                pointHitRadius: 10
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            }
        }
    });
}

BAR.click();




