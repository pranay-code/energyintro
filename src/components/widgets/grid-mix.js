import Chart from 'chart.js/auto';

export function render(container) {
    const canvas = document.createElement('canvas');
    container.appendChild(canvas);

    new Chart(canvas, {
        type: 'doughnut',
        data: {
            labels: ['Coal (Base Load)', 'Solar (Renewable)', 'Wind (Renewable)', 'Hydro (Peaking)', 'Nuclear (Clean)'],
            datasets: [{
                data: [50, 15, 10, 12, 2], // Approx percentages
                backgroundColor: [
                    '#424242', // Coal
                    '#FF9100', // Solar
                    '#00E5FF', // Wind
                    '#2979FF', // Hydro
                    '#00E676'  // Nuclear
                ],
                borderWidth: 0,
                hoverOffset: 10
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'right',
                    labels: { color: '#E0E0E0' }
                },
                tooltip: {
                    callbacks: {
                        afterLabel: (context) => {
                            const label = context.label;
                            if (label.includes('Coal')) return 'High Stability / High Emissions';
                            if (label.includes('Solar')) return 'Low Stability / Zero Emissions';
                            if (label.includes('Wind')) return 'Variable / Zero Emissions';
                            if (label.includes('Hydro')) return 'Fast Ramping / Zero Emissions';
                            return 'Base Load / Zero Emissions';
                        }
                    }
                }
            }
        }
    });
}
