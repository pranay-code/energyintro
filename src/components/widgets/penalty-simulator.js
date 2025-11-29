import Chart from 'chart.js/auto';

export function render(container) {
  const style = document.createElement('style');
  style.textContent = `
    .simulator-container {
      width: 100%;
      background: #fff;
      border-radius: 12px;
      padding: 20px;
      box-shadow: 0 4px 15px rgba(0,0,0,0.1);
      font-family: var(--font-main);
      box-sizing: border-box;
    }

    .simulator-container * {
      box-sizing: border-box;
    }

    .controls-header {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 20px;
      margin-bottom: 20px;
      background: #f5f5f5;
      padding: 15px;
      border-radius: 8px;
    }

    .control-group {
      display: flex;
      flex-direction: column;
      gap: 5px;
    }

    .control-label {
      font-size: 0.9rem;
      font-weight: bold;
      color: #546E7A;
    }

    .input-field {
      padding: 8px;
      border: 1px solid #ccc;
      border-radius: 4px;
      font-size: 1rem;
      width: 100%;
    }

    .slider-container {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    
    input[type=range] {
      flex-grow: 1;
      accent-color: #D32F2F;
    }

    .charts-area {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
      margin-bottom: 20px;
    }

    .chart-box {
      position: relative;
      height: 250px;
      border: 1px solid #eee;
      border-radius: 8px;
      padding: 10px;
      min-width: 0; /* Prevent grid blowout */
    }

    @media (max-width: 768px) {
      .charts-area {
        grid-template-columns: 1fr;
      }
      
      .simulator-container {
        padding: 10px;
      }

      .controls-header {
        grid-template-columns: 1fr;
        padding: 10px;
      }

      .chart-box {
        height: 220px;
      }
    }

    .dashboard-footer-split {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
      background: #263238;
      color: white;
      padding: 20px;
      border-radius: 8px;
    }

    @media (max-width: 600px) {
      .dashboard-footer-split {
        grid-template-columns: 1fr;
      }
    }

    .metric-column {
      display: flex;
      flex-direction: column;
      gap: 10px;
      padding: 10px;
      background: rgba(255,255,255,0.05);
      border-radius: 8px;
    }

    .metric-column h4 {
      margin: 0 0 10px 0;
      text-align: center;
      color: #ECEFF1;
      border-bottom: 1px solid rgba(255,255,255,0.1);
      padding-bottom: 5px;
    }

    .metric-box {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .metric-label {
      font-size: 0.8rem;
      color: #B0BEC5;
      text-transform: uppercase;
    }

    .metric-value {
      font-size: 1.1rem;
      font-weight: bold;
    }

    .metric-value.loss { color: #FF5252; }
    .metric-value.revenue { color: #69F0AE; }
  `;
  container.appendChild(style);

  const content = document.createElement('div');
  content.innerHTML = `
    <div class="simulator-container">
      <div class="controls-header">
        <div class="control-group">
          <label class="control-label">Plant Capacity (AVC) [MW]</label>
          <input type="number" id="avc-input" class="input-field" value="100">
        </div>
        <div class="control-group">
          <label class="control-label">PPA Rate [₹/unit]</label>
          <input type="number" id="ppa-input" class="input-field" value="3.00" step="0.1">
        </div>
        <div class="control-group">
          <label class="control-label">Weather Uncertainty: <span id="uncertainty-val">0</span>%</label>
          <div class="slider-container">
            <span>Low</span>
            <input type="range" id="uncertainty-slider" min="0" max="100" value="0">
            <span>High</span>
          </div>
        </div>
      </div>

      <div class="charts-area">
        <div class="chart-box">
          <canvas id="solar-chart"></canvas>
        </div>
        <div class="chart-box">
          <canvas id="wind-chart"></canvas>
        </div>
      </div>

      <div class="dashboard-footer-split">
        <!-- Solar Metrics -->
        <div class="metric-column">
          <h4 style="color: #FFB300;">Solar Financials</h4>
          <div class="metric-box">
            <span class="metric-label">Revenue</span>
            <span class="metric-value revenue" id="solar-revenue">₹0</span>
          </div>
          <div class="metric-box">
            <span class="metric-label">DSM Penalty</span>
            <span class="metric-value loss" id="solar-penalty">₹0</span>
          </div>
          <div class="metric-box">
            <span class="metric-label">Loss %</span>
            <span class="metric-value loss" id="solar-loss">0%</span>
          </div>
        </div>

        <!-- Wind Metrics -->
        <div class="metric-column">
          <h4 style="color: #039BE5;">Wind Financials</h4>
          <div class="metric-box">
            <span class="metric-label">Revenue</span>
            <span class="metric-value revenue" id="wind-revenue">₹0</span>
          </div>
          <div class="metric-box">
            <span class="metric-label">DSM Penalty</span>
            <span class="metric-value loss" id="wind-penalty">₹0</span>
          </div>
          <div class="metric-box">
            <span class="metric-label">Loss %</span>
            <span class="metric-value loss" id="wind-loss">0%</span>
          </div>
        </div>
      </div>
    </div>
  `;
  container.appendChild(content);

  // --- Logic ---
  const avcInput = content.querySelector('#avc-input');
  const ppaInput = content.querySelector('#ppa-input');
  const uncertaintySlider = content.querySelector('#uncertainty-slider');
  const uncertaintyVal = content.querySelector('#uncertainty-val');

  // Solar Elements
  const solarRevDisplay = content.querySelector('#solar-revenue');
  const solarPenDisplay = content.querySelector('#solar-penalty');
  const solarLossDisplay = content.querySelector('#solar-loss');

  // Wind Elements
  const windRevDisplay = content.querySelector('#wind-revenue');
  const windPenDisplay = content.querySelector('#wind-penalty');
  const windLossDisplay = content.querySelector('#wind-loss');

  let solarChart, windChart;

  // Generate Base Data (96 blocks = 24 hours * 4)
  const blocks = Array.from({ length: 96 }, (_, i) => i);
  const labels = blocks.map(b => {
    const h = Math.floor(b / 4);
    const m = (b % 4) * 15;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
  });

  // Solar Forecast (Bell Curve)
  const solarForecast = blocks.map(b => {
    const hour = b / 4;
    if (hour < 6 || hour > 18) return 0;
    // Peak at 12 (block 48)
    return Math.sin((hour - 6) * Math.PI / 12); // 0 to 1
  });

  // Wind Forecast (Variable)
  const windForecast = blocks.map(b => {
    // A complex looking curve using sines
    const t = b / 10;
    const val = 0.4 + 0.3 * Math.sin(t) + 0.2 * Math.cos(t * 0.5);
    return Math.max(0, val);
  });

  function initCharts() {
    // Solar Chart
    const ctxSolar = content.querySelector('#solar-chart').getContext('2d');
    solarChart = new Chart(ctxSolar, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Forecast',
            data: [],
            borderColor: '#FFB300',
            borderDash: [5, 5],
            borderWidth: 2,
            pointRadius: 0,
            fill: false
          },
          {
            label: 'Actual',
            data: [],
            borderColor: '#F57C00',
            borderWidth: 2,
            pointRadius: 0,
            fill: false
          },
          {
            label: 'No-Penalty Band (±10%)',
            data: [], // Upper
            backgroundColor: 'rgba(76, 175, 80, 0.2)',
            borderColor: 'transparent',
            pointRadius: 0,
            fill: '+1' // Fill to next dataset
          },
          {
            label: 'Lower Band',
            data: [], // Lower
            borderColor: 'transparent',
            pointRadius: 0,
            fill: false
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: { display: true, text: 'Solar Generation (±10% Band)' },
          title: { display: true, text: 'Solar Generation (±10% Band)' },
          legend: {
            display: true,
            position: 'bottom',
            labels: {
              boxWidth: 12,
              filter: item => !item.text.includes('Lower Band')
            }
          }
        },
        scales: {
          y: { beginAtZero: true, title: { display: true, text: 'MW' } },
          x: { ticks: { maxTicksLimit: 8 } }
        }
      }
    });

    // Wind Chart
    const ctxWind = content.querySelector('#wind-chart').getContext('2d');
    windChart = new Chart(ctxWind, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Forecast',
            data: [],
            borderColor: '#039BE5',
            borderDash: [5, 5],
            borderWidth: 2,
            pointRadius: 0,
            fill: false
          },
          {
            label: 'Actual',
            data: [],
            borderColor: '#0277BD',
            borderWidth: 2,
            pointRadius: 0,
            fill: false
          },
          {
            label: 'No-Penalty Band (±15%)',
            data: [], // Upper
            backgroundColor: 'rgba(76, 175, 80, 0.2)',
            borderColor: 'transparent',
            pointRadius: 0,
            fill: '+1'
          },
          {
            label: 'Lower Band',
            data: [], // Lower
            borderColor: 'transparent',
            pointRadius: 0,
            fill: false
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: { display: true, text: 'Wind Generation (±15% Band)' },
          title: { display: true, text: 'Wind Generation (±15% Band)' },
          legend: {
            display: true,
            position: 'bottom',
            labels: {
              boxWidth: 12,
              filter: item => !item.text.includes('Lower Band')
            }
          }
        },
        scales: {
          y: { beginAtZero: true, title: { display: true, text: 'MW' } },
          x: { ticks: { maxTicksLimit: 8 } }
        }
      }
    });
  }

  function updateSimulation() {
    const avc = parseFloat(avcInput.value) || 100;
    const ppa = parseFloat(ppaInput.value) || 3;
    const uncertainty = parseInt(uncertaintySlider.value);

    uncertaintyVal.textContent = uncertainty;

    // 1. Calculate Forecasts scaled to AVC
    const solarSch = solarForecast.map(v => v * avc);
    const windSch = windForecast.map(v => v * avc);

    // 2. Calculate Bands
    // Solar: ±10% of AVC
    const solarBand = avc * 0.10;
    const solarUpper = solarSch.map(v => v + solarBand);
    const solarLower = solarSch.map(v => Math.max(0, v - solarBand));

    // Wind: ±15% of AVC
    const windBand = avc * 0.15;
    const windUpper = windSch.map(v => v + windBand);
    const windLower = windSch.map(v => Math.max(0, v - windBand));

    // 3. Generate Actuals with Noise
    // Noise increases with uncertainty slider
    // Max noise = 50% of AVC at 100 slider
    const noiseFactor = (uncertainty / 100) * (avc * 0.5);

    const solarAct = solarSch.map(v => {
      if (v === 0) return 0; // No sun at night
      const noise = (Math.random() - 0.5) * 2 * noiseFactor;
      return Math.max(0, Math.min(avc, v + noise));
    });

    const windAct = windSch.map(v => {
      const noise = (Math.random() - 0.5) * 2 * noiseFactor;
      return Math.max(0, Math.min(avc, v + noise));
    });

    // 4. Calculate Financials
    let solarRev = 0;
    let solarPen = 0;
    let windRev = 0;
    let windPen = 0;

    // Helper for penalty
    const calcPenalty = (act, sch, bandVal) => {
      const dev = Math.abs(act - sch);
      // Allowed deviation is bandVal (which is % of AVC)
      // If deviation > limit, penalty on EXCESS deviation.

      const limit = bandVal;
      if (dev > limit) {
        const excess = dev - limit;
        // Penalty Rate = 1.5 * PPA (Proxy)
        // Energy = MW * 0.25 hours (15 mins) * 1000 (to get Units/kWh)
        return (excess * 0.25 * 1000) * (1.5 * ppa);
      }
      return 0;
    };

    // Solar Loop
    solarAct.forEach((act, i) => {
      const sch = solarSch[i];
      // Revenue: Actual * 0.25h * 1000 * PPA
      solarRev += (act * 0.25 * 1000) * ppa;
      solarPen += calcPenalty(act, sch, solarBand);
    });

    // Wind Loop
    windAct.forEach((act, i) => {
      const sch = windSch[i];
      windRev += (act * 0.25 * 1000) * ppa;
      windPen += calcPenalty(act, sch, windBand);
    });

    // 5. Update UI
    // Solar
    solarRevDisplay.textContent = '₹' + Math.round(solarRev).toLocaleString();
    solarPenDisplay.textContent = '₹' + Math.round(solarPen).toLocaleString();
    const solarLossPct = solarRev > 0 ? (solarPen / solarRev) * 100 : 0;
    solarLossDisplay.textContent = solarLossPct.toFixed(1) + '%';

    // Wind
    windRevDisplay.textContent = '₹' + Math.round(windRev).toLocaleString();
    windPenDisplay.textContent = '₹' + Math.round(windPen).toLocaleString();
    const windLossPct = windRev > 0 ? (windPen / windRev) * 100 : 0;
    windLossDisplay.textContent = windLossPct.toFixed(1) + '%';

    // 6. Update Charts
    // Solar
    solarChart.data.datasets[0].data = solarSch;
    solarChart.data.datasets[1].data = solarAct;
    solarChart.data.datasets[2].data = solarUpper;
    solarChart.data.datasets[3].data = solarLower;
    solarChart.options.scales.y.max = avc * 1.2;
    solarChart.update();

    // Wind
    windChart.data.datasets[0].data = windSch;
    windChart.data.datasets[1].data = windAct;
    windChart.data.datasets[2].data = windUpper;
    windChart.data.datasets[3].data = windLower;
    windChart.options.scales.y.max = avc * 1.2;
    windChart.update();
  }

  // Init
  initCharts();
  updateSimulation();

  // Listeners
  avcInput.addEventListener('input', updateSimulation);
  ppaInput.addEventListener('input', updateSimulation);
  uncertaintySlider.addEventListener('input', updateSimulation);
}
