export function render(container) {
  const style = document.createElement('style');
  style.textContent = `
    .balance-container {
      width: 100%;
      height: 300px;
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-end;
      padding-bottom: 20px;
      overflow: hidden;
    }
    
    .frequency-display {
      position: absolute;
      top: 20px;
      font-family: var(--font-mono);
      font-size: 2rem;
      font-weight: bold;
      color: var(--text-main);
      background: rgba(255, 255, 255, 0.8);
      padding: 10px 20px;
      border-radius: 8px;
      box-shadow: 0 4px 10px rgba(0,0,0,0.1);
      transition: color 0.3s;
    }
    
    .beam-assembly {
      position: relative;
      width: 80%;
      height: 150px;
      display: flex;
      justify-content: center;
      align-items: flex-end;
    }
    
    .fulcrum {
      width: 0;
      height: 0;
      border-left: 20px solid transparent;
      border-right: 20px solid transparent;
      border-bottom: 40px solid #546E7A;
      position: absolute;
      bottom: 0;
      z-index: 2;
    }
    
    .beam {
      width: 100%;
      height: 10px;
      background: #37474F;
      border-radius: 5px;
      position: absolute;
      bottom: 40px;
      transition: transform 0.5s cubic-bezier(0.4, 2.5, 0.6, 0.8); /* Bouncy effect */
      transform-origin: center;
      z-index: 1;
    }
    
    .plate {
      width: 80px;
      height: 5px;
      background: #78909C;
      position: absolute;
      top: -5px;
    }
    .plate.left { left: 0; }
    .plate.right { right: 0; }
    
    .chain {
      width: 2px;
      height: 40px;
      background: #B0BEC5;
      position: absolute;
      top: 10px;
    }
    .chain.left { left: 40px; }
    .chain.right { right: 40px; }
    
    .pan {
      width: 60px;
      height: 10px;
      background: #78909C;
      position: absolute;
      top: 50px;
      border-radius: 0 0 30px 30px;
    }
    .pan.left { left: 10px; }
    .pan.right { right: 10px; }
    
    /* Weights */
    .weight-stack {
      position: absolute;
      bottom: 10px; /* On top of beam */
      display: flex;
      flex-direction: column-reverse;
      align-items: center;
      gap: 2px;
      transition: all 0.3s;
    }
    .weight-stack.left { left: 10px; }
    .weight-stack.right { right: 10px; }
    
    .weight {
      width: 40px;
      height: 20px;
      border-radius: 4px;
      box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
      transition: all 0.3s;
      animation: dropIn 0.3s ease-out;
    }
    .weight.gen { background: var(--success-green); border: 1px solid #2E7D32; }
    .weight.load { background: var(--alert-red); border: 1px solid #C62828; }
    
    @keyframes dropIn {
      from { transform: translateY(-50px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }
    
    .controls {
      display: flex;
      justify-content: space-between;
      width: 100%;
      margin-top: 20px;
      padding: 0 20px;
    }
    
    .control-group {
      display: flex;
      flex-direction: column;
      gap: 10px;
      align-items: center;
    }
    
    .control-label {
      font-weight: bold;
      color: var(--text-muted);
      font-size: 0.9rem;
    }
    
    .btn-group {
      display: flex;
      gap: 10px;
    }
    
    .btn-small {
      padding: 5px 15px;
      font-size: 1.2rem;
      border-radius: 4px;
      cursor: pointer;
      border: 1px solid #ccc;
      background: #fff;
      transition: all 0.2s;
    }
    .btn-small:hover {
      background: #f0f0f0;
      transform: scale(1.05);
    }
    
    .label-tag {
      position: absolute;
      bottom: -30px;
      font-weight: bold;
      font-size: 0.8rem;
    }
    .label-tag.left { left: 0; color: var(--success-green); }
    .label-tag.right { right: 0; color: var(--alert-red); }

  `;
  container.appendChild(style);

  const content = document.createElement('div');
  content.innerHTML = `
    <div class="balance-container">
      <div class="frequency-display" id="freq-display">50.00 Hz</div>
      
      <div class="beam-assembly">
        <div class="beam" id="beam">
          <!-- Left Side (Gen) -->
          <div class="weight-stack left" id="gen-stack"></div>
          <div class="label-tag left">GENERATION</div>
          
          <!-- Right Side (Load) -->
          <div class="weight-stack right" id="load-stack"></div>
          <div class="label-tag right">LOAD</div>
        </div>
        <div class="fulcrum"></div>
      </div>
    </div>
    
    <div class="controls">
      <div class="control-group">
        <div class="control-label">Generation</div>
        <div class="btn-group">
          <button class="btn-small" id="add-gen">+</button>
          <button class="btn-small" id="rem-gen">-</button>
        </div>
      </div>
      
      <div class="control-group">
        <div class="control-label">Load</div>
        <div class="btn-group">
          <button class="btn-small" id="add-load">+</button>
          <button class="btn-small" id="rem-load">-</button>
        </div>
      </div>
    </div>
    <p style="text-align:center; margin-top:15px; font-size:0.9rem; color:#666;">
      Keep the beam horizontal to maintain 50Hz. <br>
      <strong>Gen > Load</strong> = Freq Rises (Beam tilts Left). <br>
      <strong>Gen < Load</strong> = Freq Drops (Beam tilts Right).
    </p>
  `;
  container.appendChild(content);

  // State
  let genCount = 3;
  let loadCount = 3;

  const beam = content.querySelector('#beam');
  const freqDisplay = content.querySelector('#freq-display');
  const genStack = content.querySelector('#gen-stack');
  const loadStack = content.querySelector('#load-stack');

  function update() {
    // Render Weights
    genStack.innerHTML = '';
    for (let i = 0; i < genCount; i++) {
      const w = document.createElement('div');
      w.className = 'weight gen';
      genStack.appendChild(w);
    }

    loadStack.innerHTML = '';
    for (let i = 0; i < loadCount; i++) {
      const w = document.createElement('div');
      w.className = 'weight load';
      loadStack.appendChild(w);
    }

    // Calculate Balance
    // Physics: Heavier side goes DOWN.
    // Grid Logic: 
    // Gen > Load -> Freq > 50Hz (Overspeed)
    // Gen < Load -> Freq < 50Hz (Underspeed)

    // Visual Mapping:
    // If Gen > Load (Left Heavier) -> Left goes DOWN.
    // If Load > Gen (Right Heavier) -> Right goes DOWN.

    const diff = genCount - loadCount;
    const tiltAngle = diff * -5; // Negative tilt rotates counter-clockwise (Left Down)
    // Wait, CSS rotate: positive is clockwise (Right Down).
    // So if Gen > Load (diff > 0), we want Left Down (CCW). So negative angle. Correct.

    // Clamp tilt
    const clampedTilt = Math.max(Math.min(tiltAngle, 25), -25);

    beam.style.transform = `rotate(${clampedTilt}deg)`;

    // Frequency Calc
    // 50 + (diff * 0.5)
    let freq = 50 + (diff * 0.5);
    freqDisplay.textContent = freq.toFixed(2) + ' Hz';

    // Color
    if (freq === 50) freqDisplay.style.color = 'var(--success-green)';
    else freqDisplay.style.color = 'var(--alert-red)';
  }

  // Init
  update();

  // Listeners
  content.querySelector('#add-gen').addEventListener('click', () => {
    if (genCount < 8) { genCount++; update(); }
  });
  content.querySelector('#rem-gen').addEventListener('click', () => {
    if (genCount > 0) { genCount--; update(); }
  });
  content.querySelector('#add-load').addEventListener('click', () => {
    if (loadCount < 8) { loadCount++; update(); }
  });
  content.querySelector('#rem-load').addEventListener('click', () => {
    if (loadCount > 0) { loadCount--; update(); }
  });
}
