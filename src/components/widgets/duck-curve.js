import Chart from 'chart.js/auto';

export function render(container) {
    const style = document.createElement('style');
    style.textContent = `
    .controls {
      width: 80%;
      margin: 20px auto;
      text-align: center;
    }
    input[type=range] {
      width: 100%;
      accent-color: var(--solar-orange);
    }
  `;
    container.appendChild(style);

    const chartWrapper = document.createElement('div');
    chartWrapper.style.position = 'relative';
    chartWrapper.style.width = '100%';
    chartWrapper.style.height = '300px';
    container.appendChild(chartWrapper);

    const canvas = document.createElement('canvas');
    chartWrapper.appendChild(canvas);

    const controls = document.createElement('div');
    controls.className = 'controls';
    controls.innerHTML = `
    <label>Solar Penetration: <span id="solar-val">0</span>%</label>
    <input type="range" id="solar-slider" min="0" max="50" value="0">
  `;
    container.appendChild(controls);

    // Base Demand Curve (0-24h)
    const hours = Array.from({ length: 24 }, (_, i) => i);
    const baseDemand = [
        60, 58, 55, 53, 55, 60, 70, 80, 85, 88, 90, 92,
        92, 90, 88, 85, 85, 90, 95, 98, 95, 85, 75, 65
    ];

    // Solar Profile (Bell curve peaking at 12-13h)
    const solarProfile = hours.map(h => {
        if (h < 6 || h > 18) return 0;
        // Simple parabola
        return Math.sin((h - 6) * Math.PI / 12);
    });

    const chart = new Chart(canvas, {
        type: 'line',
        data: {
            labels: hours.map(h => `${h}:00`),
            datasets: [
                {
                    label: 'Total Demand',
                    data: baseDemand,
                    borderColor: '#A0A0A0',
                    borderDash: [5, 5],
                    fill: false
                },
                {
                    label: 'Net Load (Demand - Solar)',
                    data: [...baseDemand], // Initially same
                    borderColor: '#FF9100',
                    backgroundColor: 'rgba(255, 145, 0, 0.2)',
                    fill: true,
                    tension: 0.4
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 120,
                    title: { display: true, text: 'GW' }
                }
            }
        }
    });

    const slider = controls.querySelector('#solar-slider');
    const valDisplay = controls.querySelector('#solar-val');

    slider.addEventListener('input', (e) => {
        const penetration = parseInt(e.target.value);
        valDisplay.textContent = penetration;

        // Calculate Net Load
        // Max solar capacity = penetration % of Peak Demand (~100)
        const maxSolar = penetration;

        const newNetLoad = baseDemand.map((d, i) => {
            return d - (solarProfile[i] * maxSolar);
        });

        chart.data.datasets[1].data = newNetLoad;
        chart.update();
    });
}
