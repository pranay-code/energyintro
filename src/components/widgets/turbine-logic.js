export function render(container) {
  const style = document.createElement('style');
  style.textContent = `
    .gen-container {
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      align-items: flex-end;
      width: 100%;
      gap: 20px;
      margin-bottom: 30px;
      padding: 20px 0;
      min-height: 200px;
    }
    .gen-box {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 30%;
      min-width: 120px;
      position: relative;
    }
    .label {
      margin-top: 15px;
      font-family: var(--font-mono);
      font-size: 0.9rem;
      color: var(--text-main);
      font-weight: bold;
      text-align: center;
    }

    /* Wind Turbine */
    .turbine-pole {
      width: 6px;
      height: 80px;
      background: #78909C;
      position: relative;
      border-radius: 2px;
    }
    .turbine-hub {
      width: 12px;
      height: 12px;
      background: #455A64;
      border-radius: 50%;
      position: absolute;
      top: -6px;
      left: -3px;
      z-index: 2;
    }
    .turbine-blades {
      position: absolute;
      top: 0;
      left: 3px;
      width: 0;
      height: 0;
      transition: transform 2s ease-in;
    }
    .blade {
      width: 8px;
      height: 60px;
      background: #B0BEC5;
      position: absolute;
      left: -4px;
      bottom: 0;
      transform-origin: bottom center;
      border-radius: 50% 50% 0 0;
      box-shadow: inset 1px 0 2px rgba(0,0,0,0.1);
    }
    .blade:nth-child(1) { transform: rotate(0deg) translateY(-6px); }
    .blade:nth-child(2) { transform: rotate(120deg) translateY(-6px); }
    .blade:nth-child(3) { transform: rotate(240deg) translateY(-6px); }

    .active .turbine-blades {
      animation: spin 0.8s linear infinite;
    }
    @keyframes spin { 100% { transform: rotate(360deg); } }

    /* Solar Panel */
    .solar-scene {
      position: relative;
      width: 100px;
      height: 80px;
      display: flex;
      justify-content: center;
      align-items: flex-end;
    }
    .sun {
      width: 40px;
      height: 40px;
      background: #FFD600;
      border-radius: 50%;
      position: absolute;
      top: 10px;
      right: -10px;
      opacity: 0;
      transform: scale(0.5);
      transition: all 0.5s ease-out;
      box-shadow: 0 0 20px #FFAB00;
    }
    .active .sun {
      opacity: 1;
      top: -20px;
      transform: scale(1);
    }
    .panel {
      width: 80px;
      height: 50px;
      background: #263238;
      border: 3px solid #546E7A;
      transform: perspective(100px) rotateX(20deg);
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-template-rows: repeat(2, 1fr);
      gap: 2px;
      padding: 2px;
      transition: all 0.5s;
    }
    .p-cell {
      background: #1A237E;
      width: 100%;
      height: 100%;
      transition: background 0.5s;
    }
    .active .p-cell {
      background: #4FC3F7;
      box-shadow: 0 0 5px #4FC3F7;
    }

    /* Thermal Plant */
    .thermal-scene {
      position: relative;
      width: 100px;
      height: 80px;
      display: flex;
      justify-content: center;
      align-items: flex-end;
    }
    .factory {
      width: 60px;
      height: 40px;
      background: #5D4037;
      position: relative;
      border-radius: 2px;
    }
    .chimney {
      width: 12px;
      height: 30px;
      background: #3E2723;
      position: absolute;
      top: -30px;
      right: 10px;
    }
    .smoke {
      width: 15px;
      height: 15px;
      background: rgba(100, 100, 100, 0.6);
      border-radius: 50%;
      position: absolute;
      top: -35px;
      right: 8px;
      opacity: 0;
    }
    .active .smoke {
      animation: rise 2s infinite;
    }
    .active .smoke:nth-child(2) { animation-delay: 0.5s; }
    .active .smoke:nth-child(3) { animation-delay: 1.0s; }

    @keyframes rise {
      0% { transform: translateY(0) scale(1); opacity: 0.8; }
      100% { transform: translateY(-40px) scale(2); opacity: 0; }
    }

    @media (max-width: 768px) {
      .gen-container {
        flex-direction: column;
        align-items: center;
      }
      .gen-box {
        width: 80%;
        margin-bottom: 20px;
      }
    }
  `;
  container.appendChild(style);

  const content = document.createElement('div');
  content.innerHTML = `
    <div class="gen-container" id="anim-container">
      <!-- Wind -->
      <div class="gen-box">
        <div class="turbine-pole">
          <div class="turbine-hub"></div>
          <div class="turbine-blades">
            <div class="blade"></div>
            <div class="blade"></div>
            <div class="blade"></div>
          </div>
        </div>
        <div class="label">Wind Turbine</div>
      </div>

      <!-- Solar -->
      <div class="gen-box">
        <div class="solar-scene">
          <div class="sun"></div>
          <div class="panel">
            <div class="p-cell"></div><div class="p-cell"></div><div class="p-cell"></div>
            <div class="p-cell"></div><div class="p-cell"></div><div class="p-cell"></div>
          </div>
        </div>
        <div class="label">Solar Panel</div>
      </div>

      <!-- Thermal -->
      <div class="gen-box">
        <div class="thermal-scene">
          <div class="factory">
            <div class="chimney"></div>
            <div class="smoke"></div>
            <div class="smoke"></div>
            <div class="smoke"></div>
          </div>
        </div>
        <div class="label">Thermal Plant</div>
      </div>
    </div>
    <button class="btn" id="activate-btn">Activate Generation</button>
  `;
  container.appendChild(content);

  const btn = content.querySelector('#activate-btn');
  const animContainer = content.querySelector('#anim-container');
  let active = false;

  btn.addEventListener('click', () => {
    active = !active;
    if (active) {
      animContainer.classList.add('active');
      btn.textContent = 'Deactivate';
      btn.style.background = 'var(--alert-red)';
      btn.style.borderColor = 'var(--alert-red)';
      btn.style.color = '#fff';
    } else {
      animContainer.classList.remove('active');
      btn.textContent = 'Activate Generation';
      btn.style.background = '#fff';
      btn.style.borderColor = 'var(--neon-cyan)';
      btn.style.color = 'var(--neon-cyan)';
    }
  });
}
