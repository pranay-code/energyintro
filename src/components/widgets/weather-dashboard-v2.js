import L from 'leaflet';
import Chart from 'chart.js/auto';

// Fix Leaflet Icon issue in bundlers
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

export function render(container) {
  try {
    const style = document.createElement('style');
    style.textContent = `
    .dashboard-grid {
      display: flex;
      flex-direction: column;
      gap: 20px;
      width: 100%;
    }
    
    .controls-box {
      display: flex;
      flex-wrap: wrap;
      gap: 15px;
      align-items: center;
      background: rgba(255,255,255,0.8);
      padding: 15px;
      border-radius: 12px;
      border: 1px solid rgba(0,0,0,0.05);
    }

    .input-row {
      display: flex;
      gap: 10px;
      align-items: center;
      flex-grow: 1;
    }

    .map-box {
      width: 100%;
      height: 400px; /* Increased height */
      border-radius: 12px;
      overflow: hidden;
      border: 1px solid #ccc;
      z-index: 1;
      box-shadow: 0 4px 10px rgba(0,0,0,0.05);
    }

    .chart-container {
      width: 100%;
      height: 400px; /* Increased height */
      background: rgba(255,255,255,0.8);
      border-radius: 12px;
      padding: 15px;
      box-shadow: 0 4px 10px rgba(0,0,0,0.05);
    }
    
    input, select {
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 6px;
      flex-grow: 1;
    }

    @media (max-width: 768px) {
      .controls-box {
        flex-direction: column;
        align-items: stretch;
      }
      .map-box, .chart-container {
        height: 300px;
      }
    }
  `;
    container.appendChild(style);

    const content = document.createElement('div');
    content.innerHTML = `
    <div class="dashboard-grid">
      <div class="controls-box">
        <h3>Location & Duration</h3>
        <div class="input-row">
          <button class="btn" id="btn-auto">📍 Auto Detect</button>
        </div>
        <div class="input-row">
          <input type="text" id="search-input" placeholder="City Name (e.g. Bhuj)">
          <button class="btn" id="btn-search">Search</button>
        </div>
        <div class="input-row">
          <label for="days-select" style="font-size: 0.9rem; color: #555;">Forecast Days:</label>
          <select id="days-select">
            <option value="1">1 Day</option>
            <option value="2">2 Days</option>
            <option value="3">3 Days</option>
            <option value="5">5 Days</option>
            <option value="7">7 Days</option>
          </select>
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
    let currentDays = 1;
    let map, marker, chart;

    // Init Map
    setTimeout(() => {
      try {
        if (map) map.remove(); // Cleanup if re-rendering
        map = L.map('map').setView([currentLat, currentLon], 8);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap'
        }).addTo(map);
        marker = L.marker([currentLat, currentLon]).addTo(map);

        updateForecast(currentLat, currentLon, currentDays);
      } catch (err) {
        console.error("Map Init Error:", err);
        content.querySelector('#map').innerHTML = `<p style="color:red; padding:20px;">Map Error: ${err.message}</p>`;
      }
    }, 500); // Increased timeout to ensure DOM is ready

    // Handlers
    const updateLocation = (lat, lon, name) => {
      currentLat = lat;
      currentLon = lon;
      if (map) {
        map.setView([lat, lon], 10);
        if (marker) marker.setLatLng([lat, lon]);
      }
      content.querySelector('#location-info').textContent = `Selected: ${name || 'Custom Coords'} (${lat.toFixed(2)}, ${lon.toFixed(2)})`;
      updateForecast(lat, lon, currentDays);
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
        alert("Search failed");
      }
    });

    content.querySelector('#days-select').addEventListener('change', (e) => {
      currentDays = parseInt(e.target.value);
      updateForecast(currentLat, currentLon, currentDays);
    });

    async function updateForecast(lat, lon, days) {
      try {
        // Fetch GHI and Wind Speed (120m)
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=shortwave_radiation,wind_speed_120m&forecast_days=${days}`;
        const res = await fetch(url);
        const data = await res.json();

        if (!data.hourly) throw new Error("No data");

        // Format labels based on duration
        const labels = data.hourly.time.map(t => {
          const date = new Date(t);
          if (days > 2) {
            return `${date.getDate()}/${date.getMonth() + 1} ${date.getHours()}:00`;
          }
          return t.split('T')[1];
        });

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
                fill: true,
                pointRadius: days > 2 ? 0 : 3 // Hide points for longer durations for cleaner look
              },
              {
                label: 'Wind Speed 120m (km/h)',
                data: wind,
                borderColor: '#00B0FF', // Neon Cyan
                yAxisID: 'y1',
                tension: 0.4,
                pointRadius: days > 2 ? 0 : 3
              }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: { mode: 'index', intersect: false },
            plugins: {
              title: { display: true, text: `${days * 24}-Hour Resource Forecast` }
            },
            scales: {
              x: {
                ticks: {
                  maxTicksLimit: days > 2 ? 10 : 24 // Limit x-axis labels for longer durations
                }
              },
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
  } catch (err) {
    console.error("Widget Render Error:", err);
    container.innerHTML = `<div style="color:red; padding:20px; border:1px solid red;">
      <h3>Widget Error</h3>
      <p>${err.message}</p>
      <pre>${err.stack}</pre>
    </div>`;
  }
}
