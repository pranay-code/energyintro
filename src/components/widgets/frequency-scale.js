export function render(container) {
  const style = document.createElement('style');
  style.textContent = `
    .scale-container {
      position: relative;
      width: 300px;
      height: 150px;
      background: radial-gradient(circle at bottom, #f5f5f5, #e0e0e0);
      border-radius: 150px 150px 0 0;
      border: 2px solid #bbb;
      border-bottom: none;
      margin: 0 auto;
      overflow: hidden;
      box-shadow: inset 0 0 10px rgba(0,0,0,0.1);
    }
    .needle {
      width: 4px;
      height: 140px;
      background: var(--alert-red);
      position: absolute;
      bottom: 0;
      left: 50%;
      transform-origin: bottom center;
      transform: rotate(0deg);
      transition: transform 0.5s cubic-bezier(0.4, 2.5, 0.6, 0.8); /* Bouncy */
      z-index: 2;
    }
    .ticks {
      position: absolute;
      width: 100%;
      height: 100%;
    }
    .tick-val {
      position: absolute;
      font-family: var(--font-mono);
      font-size: 0.8rem;
      color: #888;
    }
    .val-49 { bottom: 10px; left: 20px; }
    .val-50 { top: 10px; left: 50%; transform: translateX(-50%); color: var(--success-green); font-weight: bold; }
    .val-51 { bottom: 10px; right: 20px; }
    
    .digital-readout {
      font-family: var(--font-mono);
      font-size: 2rem;
      color: var(--success-green);
      text-align: center;
      margin-top: 10px;
    }
    .controls {
      display: flex;
      gap: 20px;
      justify-content: center;
      margin-top: 20px;
    }
  `;
  container.appendChild(style);

  const content = document.createElement('div');
  content.innerHTML = `
    <div class="scale-container">
      <div class="ticks">
        <span class="tick-val val-49">49.0</span>
        <span class="tick-val val-50">50.0</span>
        <span class="tick-val val-51">51.0</span>
      </div>
      <div class="needle" id="needle"></div>
    </div>
    <div class="digital-readout" id="freq-val">50.00 Hz</div>
    <div class="controls">
      <button class="btn" id="add-load">Add Load (Spike)</button>
      <button class="btn" id="add-gen">Dispatch Gen</button>
    </div>
  `;
  container.appendChild(content);

  let frequency = 50.00;
  const needle = content.querySelector('#needle');
  const readout = content.querySelector('#freq-val');

  function updateDisplay() {
    readout.textContent = frequency.toFixed(2) + ' Hz';

    // Map 49-51 to -90deg to 90deg
    // 50 = 0deg
    const deg = (frequency - 50) * 90;
    needle.style.transform = `rotate(${deg}deg)`;

    if (frequency < 49.5 || frequency > 50.5) {
      readout.style.color = 'var(--alert-red)';
      needle.style.background = 'var(--alert-red)';
    } else {
      readout.style.color = 'var(--success-green)';
      needle.style.background = 'var(--success-green)';
    }
  }

  content.querySelector('#add-load').addEventListener('click', () => {
    frequency -= (Math.random() * 0.3 + 0.1);
    if (frequency < 49.0) frequency = 49.0;
    updateDisplay();
  });

  content.querySelector('#add-gen').addEventListener('click', () => {
    frequency += (Math.random() * 0.3 + 0.1);
    if (frequency > 51.0) frequency = 51.0;
    updateDisplay();
  });

  // Auto-center drift
  setInterval(() => {
    if (Math.abs(frequency - 50) > 0.05) {
      // Slowly drift back if close, or drift away if unstable?
      // Let's make it require user interaction, but add tiny noise
      frequency += (Math.random() - 0.5) * 0.02;
      updateDisplay();
    }
  }, 1000);
}
