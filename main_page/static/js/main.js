const CHART = document.getElementById('barchart')

let lineChart = new Chart(CHART, {
        type: 'bar',
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