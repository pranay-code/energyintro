export function render(container) {
    const style = document.createElement('style');
    style.textContent = `
    .pool-container {
      position: relative;
      width: 300px;
      height: 200px;
      border: 4px solid #555;
      border-top: none;
      margin: 0 auto;
      background: rgba(255,255,255,0.5);
      border-radius: 0 0 10px 10px;
    }
    .water {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 50%;
      background: var(--neon-cyan);
      opacity: 0.6;
      transition: height 0.2s;
    }
    .pipe {
      position: absolute;
      width: 20px;
      height: 40px;
      background: #888;
    }
    .inlet { top: -40px; left: 20px; }
    .outlet { bottom: -40px; right: 20px; }
    
    .flow {
      position: absolute;
      width: 10px;
      background: var(--neon-cyan);
      left: 5px;
    }
    .flow-in { top: 0; height: 0; transition: height 0.2s; }
    .flow-out { top: 0; height: 0; transition: height 0.2s; }
    
    .controls {
      display: flex;
      justify-content: space-between;
      margin-top: 40px;
      width: 100%;
    }
    .level-line {
      position: absolute;
      top: 50%;
      width: 100%;
      border-top: 2px dashed var(--alert-red);
      opacity: 0.5;
    }
  `;
    container.appendChild(style);

    const content = document.createElement('div');
    content.innerHTML = `
    <div class="pool-container">
      <div class="level-line"></div>
      <div class="water" id="pool-water"></div>
      
      <div class="pipe inlet">
        <div class="flow flow-in" id="flow-in"></div>
      </div>
      
      <div class="pipe outlet">
        <div class="flow flow-out" id="flow-out"></div>
      </div>
    </div>
    
    <div class="controls">
      <button class="btn" id="btn-gen">Add Generation</button>
      <div style="text-align:center; font-weight:bold" id="status-text">Stable</div>
      <button class="btn" id="btn-load">Add Load</button>
    </div>
  `;
    container.appendChild(content);

    const water = content.querySelector('#pool-water');
    const status = content.querySelector('#status-text');
    let level = 50;

    // Simulation loop
    setInterval(() => {
        // Natural drain (Load)
        level -= 0.5;

        // Clamp
        if (level < 0) level = 0;
        if (level > 100) level = 100;

        water.style.height = level + '%';

        if (level < 40) {
            status.textContent = "Under Frequency (Low)";
            status.style.color = "var(--alert-red)";
        } else if (level > 60) {
            status.textContent = "Over Frequency (High)";
            status.style.color = "var(--alert-red)";
        } else {
            status.textContent = "Stable (50Hz)";
            status.style.color = "var(--success-green)";
        }
    }, 100);

    content.querySelector('#btn-gen').addEventListener('click', () => {
        level += 10;
    });

    content.querySelector('#btn-load').addEventListener('click', () => {
        level -= 10;
    });
}
