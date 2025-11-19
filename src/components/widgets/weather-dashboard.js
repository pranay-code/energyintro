export function render(container) {
    const style = document.createElement('style');
    style.textContent = `
    .weather-card {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
      width: 100%;
      margin-top: 20px;
    }
    .metric-box {
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid var(--glass-border);
      padding: 20px;
      border-radius: 12px;
      text-align: center;
    }
    .metric-val {
      font-size: 2.5rem;
      font-family: var(--font-mono);
      color: var(--neon-cyan);
      margin: 10px 0;
    }
    .metric-label {
      color: var(--text-muted);
      font-size: 0.9rem;
    }
    .location-status {
      width: 100%;
      text-align: center;
      color: var(--text-muted);
      margin-bottom: 10px;
      font-style: italic;
    }
    .loading {
      animation: pulse 1.5s infinite;
    }
    @keyframes pulse { 0% { opacity: 0.5; } 50% { opacity: 1; } 100% { opacity: 0.5; } }
  `;
    container.appendChild(style);

    const content = document.createElement('div');
    content.innerHTML = `
    <div class="location-status" id="loc-status">Locating you...</div>
    <div class="weather-card">
      <div class="metric-box">
        <div class="metric-label">Global Horizontal Irradiance (GHI)</div>
        <div class="metric-val loading" id="ghi-val">---</div>
        <div class="metric-label">W/m² (Solar Fuel)</div>
      </div>
      <div class="metric-box">
        <div class="metric-label">Wind Speed</div>
        <div class="metric-val loading" id="wind-val">---</div>
        <div class="metric-label">km/h (Wind Fuel)</div>
      </div>
    </div>
    <p style="text-align: center; margin-top: 20px; font-size: 0.8rem; color: #666;">
      Data provided by Open-Meteo API
    </p>
  `;
    container.appendChild(content);

    const locStatus = content.querySelector('#loc-status');
    const ghiVal = content.querySelector('#ghi-val');
    const windVal = content.querySelector('#wind-val');

    async function fetchWeather(lat, lon) {
        try {
            // OpenMeteo API: current=shortwave_radiation,wind_speed_10m
            const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=shortwave_radiation,wind_speed_10m`;
            const res = await fetch(url);
            const data = await res.json();

            const ghi = data.current.shortwave_radiation;
            const wind = data.current.wind_speed_10m;

            ghiVal.textContent = ghi;
            windVal.textContent = wind;

            ghiVal.classList.remove('loading');
            windVal.classList.remove('loading');

            locStatus.textContent = `Live Data for Lat: ${lat.toFixed(2)}, Lon: ${lon.toFixed(2)}`;
        } catch (err) {
            console.error(err);
            locStatus.textContent = "Failed to fetch weather data.";
            ghiVal.textContent = "Err";
            windVal.textContent = "Err";
        }
    }

    // Get Location
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                fetchWeather(pos.coords.latitude, pos.coords.longitude);
            },
            (err) => {
                locStatus.textContent = "Location denied. Showing New Delhi.";
                fetchWeather(28.61, 77.20);
            }
        );
    } else {
        locStatus.textContent = "Geolocation not supported. Showing New Delhi.";
        fetchWeather(28.61, 77.20);
    }
}
