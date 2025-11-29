export function render(container) {
    const style = document.createElement('style');
    style.textContent = `
    .bottleneck-container {
      width: 100%;
      background: #263238;
      border-radius: 12px;
      padding: 20px;
      color: white;
      font-family: var(--font-main);
      display: flex;
      flex-direction: column;
      gap: 20px;
      box-shadow: 0 4px 15px rgba(0,0,0,0.2);
    }

    .visual-area {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 150px;
      position: relative;
      background: rgba(0,0,0,0.2);
      border-radius: 8px;
      padding: 0 20px;
      overflow: hidden;
    }

    .node {
      z-index: 2;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 5px;
    }

    .icon {
      font-size: 3rem;
      filter: drop-shadow(0 0 10px rgba(255,255,255,0.3));
    }

    .label {
      font-size: 0.8rem;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: #B0BEC5;
    }

    .wires-container {
      flex-grow: 1;
      height: 100%;
      position: relative;
      margin: 0 20px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .wires {
      width: 100%;
      background: #455A64;
      position: relative;
      transition: height 0.5s, background 0.5s, box-shadow 0.5s;
      border-radius: 4px;
    }
    
    .wires.thick { height: 20px; }
    .wires.thin { height: 4px; }
    
    .wires.normal { background: #00E676; box-shadow: 0 0 15px #00E676; }
    .wires.congested { background: #FF1744; box-shadow: 0 0 20px #FF1744; animation: pulse 0.5s infinite; }

    @keyframes pulse {
      0% { opacity: 1; }
      50% { opacity: 0.6; }
      100% { opacity: 1; }
    }

    .electron {
      position: absolute;
      width: 8px;
      height: 8px;
      background: white;
      border-radius: 50%;
      top: 50%;
      transform: translateY(-50%);
      box-shadow: 0 0 5px white;
    }

    .controls-area {
      display: flex;
      justify-content: space-around;
      background: rgba(255,255,255,0.05);
      padding: 15px;
      border-radius: 8px;
    }

    .control-group {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;
    }

    .toggle-btn {
      background: #37474F;
      border: 1px solid #546E7A;
      color: #ECEFF1;
      padding: 8px 16px;
      border-radius: 20px;
      cursor: pointer;
      font-size: 0.9rem;
      transition: all 0.3s;
    }

    .toggle-btn.active {
      background: var(--neon-cyan);
      color: #000;
      font-weight: bold;
      border-color: var(--neon-cyan);
      box-shadow: 0 0 10px rgba(0, 176, 255, 0.4);
    }

    .status-message {
      text-align: center;
      font-weight: bold;
      min-height: 1.2rem;
      font-size: 1rem;
    }
    .status-message.error { color: #FF1744; }
    .status-message.success { color: #00E676; }
  `;
    container.appendChild(style);

    const content = document.createElement('div');
    content.innerHTML = `
    <div class="bottleneck-container">
      <div class="visual-area">
        <div class="node">
          <div class="icon">🏭</div>
          <div class="label">Plant</div>
        </div>
        
        <div class="wires-container">
          <div class="wires thick" id="wires"></div>
        </div>
        
        <div class="node">
          <div class="icon" id="city-icon">🏙️</div>
          <div class="label">City</div>
        </div>
      </div>

      <div class="status-message" id="status-msg">Optimal Flow</div>

      <div class="controls-area">
        <div class="control-group">
          <div class="label">Generation Output</div>
          <div style="display:flex; gap:10px;">
            <button class="toggle-btn" data-type="gen" data-val="low">Low</button>
            <button class="toggle-btn active" data-type="gen" data-val="high">High</button>
          </div>
        </div>

        <div class="control-group">
          <div class="label">Grid Capacity</div>
          <div style="display:flex; gap:10px;">
            <button class="toggle-btn" data-type="cap" data-val="thin">Thin</button>
            <button class="toggle-btn active" data-type="cap" data-val="thick">Thick</button>
          </div>
        </div>
      </div>
    </div>
  `;
    container.appendChild(content);

    // State
    let state = {
        gen: 'high',
        cap: 'thick'
    };

    const wires = content.querySelector('#wires');
    const cityIcon = content.querySelector('#city-icon');
    const statusMsg = content.querySelector('#status-msg');
    const wiresContainer = content.querySelector('.wires-container');

    // Animation Loop
    let electrons = [];

    function spawnElectron() {
        const el = document.createElement('div');
        el.className = 'electron';
        el.style.left = '0%';
        wiresContainer.appendChild(el);

        // Speed depends on congestion
        // If Congested (High Gen + Thin Wires), move very slow or stop
        let speed = 1;
        if (state.gen === 'high' && state.cap === 'thin') speed = 0.1; // Congested
        else if (state.gen === 'low') speed = 0.5; // Low Gen
        else speed = 1.5; // Optimal

        electrons.push({ el, pos: 0, speed });
    }

    // Start loop
    setInterval(() => {
        // Spawn rate
        if (state.gen === 'high' && Math.random() > 0.8) spawnElectron();
        if (state.gen === 'low' && Math.random() > 0.95) spawnElectron();
    }, 100);

    function animate() {
        // Update electrons
        for (let i = electrons.length - 1; i >= 0; i--) {
            const e = electrons[i];

            // Dynamic speed update based on current state
            if (state.gen === 'high' && state.cap === 'thin') e.speed = 0.1;
            else if (state.gen === 'low') e.speed = 0.5;
            else e.speed = 1.5;

            e.pos += e.speed;
            e.el.style.left = e.pos + '%';

            if (e.pos > 100) {
                e.el.remove();
                electrons.splice(i, 1);
            }
        }
        requestAnimationFrame(animate);
    }
    animate();

    function updateVisuals() {
        // Wires Thickness
        if (state.cap === 'thick') {
            wires.classList.remove('thin');
            wires.classList.add('thick');
        } else {
            wires.classList.remove('thick');
            wires.classList.add('thin');
        }

        // Congestion Logic
        if (state.gen === 'high' && state.cap === 'thin') {
            // Congestion
            wires.classList.remove('normal');
            wires.classList.add('congested');
            statusMsg.textContent = "CONGESTION DETECTED: Power Curtailed";
            statusMsg.className = "status-message error";
            cityIcon.style.opacity = '0.5'; // Dim city
            cityIcon.style.filter = 'grayscale(100%)';
        } else {
            // Normal
            wires.classList.remove('congested');
            wires.classList.add('normal');

            if (state.gen === 'high') {
                statusMsg.textContent = "Optimal Flow: City Powered";
                statusMsg.className = "status-message success";
                cityIcon.style.opacity = '1';
                cityIcon.style.filter = 'drop-shadow(0 0 15px #FFD740)'; // Glow
            } else {
                statusMsg.textContent = "Low Generation";
                statusMsg.className = "status-message";
                cityIcon.style.opacity = '0.7';
                cityIcon.style.filter = 'none';
            }
        }
    }

    // Event Listeners
    content.querySelectorAll('.toggle-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const type = e.target.dataset.type;
            const val = e.target.dataset.val;

            // Update State
            state[type] = val;

            // Update Buttons UI
            content.querySelectorAll(`.toggle-btn[data-type="${type}"]`).forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');

            updateVisuals();
        });
    });

    // Init
    updateVisuals();
}
