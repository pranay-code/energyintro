import L from 'leaflet';
import Chart from 'chart.js/auto';

export function render(container) {
    const style = document.createElement('style');
    style.textContent = `
    .dashboard-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
      width: 100%;
    }
    .map-box {
      height: 300px;
      border-radius: 12px;
      overflow: hidden;
      border: 1px solid #ccc;
    }
    .controls-box {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .input-row {
      display: flex;
      gap: 10px;
    }
    input {
      padding: 8px;
      border: 1px solid #ccc;
      border-radius: 4px;
      flex-grow: 1;
    }
    .chart-container {
      grid-column: 1 / -1;
      height: 300px;
      background: rgba(255,255,255,0.5);
      border-radius: 12px;
      padding: 10px;
    }
  `;
    container.appendChild(style);

    const content = document.createElement('div');
    content.innerHTML = `
    <div class="dashboard-grid">
      <div class="controls-box">
        <h3>Location Selection</h3>
        <div class="input-row">
          <button class="btn" id="btn-auto">📍 Auto Detect</button>
        </div>
        <div class="input-row">
          <input type="text" id="search-input" placeholder="City Name (e.g. Bhuj)">
          <button class="btn" id="btn-search">Search</button>
        </div>
        <div class="input-row">
          <input type="text" id="lat-input" placeholder="Lat">
          <input type="text" id="lon-input" placeholder="Lon">
          <button class="btn" id="btn-coords">Go</button>
        </div>
        <div id="location-info" style="margin-top:10px; font-size:0.9rem; color:#666;">
          Default: Kutch, Gujarat
        </div>
      </div>
      
      <div id="map" class="map-box"></div>
      
      <div class="chart-container">
        <canvas id="forecast-chart"></canvas>
      </div>
    </div>
  `;
    container.appendChild(content);

    // Default: Kutch
    let currentLat = 23.24;
    let currentLon = 69.66;
    let map, marker, chart;

    // Init Map
    setTimeout(() => {
        map = L.map('map').setView([currentLat, currentLon], 8);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap'
        }).addTo(map);
        marker = L.marker([currentLat, currentLon]).addTo(map);

        updateForecast(currentLat, currentLon);
    }, 100);

    // Handlers
    const updateLocation = (lat, lon, name) => {
        currentLat = lat;
        currentLon = lon;
        map.setView([lat, lon], 10);
        marker.setLatLng([lat, lon]);
        content.querySelector('#location-info').textContent = `Selected: ${name || 'Custom Coords'} (${lat.toFixed(2)}, ${lon.toFixed(2)})`;
        updateForecast(lat, lon);
    };

    content.querySelector('#btn-auto').addEventListener('click', () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(pos => {
                updateLocation(pos.coords.latitude, pos.coords.longitude, "Your Location");
            }, () => alert("Location access denied."));
        }
    });

    content.querySelector('#btn-search').addEventListener('click', async () => {
        const query = content.querySelector('#search-input').value;
        if (!query) return;

        try {
            const res = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${query}&count=1&language=en&format=json`);
            const data = await res.json();
            if (data.results && data.results.length > 0) {
                const loc = data.results[0];
                updateLocation(loc.latitude, loc.longitude, loc.name);
            } else {
                alert("Location not found");
            }
        } catch (e) {
            console.error(e);
        }
    });

    content.querySelector('#btn-coords').addEventListener('click', () => {
        const lat = parseFloat(content.querySelector('#lat-input').value);
        const lon = parseFloat(content.querySelector('#lon-input').value);
        if (!isNaN(lat) && !isNaN(lon)) {
            updateLocation(lat, lon, "Custom Coordinates");
        }
    });

    async function updateForecast(lat, lon) {
        try {
            // Fetch GHI and Wind Speed (120m)
            const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=shortwave_radiation,wind_speed_120m&forecast_days=1`;
            const res = await fetch(url);
            const data = await res.json();

            const labels = data.hourly.time.map(t => t.split('T')[1]);
            const ghi = data.hourly.shortwave_radiation;
            const wind = data.hourly.wind_speed_120m;

            if (chart) chart.destroy();

            const ctx = content.querySelector('#forecast-chart').getContext('2d');
            chart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [
                        {
                            label: 'GHI (W/m²)',
                            data: ghi,
                            borderColor: '#FF6D00', // Solar Orange
                            backgroundColor: 'rgba(255, 109, 0, 0.1)',
                            yAxisID: 'y',
                            fill: true
                        },
                        {
                            label: 'Wind Speed 120m (km/h)',
                            data: wind,
                            borderColor: '#00B0FF', // Neon Cyan
                            yAxisID: 'y1',
                            tension: 0.4
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    interaction: { mode: 'index', intersect: false },
                    plugins: {
                        title: { display: true, text: '24-Hour Resource Forecast' }
                    },
                    scales: {
                        y: {
                            type: 'linear',
                            display: true,
                            position: 'left',
                            title: { display: true, text: 'Solar Irradiance (W/m²)' }
                        },
                        y1: {
                            type: 'linear',
                            display: true,
                            position: 'right',
                            grid: { drawOnChartArea: false },
                            title: { display: true, text: 'Wind Speed (km/h)' }
                        }
                    }
                }
            });
        } catch (e) {
            console.error("Forecast Error", e);
        }
    }
}
