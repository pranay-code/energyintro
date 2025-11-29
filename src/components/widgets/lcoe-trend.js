import Chart from 'chart.js/auto';

export function render(container) {
    // Create a wrapper for the chart to control height/width
    const chartWrapper = document.createElement('div');
    chartWrapper.style.position = 'relative';
    chartWrapper.style.width = '100%';
    chartWrapper.style.height = '300px'; // Fixed height for visibility
    container.appendChild(chartWrapper);

    const canvas = document.createElement('canvas');
    chartWrapper.appendChild(canvas);

    new Chart(canvas, {
        type: 'line',
        data: {
            labels: ['2010', '2012', '2014', '2016', '2018', '2020', '2022', '2024'],
            datasets: [
                {
                    label: 'Solar PV ($/MWh)',
                    data: [350, 220, 140, 80, 55, 40, 35, 30],
                    borderColor: '#FF9100',
                    backgroundColor: 'rgba(255, 145, 0, 0.1)',
                    tension: 0.4,
                    fill: true
                },
                {
                    label: 'Coal ($/MWh)',
                    data: [60, 62, 65, 63, 68, 70, 90, 100],
                    borderColor: '#424242',
                    borderDash: [5, 5],
                    tension: 0.4
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false, // Important for responsive height
            plugins: {
                title: {
                    display: true,
                    text: 'Levelized Cost of Energy (LCOE)',
                    color: '#E0E0E0'
                },
                tooltip: {
                    mode: 'index',
                    intersect: false
                }
            },
            scales: {
                y: {
                    grid: { color: 'rgba(255,255,255,0.1)' },
                    ticks: { color: '#A0A0A0' },
                    title: { display: true, text: 'USD / MWh', color: '#A0A0A0' }
                },
                x: {
                    grid: { display: false },
                    ticks: { color: '#A0A0A0' }
                }
            }
        }
    });
}
