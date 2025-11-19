export function render(container) {
  const style = document.createElement('style');
  style.textContent = `
    .arb-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      max-width: 500px;
      margin-bottom: 20px;
    }
    .node {
      width: 80px;
      height: 80px;
      border: 2px solid #444;
      border-radius: 12px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-size: 2rem;
      position: relative;
      background: #fff;
      box-shadow: 0 4px 10px rgba(0,0,0,0.1);
    }
    .battery-level {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 0%;
      background: var(--success-green);
      opacity: 0.5;
      transition: height 1s;
      border-radius: 10px;
    }
    .flow-line {
      flex-grow: 1;
      height: 4px;
      background: #333;
      position: relative;
      margin: 0 10px;
    }
    .electron {
      width: 12px;
      height: 12px;
      background: var(--neon-cyan);
      border-radius: 50%;
      position: absolute;
      top: -4px;
      left: 0;
      opacity: 0;
    }
    .day-mode .electron {
      animation: flow-right 1s infinite linear;
    }
    .night-mode .electron {
      animation: flow-right 1s infinite linear reverse;
    }
    @keyframes flow-right {
      0% { left: 0; opacity: 1; }
      100% { left: 100%; opacity: 1; }
    }
    .label {
      font-size: 0.8rem;
      margin-top: 5px;
      color: #aaa;
    }
  `;
  container.appendChild(style);

  const content = document.createElement('div');
  content.innerHTML = `
    <div class="arb-container" id="scene">
      <div class="node">
        <div id="source-icon">☀️</div>
        <div class="label" id="source-label">Solar</div>
      </div>
      
      <div class="flow-line">
        <div class="electron"></div>
      </div>
      
      <div class="node">
        <div class="battery-level" id="bat-level"></div>
        <div style="z-index:2">🔋</div>
        <div class="label">BESS</div>
      </div>
      
      <div class="flow-line" id="grid-line" style="opacity:0">
        <div class="electron"></div>
      </div>
      
      <div class="node" id="grid-node" style="opacity:0.3">
        <div>🏭</div>
        <div class="label">Grid</div>
      </div>
    </div>
    
    <button class="btn" id="toggle-btn">Switch to Night (Discharge)</button>
  `;
  container.appendChild(content);

  const btn = content.querySelector('#toggle-btn');
  const scene = content.querySelector('#scene');
  const batLevel = content.querySelector('#bat-level');
  const sourceIcon = content.querySelector('#source-icon');
  const sourceLabel = content.querySelector('#source-label');
  const gridLine = content.querySelector('#grid-line');
  const gridNode = content.querySelector('#grid-node');

  let isDay = true;

  // Init state
  batLevel.style.height = '20%';
  scene.classList.add('day-mode');

  btn.addEventListener('click', () => {
    isDay = !isDay;

    if (isDay) {
      // Day Mode: Solar -> Battery
      btn.textContent = 'Switch to Night (Discharge)';
      scene.classList.remove('night-mode');
      scene.classList.add('day-mode');

      sourceIcon.textContent = '☀️';
      sourceLabel.textContent = 'Solar';
      sourceIcon.parentElement.style.opacity = 1;

      gridLine.style.opacity = 0;
      gridNode.style.opacity = 0.3;

      batLevel.style.height = '90%'; // Charging up
    } else {
      // Night Mode: Battery -> Grid
      btn.textContent = 'Switch to Day (Charge)';
      scene.classList.remove('day-mode');

      // We need flow from Battery to Grid.
      // My CSS animation is on the first line. I need to animate the second line.
      // Actually, let's simplify:
      // Day: Line 1 active (Solar -> Bat)
      // Night: Line 2 active (Bat -> Grid)

      sourceIcon.parentElement.style.opacity = 0.3;

      gridLine.style.opacity = 1;
      gridNode.style.opacity = 1;

      // Animate grid line
      gridLine.querySelector('.electron').style.animation = 'flow-right 1s infinite linear';

      batLevel.style.height = '10%'; // Discharging
    }
  });
}
