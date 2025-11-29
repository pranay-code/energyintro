export function render(container) {
  const style = document.createElement('style');
  style.textContent = `
    .arbitrage-widget {
      width: 100%;
      background: #fff;
      border-radius: 12px;
      padding: 20px;
      box-shadow: 0 4px 15px rgba(0,0,0,0.1);
      font-family: var(--font-main);
      box-sizing: border-box;
    }

    .arbitrage-widget * {
      box-sizing: border-box;
    }

    .flow-diagram {
      display: flex;
      flex-direction: column; /* Force Vertical */
      align-items: center;
      margin: 40px 0;
      position: relative;
      padding: 0 20px;
      gap: 10px;
    }

    .node {
      display: flex;
      flex-direction: column;
      align-items: center;
      z-index: 2;
      width: 80px;
    }

    .icon-box {
      width: 60px;
      height: 60px;
      background: #f5f5f5;
      border: 2px solid #ddd;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 1.8rem;
      margin-bottom: 8px;
      transition: all 0.3s ease;
    }

    .node.active .icon-box {
      border-color: var(--primary-color);
      background: #E3F2FD;
      transform: scale(1.1);
      box-shadow: 0 0 15px rgba(33, 150, 243, 0.3);
    }

    .label {
      font-size: 0.85rem;
      font-weight: 600;
      color: #666;
      text-align: center;
    }

    /* Battery Specifics */
    .battery-box {
      width: 50px;
      height: 80px;
      border: 3px solid #333;
      border-radius: 6px;
      position: relative;
      background: #fff;
      overflow: hidden;
      margin-bottom: 8px;
    }

    .battery-cap {
      width: 20px;
      height: 6px;
      background: #333;
      position: absolute;
      top: -9px;
      left: 50%;
      transform: translateX(-50%);
      border-radius: 2px;
    }

    .battery-level {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 20%;
      background: linear-gradient(to top, #4CAF50, #8BC34A);
      transition: height 1s ease-in-out;
    }

    .battery-bolt {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 1.5rem;
      z-index: 2;
      color: rgba(0,0,0,0.5);
    }

    /* Pipes - Vertical by default */
    .pipe-container {
      width: 6px;
      height: 60px;
      background: #eee;
      margin: 0;
      position: relative;
      border-radius: 3px;
      overflow: hidden;
    }

    .flow-particles {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: repeating-linear-gradient(
        180deg,
        transparent,
        transparent 10px,
        #2196F3 10px,
        #2196F3 20px
      );
      background-size: 100% 200%;
      opacity: 0;
      transition: opacity 0.3s;
    }

    .flow-particles.flowing {
      opacity: 1;
      animation: flowAnimation 1s linear infinite;
    }

    @keyframes flowAnimation {
      0% { background-position: 0 0; }
      100% { background-position: 0 20px; }
    }

    /* Controls */
    .controls {
      display: flex;
      justify-content: center;
      margin-top: 20px;
    }

    .toggle-btn {
      background: #2196F3;
      color: white;
      border: none;
      padding: 12px 24px;
      border-radius: 25px;
      font-size: 1rem;
      cursor: pointer;
      transition: background 0.2s;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .toggle-btn:hover {
      background: #1976D2;
    }

    .status-text {
      text-align: center;
      margin-bottom: 10px;
      font-weight: bold;
      color: #555;
      min-height: 1.2em;
    }

    @media (max-width: 480px) {
      .toggle-btn {
        padding: 8px 16px;
        font-size: 0.9rem;
      }
    }
  `;
  container.appendChild(style);

  const content = document.createElement('div');
  content.innerHTML = `
    <div class="arbitrage-widget">
      <div class="status-text" id="status-display">Day Mode: Charging from Renewables</div>
      
      <div class="flow-diagram">
        <!-- Renewables Node -->
        <div class="node active" id="node-renewables">
          <div class="icon-box">☀️</div>
          <div class="label">Renewables</div>
        </div>

        <!-- Pipe 1 -->
        <div class="pipe-container">
          <div class="flow-particles flowing" id="flow-1"></div>
        </div>

        <!-- BESS Node -->
        <div class="node" id="node-bess">
          <div class="battery-box">
            <div class="battery-cap"></div>
            <div class="battery-level" id="bat-level"></div>
            <div class="battery-bolt">⚡</div>
          </div>
          <div class="label">BESS</div>
        </div>

        <!-- Pipe 2 -->
        <div class="pipe-container">
          <div class="flow-particles" id="flow-2"></div>
        </div>

        <!-- Grid Node -->
        <div class="node" id="node-grid">
          <div class="icon-box">🏭</div>
          <div class="label">Grid</div>
        </div>
      </div>

      <div class="controls">
        <button class="toggle-btn" id="mode-btn">
          <span>🌙</span> Switch to Night (Discharge)
        </button>
      </div>
    </div>
  `;
  container.appendChild(content);

  // Logic
  const btn = content.querySelector('#mode-btn');
  const statusDisplay = content.querySelector('#status-display');
  const batLevel = content.querySelector('#bat-level');

  const nodeRenewables = content.querySelector('#node-renewables');
  const nodeGrid = content.querySelector('#node-grid');

  const flow1 = content.querySelector('#flow-1');
  const flow2 = content.querySelector('#flow-2');

  let isDay = true;

  // Initial State
  setTimeout(() => {
    batLevel.style.height = '90%'; // Start charging animation
  }, 100);

  btn.addEventListener('click', () => {
    isDay = !isDay;

    if (isDay) {
      // Switch to Day
      btn.innerHTML = '<span>🌙</span> Switch to Night (Discharge)';
      statusDisplay.textContent = 'Day Mode: Charging from Renewables';

      // Visuals
      nodeRenewables.classList.add('active');
      nodeGrid.classList.remove('active');

      flow1.classList.add('flowing');
      flow2.classList.remove('flowing');

      batLevel.style.height = '90%'; // Charge

    } else {
      // Switch to Night
      btn.innerHTML = '<span>☀️</span> Switch to Day (Charge)';
      statusDisplay.textContent = 'Night Mode: Discharging to Grid';

      // Visuals
      nodeRenewables.classList.remove('active');
      nodeGrid.classList.add('active');

      flow1.classList.remove('flowing');
      flow2.classList.add('flowing');

      batLevel.style.height = '20%'; // Discharge
    }
  });
}
