import Chart from 'chart.js/auto';

export function render(container) {
    const canvas = document.createElement('canvas');
    container.appendChild(canvas);

    new Chart(canvas, {
        type: 'bar',
        data: {
            labels: ['Coal Input', 'Boiler Loss', 'Turbine Loss', 'Generator Loss', 'Parasitic Load', 'Net Electricity'],
            datasets: [{
                label: 'Energy Units',
                data: [100, -15, -45, -2, -3, 35],
                backgroundColor: [
                    '#E0E0E0', // Input
                    '#FF1744', // Loss
                    '#FF1744',
                    '#FF1744',
                    '#FF1744',
                    '#00E676'  // Output
                ],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        label: (context) => {
                            const val = context.raw;
                            return val > 0 ? `Remaining: ${val}%` : `Loss: ${Math.abs(val)}%`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: { color: 'rgba(255,255,255,0.1)' },
                    ticks: { color: '#A0A0A0' }
                },
                x: {
                    grid: { display: false },
                    ticks: { color: '#A0A0A0' }
                }
            }
        }
    });
}
