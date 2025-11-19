function g(l){const c=document.createElement("style");c.textContent=`
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
  `,l.appendChild(c);const e=document.createElement("div");e.innerHTML=`
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
  `,l.appendChild(e);const o=e.querySelector("#loc-status"),i=e.querySelector("#ghi-val"),a=e.querySelector("#wind-val");async function n(t,d){try{const r=`https://api.open-meteo.com/v1/forecast?latitude=${t}&longitude=${d}&current=shortwave_radiation,wind_speed_10m`,s=await(await fetch(r)).json(),v=s.current.shortwave_radiation,m=s.current.wind_speed_10m;i.textContent=v,a.textContent=m,i.classList.remove("loading"),a.classList.remove("loading"),o.textContent=`Live Data for Lat: ${t.toFixed(2)}, Lon: ${d.toFixed(2)}`}catch(r){console.error(r),o.textContent="Failed to fetch weather data.",i.textContent="Err",a.textContent="Err"}}navigator.geolocation?navigator.geolocation.getCurrentPosition(t=>{n(t.coords.latitude,t.coords.longitude)},t=>{o.textContent="Location denied. Showing New Delhi.",n(28.61,77.2)}):(o.textContent="Geolocation not supported. Showing New Delhi.",n(28.61,77.2))}export{g as render};
