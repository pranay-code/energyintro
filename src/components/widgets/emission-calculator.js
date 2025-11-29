export function render(container) {
  const style = document.createElement('style');
  style.textContent = `
    .dashboard-container {
      width: 100%;
      max-width: 600px;
      margin: 0 auto;
      padding: 30px;
      border-radius: 20px;
      background: #78909C; /* Initial Grey */
      color: #fff;
      transition: background 0.5s ease;
      box-shadow: 0 10px 30px rgba(0,0,0,0.2);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 20px;
      font-family: var(--font-main);
    }
    
    .emoji-display {
      font-size: 5rem;
      margin-bottom: 10px;
      animation: bounce 2s infinite;
      filter: drop-shadow(0 5px 10px rgba(0,0,0,0.2));
    }
    
    @keyframes bounce {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-10px); }
    }
    
    .metrics-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 15px;
      width: 100%;
    }
    
    .metric-card {
      background: rgba(255, 255, 255, 0.2);
      backdrop-filter: blur(5px);
      padding: 15px;
      border-radius: 12px;
      text-align: center;
      border: 1px solid rgba(255, 255, 255, 0.3);
    }
    
    .metric-value {
      font-size: 1.8rem;
      font-weight: bold;
      font-family: var(--font-mono);
      margin-bottom: 5px;
    }
    
    .metric-label {
      font-size: 0.8rem;
      text-transform: uppercase;
      opacity: 0.9;
      letter-spacing: 1px;
    }
    
    .slider-container {
      width: 100%;
      margin-top: 20px;
    }
    
    input[type=range] {
      width: 100%;
      height: 10px;
      border-radius: 5px;
      background: rgba(255, 255, 255, 0.5);
      outline: none;
      -webkit-appearance: none;
    }
    
    input[type=range]::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 25px;
      height: 25px;
      border-radius: 50%;
      background: #fff;
      cursor: pointer;
      box-shadow: 0 0 10px rgba(0,0,0,0.3);
      transition: transform 0.2s;
    }
    
    input[type=range]::-webkit-slider-thumb:hover {
      transform: scale(1.2);
    }
    
    .slider-labels {
      display: flex;
      justify-content: space-between;
      margin-top: 10px;
      font-weight: bold;
      font-size: 0.9rem;
    }
    
    @media (max-width: 600px) {
      .metrics-grid {
        grid-template-columns: 1fr;
      }
    }
  `;
  container.appendChild(style);

  const content = document.createElement('div');
  content.innerHTML = `
    <div class="dashboard-container" id="dash-bg">
      <div class="emoji-display" id="emoji">😷</div>
      
      <div class="metrics-grid">
        <div class="metric-card">
          <div class="metric-value" id="val-co2">1000</div>
          <div class="metric-label">CO2 (kg)</div>
        </div>
        <div class="metric-card">
          <div class="metric-value" id="val-aqi">300</div>
          <div class="metric-label">AQI Level</div>
        </div>
        <div class="metric-card">
          <div class="metric-value" id="val-risk">10.0</div>
          <div class="metric-label">Health Risk</div>
        </div>
      </div>
      
      <div class="slider-container">
        <input type="range" id="mix-slider" min="0" max="100" value="0">
        <div class="slider-labels">
          <span>100% Fossil</span>
          <span>100% Green</span>
        </div>
      </div>
    </div>
  `;
  container.appendChild(content);

  const slider = content.querySelector('#mix-slider');
  const bg = content.querySelector('#dash-bg');
  const emoji = content.querySelector('#emoji');
  const valCO2 = content.querySelector('#val-co2');
  const valAQI = content.querySelector('#val-aqi');
  const valRisk = content.querySelector('#val-risk');

  slider.addEventListener('input', (e) => {
    const pct = parseInt(e.target.value);

    // Update Metrics (Linear Interpolation)
    // CO2: 1000 -> 0
    const co2 = Math.round(1000 - (pct * 10));
    valCO2.textContent = co2;

    // AQI: 300 -> 20
    const aqi = Math.round(300 - (pct * 2.8));
    valAQI.textContent = aqi;

    // Risk: 10 -> 0
    const risk = (10 - (pct * 0.1)).toFixed(1);
    valRisk.textContent = risk;

    // Update Visuals
    if (pct < 33) {
      // Fossil / Smog
      bg.style.background = '#78909C'; // Blue Grey
      emoji.textContent = '😷';
    } else if (pct < 66) {
      // Mixed / Warning
      bg.style.background = '#FFAB00'; // Amber
      emoji.textContent = '😐';
    } else {
      // Green / Safe
      bg.style.background = '#43A047'; // Green
      emoji.textContent = '🏃';
    }
  });
}
