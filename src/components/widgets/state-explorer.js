import Chart from 'chart.js/auto';

export function render(container) {
    const canvas = document.createElement('canvas');
    container.appendChild(canvas);

    const controls = document.createElement('div');
    controls.style.marginTop = '20px';
    controls.innerHTML = `
    <select id="state-select" style="padding: 10px; background: #333; color: #fff; border: 1px solid #555; border-radius: 4px;">
      <option value="RJ">Rajasthan</option>
      <option value="TN">Tamil Nadu</option>
      <option value="MH">Maharashtra</option>
      <option value="KA">Karnataka</option>
      <option value="UP">Uttar Pradesh</option>
    </select>
  `;
    container.appendChild(controls);

    const stateData = {
        RJ: { thermal: 8, renewable: 18, name: 'Rajasthan' }, // Solar Hub
        TN: { thermal: 10, renewable: 16, name: 'Tamil Nadu' }, // Wind Hub
        MH: { thermal: 25, renewable: 10, name: 'Maharashtra' }, // Industrial
        KA: { thermal: 10, renewable: 15, name: 'Karnataka' }, // Balanced
        UP: { thermal: 20, renewable: 4, name: 'Uttar Pradesh' } // Thermal heavy
    };

    const chart = new Chart(canvas, {
        type: 'bar',
        data: {
            labels: ['Thermal (GW)', 'Renewable (GW)'],
            datasets: [{
                label: 'Installed Capacity',
                data: [8, 18],
                backgroundColor: ['#424242', '#00E676']
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: { display: true, text: 'Rajasthan Capacity Mix', color: '#E0E0E0' },
                legend: { display: false }
            },
            scales: {
                y: { beginAtZero: true, ticks: { color: '#A0A0A0' } },
                x: { ticks: { color: '#A0A0A0' } }
            }
        }
    });

    controls.querySelector('#state-select').addEventListener('change', (e) => {
        const val = e.target.value;
        const data = stateData[val];

        chart.data.datasets[0].data = [data.thermal, data.renewable];
        chart.options.plugins.title.text = `${data.name} Capacity Mix`;
        chart.update();
    });
}
